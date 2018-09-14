import {Component, Element, Prop, State, Watch} from '@stencil/core';
import {GTSLib} from '../../utils/gts.lib';
import {DataModel} from "../../model/dataModel";
import {Logger} from "../../utils/logger";
import {Param} from "../../model/param";
import {GraphData} from "@stencil/core/dist/declarations";
import {ChartLib} from "../../utils/chart-lib";

@Component({
  tag: 'quantum-tile',
  styleUrl: 'quantum-tile.scss',
  shadow: true
})
export class QuantumTile {

  LOG: Logger = new Logger(QuantumTile);

  @State() data: any;
  @Prop() options: Param;
  @Prop() unit: string = '';
  @Prop() type: string = 'line';
  @Prop() chartTitle: string = '';
  @Prop() responsive: boolean = false;
  @Prop() showLegend: boolean = true;
  @Prop() url: string = '';

  @Element() wsElement: HTMLElement;

  private warpscript: string = '';
  private graphs = {
    'scatter': ['scatter'],
    'chart': ['line', 'spline', 'step', 'area'],
    'pie': ['pie', 'doughnut', 'gauge'],
    'polar': ['polar'],
    'radar': ['radar'],
    'bar': ['bar']
  };
  private loading = true;
  private gtsList: any;

  @Watch('options')
  private onOptions(newValue: Param, oldValue: Param) {
    this.LOG.debug(['options'], newValue);
    if (oldValue !== newValue) {
      this.LOG.debug(['options', 'changed'], newValue);
      this.parseGTS();
    }
  }

  componentDidLoad() {
    this.execute();
  }

  private parseGTS() {
    let data: DataModel = new DataModel();
    if (GTSLib.isArray(this.gtsList) && this.gtsList.length === 1) {
      const dataLine = this.gtsList[0];
      if (dataLine.hasOwnProperty('data')) {
        data.data = dataLine.data;
        data.globalParams = dataLine.globalParams || {} as Param;
        data.globalParams.type = data.globalParams.type || this.type;
        data.params = dataLine.params;
      } else {
        data.data = dataLine;
        data.globalParams = {type: this.type} as Param;
      }
    } else {
      data.data = this.gtsList;
      data.globalParams = {type: this.type} as Param;
    }
    this.LOG.debug(['parseGTS', 'data'], data);
    this.data = data;
    this.options = ChartLib.mergeDeep(this.options, data.globalParams);
    this.LOG.debug(['parseGTS', 'options'], this.options);
    this.loading = false;
  }

  private execute() {
    this.loading = true;
    this.warpscript = this.wsElement.textContent;
    this.LOG.debug(['componentDidLoad', 'warpscript'], this.warpscript);
    fetch(this.url, {method: 'POST', body: this.warpscript}).then(response => {
      response.text().then(gtsStr => {
        // this.LOG.debug(['componentDidLoad', 'response'], gtsStr);
        this.gtsList = JSON.parse(gtsStr);
        this.parseGTS();
      }, err => {
        this.LOG.error(['componentDidLoad'], err);
        this.loading = false;
      });
    }, err => {
      this.LOG.error(['componentDidLoad'], err);
      this.loading = false;
    })
  }

  render() {
    return <div class="wrapper" id="wrapper">
      <div class="warpscript">
        <slot/>
      </div>
      {/* {
        this.loading
          ? <quantum-spinner />
          : <span>*/}
      {this.graphs['scatter'].indexOf(this.type) > -1 ?
        <quantum-scatter
          responsive={this.responsive} unit={this.unit} data={this.data}
          options={this.options} show-legend={this.showLegend} chartTitle={this.chartTitle}
        /> : ''}
      {this.graphs['chart'].indexOf(this.type) > -1 ?
        <quantum-chart type={this.type}
                       responsive={this.responsive} unit={this.unit} data={this.data}
                       options={this.options} show-legend={this.showLegend} chartTitle={this.chartTitle}
        /> : ''}
      {this.type == 'bubble' ?
        <quantum-bubble
          showLegend={this.showLegend} responsive={true} unit={this.unit} data={this.data}
          options={this.options} chartTitle={this.chartTitle}/> : ''
      }
      {this.type == 'map' ?
        <quantum-map
          responsive={true} data={this.data} chartTitle={this.chartTitle}/> : ''
      }
      {this.type == 'plot' ?
        <quantum-plot
          responsive={true} showLegend={this.showLegend} data={this.data} options={this.options}
          chartTitle={this.chartTitle}/> : ''
      }
      {this.graphs['pie'].indexOf(this.type) > -1 ?
        <quantum-pie
          responsive={this.responsive} unit={this.unit} data={this.data}
          options={this.options} showLegend={this.showLegend} chartTitle={this.chartTitle}/> : ''
      }
      {this.graphs['polar'].indexOf(this.type) > -1 ?
        <quantum-polar
          responsive={this.responsive} unit={this.unit} data={this.data}
          showLegend={this.showLegend} chartTitle={this.chartTitle} options={this.options}/> : ''
      }
      {this.graphs['radar'].indexOf(this.type) > -1 ?
        <quantum-radar
          responsive={this.responsive} unit={this.unit} data={this.data}
          showLegend={this.showLegend} chartTitle={this.chartTitle} options={this.options}/> : ''
      }
      {this.graphs['bar'].indexOf(this.type) > -1 ?
        <quantum-bar
          responsive={this.responsive} unit={this.unit} data={this.data}
          showLegend={this.showLegend} chartTitle={this.chartTitle} options={this.options}/> : ''
      }
      {this.type == 'text' ?
        <quantum-display
          responsive={this.responsive} unit={this.unit} data={this.data}
          displayTitle={this.chartTitle} options={this.options}/> : ''}
      {/*  </span>
      }*/}
    </div>
  }
}
