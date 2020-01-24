/*
 *  Copyright 2020  SenX S.A.S.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import {ChartLib} from '../utils/chart-lib';
import {Param} from '../model/param';
import {Logger} from '../utils/logger';
import {DataModel} from '../model/dataModel';
import {GTS} from '../model/GTS';
import {GTSLib} from '../utils/gts.lib';
import * as moment from 'moment-timezone';
import {ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import deepEqual from 'deep-equal';
import {SizeService} from '../services/resize.service';
import {PlotlyComponent} from '../plotly/plotly.component';

export type VisibilityState = 'unknown' | 'nothingPlottable' | 'plottablesAllHidden' | 'plottableShown';

// noinspection AngularMissingOrInvalidDeclarationInModule
export abstract class WarpViewComponent {
  @ViewChild('toolTip', {static: true}) toolTip: ElementRef;
  @ViewChild('graph', {static: true}) graph: PlotlyComponent;
  @ViewChild('chartContainer', {static: true}) chartContainer: ElementRef;

  @Input('responsive') responsive: boolean;
  @Input('showLegend') showLegend: boolean;
  @Input('width') width = ChartLib.DEFAULT_WIDTH;
  @Input('height') height = ChartLib.DEFAULT_HEIGHT;

  @Input('hiddenData') set hiddenData(hiddenData: number[]) {
    this._hiddenData = hiddenData;
  }

  get hiddenData(): number[] {
    return this._hiddenData;
  }

  @Input('unit') set unit(unit: string) {
    this._unit = unit;
    this.update(undefined, false);
  }

  get unit() {
    return this._unit;
  }

  @Input('debug') set debug(debug: boolean | string) {
    if (typeof debug === 'string') {
      debug = 'true' === debug;
    }
    this._debug = debug;
    this.LOG.setDebug(debug);
  }

  get debug() {
    return this._debug;
  }

  @Input('options') set options(options: Param | string) {
    this.LOG.debug(['onOptions'], options);
    if (typeof options === 'string') {
      options = JSON.parse(options);
    }
    if (!deepEqual(options, this._options)) {
      this.LOG.debug(['options', 'changed'], options);
      this._options = ChartLib.mergeDeep(this._options, options as Param) as Param;
      this.update(this._options, false);
    }
  }

  @Input('data') set data(data: DataModel | GTS[] | string) {
    this.LOG.debug(['onData'], data);
    if (data) {
      this._data = GTSLib.getData(data);
      this.update(undefined, true);
    }
  }

  @Output('chartDraw') chartDraw = new EventEmitter<any>();

  _options: Param = new Param();
  protected LOG: Logger;
  protected defOptions = ChartLib.mergeDeep(this._options, {
    dotsLimit: 1000,
    heatControls: false,
    timeMode: 'date',
    showRangeSelector: true,
    gridLineColor: '#8e8e8e',
    showDots: false,
    timeZone: 'UTC',
    timeUnit: 'us',
    showControls: true,
    bounds: {}
  }) as Param;

  protected _debug = false;
  private _unit = '';
  protected _data: DataModel;
  loading = true;
  layout: Partial<any> = {};
  plotlyConfig: Partial<any> = {
    responsive: this.responsive,
    showAxisDragHandles: true,
    scrollZoom: false,
    displaylogo: false,
    modeBarButtonsToRemove: [
      'lasso2d', 'select2d', 'toggleSpikelines', 'toggleHover', 'hoverClosest3d',
      'hoverClosestGeo', 'hoverClosestGl2d', 'hoverClosestPie', 'toggleHover',
      'hoverClosestCartesian', 'hoverCompareCartesian'
    ]
  };
  plotlyData: Partial<any>[];
  protected _hiddenData: number[] = [];
  protected divider: number;

  protected constructor(public el: ElementRef, public sizeService: SizeService) {
    this.sizeService.sizeChanged$.subscribe(() => {
      if (this.graph) {
        this.layout.width = (el.nativeElement as HTMLElement).parentElement.getBoundingClientRect().width;
        this.layout.height = (el.nativeElement as HTMLElement).parentElement.getBoundingClientRect().height;
      }
    });
  }

  protected abstract update(options: Param, refresh: boolean): void;

  protected abstract convert(data: DataModel): Partial<any>[];

  protected legendFormatter(x, series): string {
    if (x === null) {
      // This happens when there's no selection and {legend: 'always'} is set.
      return `<br>${series.map(s => {
        // FIXME :  if (!s.isVisible) return;
        let labeledData = GTSLib.formatLabel(s.data.text || '') + ': ' + (s.y || s.r);
        if (s.isHighlighted) {
          labeledData = `<b>${labeledData}</b>`;
        }
        return labeledData;
      }).join('<br>')}`;
    }

    let html = '';
    if (this._options.timeMode && this._options.timeMode === 'timestamp') {
      html = `<b>${x}</b>`;
    } else {
      html = `<b>${(moment.utc(parseInt(x, 10)).toISOString().replace('T', '').replace('Z', '') || '')
        .replace('Z', this._options.timeZone === 'UTC' ? 'Z' : '')}</b>`;
      // data.x is already a date in millisecond, whatever the unit option
    }
    // put the highlighted one(s?) first, keep only visibles, keep only 50 first ones.
    //   series.sort((sa, sb) => (sa.isHighlighted && !sb.isHighlighted) ? -1 : 1)
    //   series.filter(s => s.isVisible && s.yHTML).slice(0, 50)
    series.forEach(s => {
      const labeledData = GTSLib.formatLabel(s.data.text || '') + ': ' + (s.y || s.r || '');
      /* if (series.isHighlighted) {
         labeledData = `<b>${labeledData}</b>`;
       }*/
      html += `<br>${labeledData}`;
    });
    return html;
  }

  protected initChart(el: ElementRef): boolean {
    this.LOG.debug(['initiChart', 'this._data'], this._data);
    if (!this._data || !this._data.data || this._data.data.length === 0 || !this._options) {
      return false;
    }
    moment.tz.setDefault(this._options.timeZone);
    this.loading = true;
    this.LOG.debug(['initiChart', 'this._options'], this._options);
    this._options = ChartLib.mergeDeep(this.defOptions, this._options) as Param;
    const dataModel = this._data;
    this._options = ChartLib.mergeDeep(this._options, this._data.globalParams) as Param;
    this.LOG.debug(['initiChart', 'this._options'], this._options);
    this._options.timeMode = this._options.timeMode || 'date';
    this.divider = GTSLib.getDivider(this._options.timeUnit);
    this.plotlyData = this.convert(dataModel);
    this.plotlyConfig.responsive = this.responsive;
    this.layout.paper_bgcolor = 'rgba(0,0,0,0)';
    this.layout.plot_bgcolor = 'rgba(0,0,0,0)';
    if (!this.responsive) {
      this.layout.width = this.width || ChartLib.DEFAULT_WIDTH;
      this.layout.height = this.height || ChartLib.DEFAULT_HEIGHT;
    } else {
      this.layout.width = (el.nativeElement as HTMLElement).parentElement.getBoundingClientRect().width;
      this.layout.height = (el.nativeElement as HTMLElement).parentElement.getBoundingClientRect().height;
    }
    if (this._options.bounds && this._options.bounds.minDate && this._options.bounds.maxDate) {
      dataModel.bounds = {
        xmin: Math.floor(this._options.bounds.minDate),
        xmax: Math.ceil(this._options.bounds.maxDate),
        ymin: this._options.bounds.yRanges && this._options.bounds.yRanges.length > 0
          ? Math.floor(this._options.bounds.yRanges[0])
          : undefined,
        ymax: this._options.bounds.yRanges && this._options.bounds.yRanges.length > 1
          ? Math.ceil(this._options.bounds.yRanges[1])
          : undefined
      };
      if (this._options.timeMode && this._options.timeMode === 'timestamp') {
        this.layout.xaxis.range = [dataModel.bounds.xmin, dataModel.bounds.xmax];
      } else {
        this.layout.xaxis.range = [
          moment.tz(dataModel.bounds.xmin, this._options.timeZone).toISOString(true),
          moment.tz(dataModel.bounds.xmax, this._options.timeZone).toISOString(true)];
      }
    }
    this.LOG.debug(['initiChart', 'plotlyData'], this.plotlyData);
    if (this.plotlyData.length === 0) {
      this.loading = false;
      return false;
    }
    return !(!this.plotlyData || this.plotlyData.length === 0);
  }

  afterPlot() {
    this.chartDraw.emit();
    this.loading = false;
  }

  unhover() {
    this.toolTip.nativeElement.style.display = 'none';
  }

  hover(data: any) {
    this.LOG.debug(['plotly_hover'], data);
    this.toolTip.nativeElement.style.display = 'block';
    this.toolTip.nativeElement.innerHTML = this.legendFormatter(data.xvals[0], data.points);
    if (data.event.offsetX > this.chartContainer.nativeElement.clientWidth / 2) {
      this.toolTip.nativeElement.style.left = Math.max(10, data.event.offsetX - this.toolTip.nativeElement.clientWidth) + 'px';
    } else {
      this.toolTip.nativeElement.style.left = (data.event.offsetX + 20) + 'px';
    }
    this.toolTip.nativeElement.style.top = (data.event.offsetY + 20) + 'px';
  }

  relayout($event: any) {

  }

  protected getLabelColor(el: HTMLElement) {
    return this.getCSSColor(el, '--warp-view-chart-label-color', '#8e8e8e').trim();
  }

  protected getGridColor(el: HTMLElement) {
    return this.getCSSColor(el, '--warp-view-chart-grid-color', '#8e8e8e').trim();
  }

  protected getCSSColor(el: HTMLElement, property: string, defColor: string) {
    const color = getComputedStyle(el).getPropertyValue(property).trim();
    return color === '' ? defColor : color;
  }
}