/*
 *  Copyright 2018  SenX S.A.S.
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

import {Component, Element, Event, EventEmitter, Listen, Method, Prop, Watch} from '@stencil/core';
import {GTSLib} from '../../utils/gts.lib';
import Dygraph from 'dygraphs';
import {Logger} from "../../utils/logger";
import {ChartLib} from "../../utils/chart-lib";
import {ColorLib} from "../../utils/color-lib";
import {Param} from "../../model/param";
import {DataModel} from "../../model/dataModel";
import {GTS} from "../../model/GTS";
import moment from "moment-timezone";
import Options = dygraphs.Options;
import deepEqual from "deep-equal";
import {ChartBounds} from "../../model/chartBounds";

type visibilityState = 'unknown' | 'nothingPlottable' | 'plottablesAllHidden' | 'plottableShown';

/**
 * options :
 *  gridLineColor: 'red | #fff'
 *  timeMode.timeMode: 'timestamp | date'
 *  showRangeSelector: boolean
 *  type : 'line | area | step'
 *
 */
@Component({
  tag: 'warp-view-chart',
  styleUrls: ['../../../node_modules/dygraphs/dist/dygraph.min.css', 'warp-view-chart.scss'],
  shadow: false
})
export class WarpViewChart {
  @Prop() data: DataModel | GTS[] | string;
  @Prop() options: Param = new Param();
  @Prop() hiddenData: number[] = [];
  @Prop() unit: string = '';
  @Prop() type: string = 'line';
  @Prop() responsive: boolean = false;
  @Prop() standalone = true;
  @Prop() debug = false;

  @Element() el: HTMLElement;

  @Event() boundsDidChange: EventEmitter;
  @Event() pointHover: EventEmitter;
  @Event() warpViewChartResize: EventEmitter;
  @Event() resizeMyParent: EventEmitter;
  @Event() chartDraw: EventEmitter;
  @Event() zoom: EventEmitter;

  private LOG: Logger;
  private static DEFAULT_WIDTH = 800;
  private static DEFAULT_HEIGHT = 500;
  private resizeTimer;
  private _chart: Dygraph;
  private _options: Param = {
    timeMode: 'date',
    showRangeSelector: true,
    gridLineColor: '#8e8e8e',
    showDots: false,
    timeZone: 'UTC',
    timeUnit: 'us'
  };
  private uuid = 'chart-' + ChartLib.guid().split('-').join('');
  private visibility: boolean[] = [];

  /**
   * usefull for default zoom
   */
  private maxTick = 0;
  /**
   * usefull for default zoom
   */
  private minTick = 0;
  /**
   * table of gts id displayed in dygraph. array order is the one of dygraph series
   */
  private visibleGtsId = [];
  /**
   * key = timestamp. values = table of available points, filled by null.
   */
  private dataHashset = {};
  /**
   * the big matrix that dygraph expects
   */
  private dygraphdataSets = [];
  /**
   * the labels of each series. array order is the one of dygraph series
   */
  private dygraphLabels = [];
  /**
   * the colors of each series. array order is the one of dygraph series
   */
  private dygraphColors = [];
  /**
   * put this to true before creating a new dygraph to force a resize in the drawCallback
   */
  private initialResizeNeeded = false;
  /**
   * contains the bounds of current graph, in timestamp (platform time unit), and in millisecond.
   */
  private chartBounds: ChartBounds = new ChartBounds();

  private previousParentHeight = -1;
  private previousParentWidth = -1;

  private visibilityStatus: visibilityState = 'unknown';

  private heightWithPlottableData = -1;

