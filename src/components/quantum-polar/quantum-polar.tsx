import Chart from 'chart.js';
import {Component, Element, Prop, Watch} from '@stencil/core';
import {ChartLib} from "../../utils/chart-lib";
import {ColorLib} from "../../utils/color-lib";
import {Logger} from "../../utils/logger";
import {Param} from "../../model/param";
import {DataModel} from "../../model/dataModel";

@Component({
  tag: 'quantum-polar',
  styleUrl: 'quantum-polar.scss',
  shadow: true
})
export class QuantumPolar {
  @Prop() unit: string = '';
  @Prop() chartTitle: string = '';
  @Prop() responsive: boolean = false;
  @Prop() showLegend: boolean = true;
  @Prop() data: DataModel | any[];
  @Prop() options: Param = {};
  @Prop() theme = 'light';
  @Prop({mutable: true}) width = '';
  @Prop({mutable: true}) height = '';

  @Element() el: HTMLElement;

  private LOG: Logger = new Logger(QuantumPolar);
  private _options: Param = {};
  private uuid = 'chart-' + ChartLib.guid().split('-').join('');

  @Watch('data')
  private onData(newValue: DataModel | any[], oldValue: DataModel | any[]) {
    if (oldValue !== newValue) {
      this.LOG.debug(['data'], newValue);
      this.drawChart();
    }
  }

  @Watch('options')
  private onOptions(newValue: Param, oldValue: Param) {
    if (oldValue !== newValue) {
      this.LOG.debug(['options'], newValue);
      this.drawChart();
    }
  }

  @Watch('theme')
  private onTheme(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.LOG.debug(['theme'], newValue);
      this.drawChart();
    }
  }

  private parseData(gts) {
    let labels = [];
    let data = [];
    gts.forEach(d => {
      data.push(d[1]);
      labels.push(d[0]);
    });
    return {labels: labels, data: data}
  }

  private drawChart() {
    this._options = ChartLib.mergeDeep(this._options, this.options);
    let ctx = this.el.shadowRoot.querySelector('#' + this.uuid);
    this.height = (this.responsive ? this.el.parentElement.clientHeight : this.height || 600) + '';
    this.width = (this.responsive ? this.el.parentElement.clientWidth : this.width || 800) + '';
    const color = this._options.gridLineColor || ChartLib.getGridColor(this.theme);
    if (!this.data) return;
    let dataList: any[];
    if (this.data instanceof DataModel) {
      dataList = this.data.data;
    } else {
      dataList = this.data;
    }
    let gts = this.parseData(dataList);
    new Chart.PolarArea(ctx, {
      type: 'polar',
      data: {
        datasets: [{
          data: gts.data,
          backgroundColor: ColorLib.generateTransparentColors(gts.data.length),
          borderColor: ColorLib.generateColors(gts.data.length),
          label: this.chartTitle
        }],
        labels: gts.labels
      },
      options: {
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 50,
            bottom: 0
          }
        },
        animation: {
          duration: 0,
        },
        legend: {display: this.showLegend},
        responsive: this.responsive,
        xAxes: [{
          gridLines: {
            color: color,
            zeroLineColor: color,
          },
          ticks: {
            fontColor: color
          }
        }],

        yAxes: [
          {
            gridLines: {
              color: color,
              zeroLineColor: color,
            },
            ticks: {
              fontColor: color
            }
          }
        ],
        tooltips: {
          mode: 'index',
          intersect: true,
        }
      }
    });
  }

  componentDidLoad() {
    this.drawChart()
  }

  render() {
    return (
      <div class={this.theme}>
        <h1>{this.chartTitle} <small>{this.unit}</small></h1>
        <div class="chart-container">
          <canvas id={this.uuid} width={this.width} height={this.height}/>
        </div>
      </div>
    );
  }
}