  // if nothing to display, must reduce to 30px. 
  @Listen('window:resize')
  onResize() {
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      let parentWidth = this.el.parentElement.getBoundingClientRect().width;
      let parentHeight = this.el.parentElement.getBoundingClientRect().height;
      if (this.initialResizeNeeded || parentWidth !== this.previousParentWidth || parentHeight !== this.previousParentHeight) {
        this.initialResizeNeeded = false;
        if (this.standalone || this.displayGraph()) {
          //there is something to show, adapt me to the parent bounding box
          let width = parentWidth - 5;
          if (this.visibilityStatus === 'plottablesAllHidden') {
            //restore the previous height
            parentHeight = this.heightWithPlottableData;
            this.visibilityStatus = 'plottableShown';
            this.resizeMyParent.emit({h: parentHeight, w: parentWidth});
          }
          let height = parentHeight - 20; //kind of padding.
          if (this._chart) {
            this.LOG.debug(['onResize', 'destroy'], width, height);
            this._chart.resize(width, height);
          }
        } else {
          //nothing to show, and integrated into plot component (not standalone)
          //shrink to the minimum and send event to resize parent to me
          if (this.visibilityStatus === 'plottableShown') // hide of all plottable data (but there is some)
          {
            this.visibilityStatus = 'plottablesAllHidden';
            this.heightWithPlottableData = parentHeight; //store the height to restore it later
          }
          let height = 30;
          let width = parentWidth;
          if (this._chart) {
            this.LOG.debug(['onResize', 'destroy'], width, height);
            this._chart.resize(width, height);
          }
          parentHeight = height + 20; //margin to keep clear of the handle bar
          this.resizeMyParent.emit({h: parentHeight, w: width});
        }
      }
      this.previousParentHeight = parentHeight;
      this.previousParentWidth = parentWidth;
    }, 150);
  }

  @Watch('hiddenData')
  private onHideData(newValue: number[], oldValue: number[]) {
    if (newValue !== oldValue) {
      this.LOG.debug(['hiddenData'], newValue);

      let previousVisibility = JSON.stringify(this.visibility);
      if (!!this._chart) {
        this.visibility = [];
        this.visibleGtsId.forEach(id => {
          //sadly, this does not work.
          //this._chart.setVisibility(i,newValue.indexOf(id) < 0);
          // well, not so sad. for a 2 millions points, destroying and redrawing is faster than setvisibility (8s instead 17s)
          //best workaround : rebuild the dygraph with same dataset and different visibility options. 
          //TODO: try each next version of dygraph.
          //id -1 is a special empty serie only used when there only annotations
          this.visibility.push(newValue.indexOf(id) < 0 && (id != -1));
        });
        this.LOG.debug(['hiddendygraphfullv'], this.visibility);
      }
      let newVisibility = JSON.stringify(this.visibility);
      if (previousVisibility !== newVisibility) {
        this.drawChart(false, true);
        this.LOG.debug(['hiddendygraphtrig', 'destroy'], 'redraw by visibility change');
      }
    }
  }

  @Watch('data')
  private onData(newValue: DataModel | GTS[], oldValue: DataModel | GTS[]) {
    if (!deepEqual(newValue, oldValue)) { //needed. VSCode fire a data change each time you hide or show something.
      this.LOG.debug(['data'], newValue);
      this.visibilityStatus = 'unknown';
      this.drawChart(true); //force reparse
      this.LOG.debug(['dataupdate', 'destroy'], 'redraw by data change');
    }
  }

  @Watch('options')
  private onOptions(newValue: Param) {
    //here we have a problem. 
    // - this function is sometimes called twice, and very often called with oldValue==newValue
    // - changing the visibility of an annotation trigger this function too.
    // so, we must compare the newValue keys with the current _options before launching a redraw.
    let optionChanged = false;
    Object.keys(newValue).forEach(opt => {
      if (this._options.hasOwnProperty(opt)) {
        optionChanged = optionChanged || !deepEqual(newValue[opt] !== this._options[opt]);
      } else {
        optionChanged = true; //new unknown option
      }
    });
    this.LOG.debug(['onOptions', 'optionChanged'], optionChanged);
    if (optionChanged) {
      this.LOG.debug(['options'], newValue);
      this.drawChart(false, true); //need to resize after.
    }
  }

  @Watch('type')
  private onTypeChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.LOG.debug(['typeupdate', 'destroy'], 'redraw by type change');
      this.drawChart();
    }
  }

  @Watch('unit')
  private onUnitChange(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.LOG.debug(['unitupdate', 'destroy'], 'redraw by unit change (full redraw)');
      this.drawChart(true); //reparse all
    }
  }

  @Method()
  async getTimeClip(): Promise<ChartBounds> {
    return new Promise<ChartBounds>(resolve => {
      this.LOG.debug(['getTimeClip'], this.chartBounds);
      resolve(this.chartBounds);
    });
  }

  private handleMouseOut(evt: MouseEvent) {
    this.LOG.debug(['handleMouseOut'], evt);
    const legend = this.el.querySelector('.dygraph-legend') as HTMLElement;
    window.setTimeout(() => {
      legend.style.display = 'none';
    }, 1000)
  }

  /**
   * this function build this.dataHashset (high computing cost), then it build this.dygraphdataSets  (high computing cost too)
   *
   * this function also refresh this.dygraphColors  this.dygraphLabels
   *
   * @param gtsList a flat array of gts
   */
  private gtsToData(gtsList) {
    this.LOG.debug(['gtsToData'], gtsList);
    this.visibility = [];
    this.dataHashset = {}; //hashset, no order guaranteed
    let labels = [];
    let colors = [];
    if (!gtsList) {
      return;
    } else {
      gtsList = GTSLib.flattenGtsIdArray(gtsList, 0).res;
      gtsList = GTSLib.flatDeep(gtsList);
      this.LOG.debug(['gtsToData', 'gtsList'], gtsList);
      labels.push('Date');
      this.maxTick = Number.NEGATIVE_INFINITY;
      this.minTick = Number.POSITIVE_INFINITY;
      this.visibleGtsId = [];

      //build a non plotable list, then keep plotable ones
      const nonPlottable = gtsList.filter(g => {
        return (g.v && !GTSLib.isGtsToPlot(g));
      });
      gtsList = gtsList.filter(g => {
        return (g.v && GTSLib.isGtsToPlot(g));
      });
      //initialize visibility status
      if (this.visibilityStatus === 'unknown') {
        this.visibilityStatus = gtsList.length > 0 ? 'plottableShown' : 'nothingPlottable';
      }

      //first, add plotable data to the data hashset
      gtsList.forEach((g, i) => {
        labels.push(GTSLib.serializeGtsMetadata(g) + g.id);
        //GTSLib.gtsSort(g); // no need because data{} is not sorted, will sort later the full dataset
        g.v.forEach(value => {
          const ts = value[0];
          if (!this.dataHashset[ts]) {
            this.dataHashset[ts] = new Array(gtsList.length);
            this.dataHashset[ts].fill(null);
          }
          this.dataHashset[ts][i] = value[value.length - 1];
          if (ts < this.minTick) {
            this.minTick = ts;
          }
          if (ts > this.maxTick) {
            this.maxTick = ts;
          }
        });
        this.LOG.debug(['gtsToData', 'gts'], g);
        colors.push(ColorLib.getColor(g.id));
        this.visibility.push(true);
        this.visibleGtsId.push(g.id);
      });

      //non plotable data are important to fix the bounds of the graphics (with null values)
      //just add min and max tick to the hashset
      this.LOG.debug(['gtsToData', 'nonPlottable'], nonPlottable);
      if (nonPlottable.length > 0) { //&& gtsList.length === 0) {
        nonPlottable.forEach(g => {
          g.v.forEach(value => {
            const ts = value[0];
            if (ts < this.minTick) {
              this.minTick = ts;
            }
            if (ts > this.maxTick) {
              this.maxTick = ts;
            }
          })
        });
        //if there is not any plottable data, we must add a fake one with id -1. This one will always be hidden.
        if (0 == gtsList.length) {
          if (!this.dataHashset[this.minTick]) {
            this.dataHashset[this.minTick] = [0]
          }
          if (!this.dataHashset[this.maxTick]) {
            this.dataHashset[this.maxTick] = [0];
          }
          labels.push('emptySeries');
          colors.push(ColorLib.getColor(0));
          this.visibility.push(false);
          this.visibleGtsId.push(-1);
        } else {
          //if there is some plottable data, just add some missing points to define min and max
          if (!this.dataHashset[this.minTick]) {
            this.dataHashset[this.minTick] = new Array(gtsList.length);
            this.dataHashset[this.minTick].fill(null);
          }
          if (!this.dataHashset[this.maxTick]) {
            this.dataHashset[this.maxTick] = new Array(gtsList.length);
            this.dataHashset[this.maxTick].fill(null);
          }
        }
      }
    }

    this.rebuildDygraphDataSets();

    this.LOG.debug(['dygraphgtsidtable'], this.visibleGtsId);
    this.LOG.debug(['gtsToData', 'datasets'], this.dygraphdataSets, labels, colors);
    this.dygraphColors = colors;
    this.dygraphLabels = labels;

  }

  /**
   * This function build this.dygraphdataSets from this.dataHashset
   *
   * It could be called independently from gtsToData, when only unit or timeMode change.
   */
  private rebuildDygraphDataSets() {
    this.dygraphdataSets = [];
    //build the big matrix for dygraph from the data hashSet.
    const divider = GTSLib.getDivider(this._options.timeUnit);
    this.LOG.debug(['chart', 'divider', 'timeunit'], divider, this._options.timeUnit);
    Object.keys(this.dataHashset).forEach(timestamp => {
      if (this._options.timeMode && this._options.timeMode === 'timestamp') {
        this.dygraphdataSets.push([parseInt(timestamp)].concat(this.dataHashset[timestamp]));
      } else {
        const ts = Math.floor(parseInt(timestamp) / divider);
        this.dygraphdataSets.push([moment(ts).utc(true).toDate()].concat(this.dataHashset[timestamp]));
      }
    });
    //sort the big table. (needed, data is not a treeSet or sortedSet)
    this.dygraphdataSets.sort((a, b) => a[0] - b[0]);
  }

  private isStepped(): boolean {
    return this.type === 'step';
  }

  private isStacked(): boolean {
    return this.type === 'area';
  }

  private static toFixed(x: number): string {
    let e;
    let res = '';
    if (Number.isSafeInteger(x)) {
      return x.toString();
    } else {
      res = x.toString();
      e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        res = x.toString();
        res += (new Array(e + 1)).join('0');
      }
      return res;
    }
  }

  /**
   * heavy link with GTSLib.serializeGtsMetadata() output. Check it first.
   * @param {string} data  : serialized gts data + g.id in the same string. e.g: "class{labelA=xx,attrA=ee}47"
   * @returns {string}
   */
  private static formatLabel(data: string): string {
    let serializedGTS = data.split('}')[0].split('{'); //remove g.id, then cut [class labelA=xx,attrA=ee]
    let display = '';
    if (serializedGTS.length == 2) { //if there is a { in one label or classname, don't even try)
      display = `<span class='gts-classname'>${serializedGTS[0]}</span>`;
      display += `<span class='gts-separator'> {</span>`;
      const labels = serializedGTS[1].split(',');
      if (labels.length > 0) {
        labels.forEach((l, i) => {
          const label = l.split('=');
          if (l.length > 1) {
            display += `<span><span class='gts-labelname'>${label[0]}</span><span class='gts-separator'>=</span><span class='gts-labelvalue'>${label[1]}</span>`;
            if (i !== labels.length - 1) {
              display += `<span>, </span>`;
            }
          }
        });
      }
      display += `<span class='gts-separator'>}</span>`;
    }
    return display;
  }

  private zoomCallback(minDate: number, maxDate: number, yRanges: [number, number][]) {
    this.LOG.debug(['zoomCallback'], {minDate: minDate, maxDate: maxDate, yRanges: yRanges});
    this.zoom.emit({minDate: minDate, maxDate: maxDate, yRanges: yRanges})
  }

  private legendFormatter(data): string {
    if (data.x === null) {
      // This happens when there's no selection and {legend: 'always'} is set.
      return '<br>' + data.series.map(function (series) {
        if (!series.isVisible) return;
        let labeledData = WarpViewChart.formatLabel(series.labelHTML) + ': ' + WarpViewChart.toFixed(parseFloat(series.yHTML));
        if (series.isHighlighted) {
          labeledData = `<b>${labeledData}</b>`;
        }
        return WarpViewChart.formatLabel(series.labelHTML) + ' ' + labeledData;
      }).join('<br>');
    }

    let html = '';
    if (this._options.timeMode && this._options.timeMode === 'timestamp') {
      html = `<b>${data.x}</b>`;
    } else {
      html = `<b>${(moment.utc(parseInt(data.x)).toISOString() || '').replace('Z', this._options.timeZone == 'UTC' ? 'Z' : '')}</b>`; //data.x is already a date in millisecond, whatever the unit option
    }
    //put the highlighted one(s?) first, keep only visibles, keep only 50 first ones.
    data.series.sort((sa, sb) => (sa.isHighlighted && !sb.isHighlighted) ? -1 : 1).filter(s => s.isVisible && s.yHTML).slice(0, 50).forEach(function (series) {
      let labeledData = WarpViewChart.formatLabel(series.label) + ': ' + WarpViewChart.toFixed(parseFloat(series.yHTML));
      if (series.isHighlighted) {
        labeledData = `<b>${labeledData}</b>`;
      }
      html += `<br>${series.dashHTML} ${labeledData}`;
    });
    return html;
  }

  private highlightCallback(event) {
    const legend = this.el.querySelector('.dygraph-legend') as HTMLElement;
    legend.style.display = 'block';
    this.pointHover.emit({
      x: event.offsetX,
      y: event.offsetY
    });
  }

  private scroll(event, g) {
    if (!event.altKey) return;
    this.LOG.debug(['scroll'], g);
    const normal = event.detail ? event.detail * -1 : event.wheelDelta / 40;
    // For me the normalized value shows 0.075 for one click. If I took
    // that verbatim, it would be a 7.5%.
    const percentage = normal / 50;
    if (!(event.offsetX && event.offsetY)) {
      event.offsetX = event.layerX - event.target.offsetLeft;
      event.offsetY = event.layerY - event.target.offsetTop;
    }

    const percentages = WarpViewChart.offsetToPercentage(g, event.offsetX, event.offsetY);
    const xPct = percentages[0];
    const yPct = percentages[1];

    WarpViewChart.zoom(g, percentage, xPct, yPct);
    event.preventDefault();
  }

  private static offsetToPercentage(g, offsetX, offsetY) {
    // This is calculating the pixel offset of the leftmost date.
    const xOffset = g.toDomCoords(g.xAxisRange()[0], null)[0];
    const yar0 = g.yAxisRange(0);
    // This is calculating the pixel of the higest value. (Top pixel)
    const yOffset = g.toDomCoords(null, yar0[1])[1];
    // x y w and h are relative to the corner of the drawing area,
    // so that the upper corner of the drawing area is (0, 0).
    const x = offsetX - xOffset;
    const y = offsetY - yOffset;
    // This is computing the rightmost pixel, effectively defining the
    // width.
    const w = g.toDomCoords(g.xAxisRange()[1], null)[0] - xOffset;
    // This is computing the lowest pixel, effectively defining the height.
    const h = g.toDomCoords(null, yar0[0])[1] - yOffset;
    // Percentage from the left.
    const xPct = w === 0 ? 0 : (x / w);
    // Percentage from the top.
    const yPct = h === 0 ? 0 : (y / h);
    // The (1-) part below changes it from "% distance down from the top"
    // to "% distance up from the bottom".
    return [xPct, (1 - yPct)];
  }

  private static adjustAxis(axis, zoomInPercentage, bias) {
    const delta = axis[1] - axis[0];
    const increment = delta * zoomInPercentage;
    const foo = [increment * bias, increment * (1 - bias)];
    return [axis[0] + foo[0], axis[1] - foo[1]];
  }

  private static zoom(g, zoomInPercentage, xBias, yBias) {
    xBias = xBias || 0.5;
    yBias = yBias || 0.5;
    const yAxes = g.yAxisRanges();
    const newYAxes = [];
    for (let i = 0; i < yAxes.length; i++) {
      newYAxes[i] = WarpViewChart.adjustAxis(yAxes[i], zoomInPercentage, yBias);
    }
    g.updateOptions({
      dateWindow: WarpViewChart.adjustAxis(g.xAxisRange(), zoomInPercentage, xBias),
      valueRange: newYAxes[0]
    });
  }

  private drawCallback(dygraph, is_initial) { //also called after a resize, be carefull.
    this.LOG.debug(['drawCallback', 'destroy'], [dygraph.dateWindow_, is_initial]);
    this._chart = dygraph; //usefull for the on resize, because into the callback, this._chart is still undefined.
    let cmin = 0;
    let cmax = 0;
    let divider = GTSLib.getDivider(this._options.timeUnit);
    if (this._options.timeMode && this._options.timeMode === 'timestamp') {
      // everything works in timestamp, no divider, no timezone.
      if (dygraph.dateWindow_) { //if zoomed view
        this.chartBounds.tsmin = Math.round(dygraph.dateWindow_[0]);
        this.chartBounds.tsmax = Math.round(dygraph.dateWindow_[1]);
      } else {
        this.chartBounds.tsmin = this.minTick;
        this.chartBounds.tsmax = this.maxTick;
      }
      cmin = this.chartBounds.tsmin;
      cmax = this.chartBounds.tsmax;
    } else {
      //everything works in milliseconds with a timezone
      if (dygraph.dateWindow_) { //if zoomed view
        cmin = dygraph.dateWindow_[0];
        cmax = dygraph.dateWindow_[1];
        //find the original timestamp, have to reverse the timezone. 
        //utc offset depends on current timestamp, let's take cmin. it may cause problems in case of years long series.
        let zoneOffset = moment.tz.zone(this._options.timeZone).utcOffset(cmin) * 60000;
        //find the utc timestamp in platform unit from the timezoned one in millisecond.
        this.chartBounds.tsmin = Math.floor((cmin + zoneOffset) * divider);
        this.chartBounds.tsmax = Math.ceil((cmax + zoneOffset) * divider);
      } else {
        cmin = moment(this.minTick / divider).utc(true).valueOf(); //manage the tz
        cmax = moment(this.maxTick / divider).utc(true).valueOf();
        this.chartBounds.tsmin = this.minTick;
        this.chartBounds.tsmax = this.maxTick;
      }
    }
    this.chartBounds.msmin = this.chartBounds.tsmin / divider;
    this.chartBounds.msmax = this.chartBounds.tsmax / divider;
    this.LOG.debug(['drawCallback', 'newBounds', 'platform unit'], this.chartBounds.tsmin, this.chartBounds.tsmax);
    this.LOG.debug(['drawCallback', 'newBounds', 'for annotations'], cmin, cmax);
    this.boundsDidChange.emit({
      bounds: {
        min: cmin,
        max: cmax
      }
    });
    this.chartDraw.emit();
    if (this.initialResizeNeeded) {
      this.onResize();
    }
  }

  private drawChart(reparseNewData: boolean = false, forceresize: boolean = false) {
    this.LOG.debug(['drawChart', 'this.data'], this.data);
    let previousTimeMode = this._options.timeMode || ''; //detect a timemode change
    let previousTimeUnit = this._options.timeUnit || ''; //detect a timeUnit change
    let previousTimeZone = this._options.timeZone || 'UTC'; //detect a timeZone change
    this._options = ChartLib.mergeDeep(this._options, this.options);
    this.LOG.debug(['tz'], this._options.timeZone);
    moment.tz.setDefault(this._options.timeZone);
    let data: DataModel = GTSLib.getData(this.data);

    this.LOG.debug(['drawChart', 'this._options.bounds'], this._options.bounds);
    if (this._options.bounds) {
      data.bounds = {
        xmin: Math.floor(this._options.bounds.minDate),
        xmax: Math.ceil(this._options.bounds.maxDate),
        ymin: this._options.bounds.yRanges && this._options.bounds.yRanges.length > 0
          ? Math.floor(this._options.bounds.yRanges[0])
          : undefined,
        ymax: this._options.bounds.yRanges && this._options.bounds.yRanges.length > 1
          ? Math.ceil(this._options.bounds.yRanges[1])
          : undefined
      };
    }
    this.LOG.debug(['drawChart', "data"], data);
    let dataList = data.data;
    this._options = ChartLib.mergeDeep(this._options, data.globalParams);
    if (reparseNewData) {
      this.gtsToData(dataList);
    } else {
      if (previousTimeMode !== this._options.timeMode
        || previousTimeUnit !== this._options.timeUnit
        || previousTimeZone !== this._options.timeZone) {
        this.rebuildDygraphDataSets();
      }
    }
    const chart = this.el.querySelector('#' + this.uuid) as HTMLElement;
    this.LOG.debug(['drawChart', 'this.dygraphdataSets'], this.dygraphdataSets);
    if (!!this.dygraphdataSets) {
      const color = this._options.gridLineColor;
      let interactionModel = Dygraph.defaultInteractionModel;
      interactionModel.mousewheel = this.scroll.bind(this);
      interactionModel.mouseout = this.handleMouseOut.bind(this);
      let options: Options = {
        height: this.displayGraph() ? (this.responsive ? this.el.parentElement.getBoundingClientRect().height : WarpViewChart.DEFAULT_HEIGHT) - 30 : 30,
        width: (this.responsive ? this.el.parentElement.getBoundingClientRect().width : WarpViewChart.DEFAULT_WIDTH) - 5,
        labels: this.dygraphLabels,
        showRoller: false,
        showRangeSelector: this.dygraphdataSets && this.dygraphdataSets.length > 0 && this._options.showRangeSelector,
        showInRangeSelector: true,
        connectSeparatedPoints: true,
        colors: this.dygraphColors,
        legend: 'follow',
        stackedGraph: this.isStacked(),
        strokeBorderWidth: this.isStacked() ? null : 0,
        strokeWidth: 2,
        stepPlot: this.isStepped(),
        ylabel: this.unit,
        labelsSeparateLines: true,
        highlightSeriesBackgroundAlpha: 1,
        highlightSeriesOpts: {
          strokeWidth: 3,
          strokeBorderWidth: 0,
          highlightCircleSize: 3,
          showInRangeSelector: true
        },
        visibility: this.visibility,
        labelsUTC: true,
        gridLineColor: color,
        axisLineColor: color,
        fillAlpha: 0.5,
        drawGapEdgePoints: this._options.showDots,
        drawPoints: this._options.showDots,
        pointSize: 3,
        digitsAfterDecimal: 5,

        axes: {
          x: {
            drawAxis: this.displayGraph(),
          }
        },
        legendFormatter: this.legendFormatter.bind(this),
        highlightCallback: this.highlightCallback.bind(this),
        drawCallback: this.drawCallback.bind(this),
        zoomCallback: this.zoomCallback.bind(this),
        axisLabelWidth: this.standalone ? 50 : 94,
        rightGap: this.standalone ? 0 : 20,
        interactionModel: interactionModel
      };
      if (!this.displayGraph()) {
        options.xAxisHeight = 30;
        options.rangeSelectorHeight = 30;
        chart.style.height = '30px';
      }
      if (!!data.bounds) {
        options.dateWindow = [data.bounds.xmin, data.bounds.xmax];
        options.valueRange = [data.bounds.ymin, data.bounds.ymax];
      }
      if (this._options.timeMode === 'timestamp') {
        options.axes.x.axisLabelFormatter = (x) => {
          return WarpViewChart.toFixed(x as number);
        }
      }
      //even on visibility change. setting this to reparseNewData is not a solution.
      this.initialResizeNeeded = reparseNewData || forceresize;

      if (!!this._chart) {
        this._chart.destroy();
        this.LOG.debug(['drawChart', 'dygraphdestroyed'], 'dygraph destroyed to reborn with reparseNewData=', reparseNewData, 'and forceresize=', forceresize);
      }

      this.LOG.debug(['drawChart', 'dygraphdataSets'], this.dygraphdataSets);
      if (this.dygraphdataSets && this.dygraphdataSets.length > 0) {
        this._chart = new Dygraph(chart, this.dygraphdataSets, options);
      }
    }
  }

  private displayGraph() {
    let status = false;
    this.visibility.forEach(s => {
      status = s || status;
    });
    return status;
  }

  componentWillLoad() {
    this.LOG = new Logger(WarpViewChart, this.debug);
  }

  componentDidLoad() {
    this.drawChart(true);
    ChartLib.resizeWatchTimer(this.el, this.onResize.bind(this));
  }

  render() {
    return <div id="chartContainer">
      <div id={this.uuid} class="chart"/>
    </div>;
  }
}
