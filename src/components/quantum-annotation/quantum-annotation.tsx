import Chart from 'chart.js';
import {Component, Prop, Element, Watch, EventEmitter, Event} from '@stencil/core';
import {GTSLib} from '../../utils/gts.lib';
import {ColorLib} from "../../utils/color-lib";
import {Logger} from "../../utils/logger";
import {Param} from "../../model/param";
import {ChartLib} from "../../utils/chart-lib";

@Component({
  tag: "quantum-annotation",
  styleUrl: "quantum-annotation.scss",
  shadow: true
})
export class QuantumAnnotation {
  @Prop() chartTitle: string = "";
  @Prop() responsive: boolean = false;
  @Prop() showLegend: boolean = true;
  @Prop() data: string = "[]";
  @Prop() hiddenData: string = "[]";
  @Prop() options: string = "{}";
  @Prop() timeMin: number;
  @Prop() timeMax: number;
  @Prop() theme = "light";
  @Prop({mutable: true}) width = "";
  @Prop({mutable: true}) height = "";

  @Event() pointHover: EventEmitter;
  @Element() el: HTMLElement;

  private legendOffset = 70;
  private _chart;
  private _mapIndex = {};
  private LOG: Logger = new Logger(QuantumAnnotation);
  private _options: Param = {};
  private uuid = 'chart-' + ChartLib.guid().split('-').join('');

  @Watch('data')
  private onData(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.LOG.debug(['data'], newValue);
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

  @Watch("options")
  changeScale(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      this.LOG.debug(['options'], newValue);
      const data = JSON.parse(newValue);
      if (data.time.timeMode === "timestamp") {
        this._chart.options.scales.xAxes[0].time.stepSize = data.time.stepSize;
        this._chart.options.scales.xAxes[0].time.unit = data.time.unit;
        this._chart.options.scales.xAxes[0].time.displayFormats.millisecond =
          data.time.displayFormats;
        this._chart.update();
      } else {
        this._chart.options.scales.xAxes[0].time.stepSize = data.time.stepSize;
        this._chart.options.scales.xAxes[0].time.unit = data.time.unit;
        this._chart.update();
      }
    }
  }

  @Watch("hiddenData")
  hideData(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      const hiddenData = GTSLib.cleanArray(JSON.parse(newValue));
      Object.keys(this._mapIndex).forEach(key => {
        this._chart.getDatasetMeta(this._mapIndex[key]).hidden = !!hiddenData.find(item => item === key);
      });
      this._chart.update();
    }
  }

  @Watch("timeMin")
  minBoundChange(newValue: number, oldValue: number) {
    this._chart.options.animation.duration = 0;
    if (oldValue !== newValue) {
      this._chart.options.scales.xAxes[0].time.min = newValue;
      this._chart.update();
    }
    this.LOG.debug(['minBoundChange'], this._chart.options.scales.xAxes[0].time.min);
  }

  @Watch("timeMax")
  maxBoundChange(newValue: number, oldValue: number) {
    this._chart.options.animation.duration = 0;
    if (oldValue !== newValue) {
      this._chart.options.scales.xAxes[0].time.max = newValue;
      this._chart.update();
    }
    this.LOG.debug(['maxBoundChange'], this._chart.options.scales.xAxes[0].time.max);
  }

  /**
   *
   */
  private drawChart() {
    this._options = ChartLib.mergeDeep(this._options, JSON.parse(this.options));
    let ctx = this.el.shadowRoot.querySelector('#' + this.uuid);
    let gts = this.parseData(JSON.parse(this.data));
    let calculatedHeight = 30 * gts.length + this.legendOffset;
    let height =
      this.height || this.height !== ""
        ? Math.max(calculatedHeight, parseInt(this.height))
        : calculatedHeight;
    this.height = height + "";
    (ctx as HTMLElement).parentElement.style.height = height + "px";
    (ctx as HTMLElement).parentElement.style.width = "100%";
    const color = this._options.gridLineColor || ChartLib.getGridColor(this.theme);
    const me = this;
    this._chart = new Chart.Scatter(ctx, {
      data: {
        datasets: gts
      },
      options: {
        layout: {
          padding: {
            bottom: 30 * gts.length
          }
        },
        legend: { display: this.showLegend },
        responsive: this.responsive,
        tooltips: {
          mode: "x",
          position: "nearest",
          custom: function(tooltip) {
            if (tooltip.opacity > 0) {
              me.pointHover.emit({
                x: tooltip.dataPoints[0].x + 15,
                y: this._eventPosition.y
              });
            } else {
              me.pointHover.emit({ x: -100, y: this._eventPosition.y });
            }
            return;
          },
          callbacks: {
            title: (tooltipItems) => {
              return tooltipItems[0].xLabel || "";
            },
            label: (tooltipItem, data) => {
              return `${data.datasets[tooltipItem.datasetIndex].label}: ${
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                  .val
              }`;
            }
          }
        },
        scales: {
          xAxes: [
            {
              drawTicks: false,
              type: "time",
              time: {
                min: this.timeMin,
                max: this.timeMax,
                unit: "day"
              },
              gridLines: {
                zeroLineColor: color,
                color: color,
                display: false
              },
              ticks: {
                fontColor: color
              }
            }
          ],
          yAxes: [
            {
              display: false,
              drawTicks: false,
              scaleLabel: {
                display: false
              },
              afterFit: function(scaleInstance) {
                scaleInstance.width = 100; // sets the width to 100px
              },
              gridLines: {
                color: color,
                zeroLineColor: color,
              },
              ticks: {
                fontColor: color,
                min: 0,
                max: 1,
                beginAtZero: true,
                stepSize: 1
              }
            }
          ]
        }
      }
    });
  }

  /**
   *
   * @param gts
   * @returns {any[]}
   */
  private parseData(gts) {
    let dataList: any[];
    if (gts.hasOwnProperty('data')) {
      dataList = gts.data
    } else {
      dataList = gts;
    }
    let datasets = [];
    let pos = 0;
    if (!gts) {
      return;
    } else {
      dataList = GTSLib.flatDeep(dataList);
      dataList.forEach((g, i) => {
        if (GTSLib.isGtsToAnnotate(g)) {
          let data = [];
          let color = ColorLib.getColor(i);
          const myImage = ChartLib.buildImage(1, 30, color);
          g.v.forEach(d => {
            data.push({x: d[0] / 1000, y: 0.5, val: d[d.length - 1]});
          });
          let label = GTSLib.serializeGtsMetadata(g);
          this._mapIndex[label] = pos;
          datasets.push({
            label: label,
            data: data,
            pointRadius: 5,
            pointHoverRadius: 5,
            pointHitRadius: 5,
            pointStyle: myImage,
            borderColor: color,
            backgroundColor: ColorLib.transparentize(color, 0.5)
          });
          pos++;
        }
      });
    }
    return datasets;
  }

  componentDidLoad() {
    this.drawChart();
  }

  render() {
    return (
      <div class={this.theme}>
        <h1>{this.chartTitle}</h1>
        <div
          class="chart-container"
          style={{
            position: "relative",
            width: this.width,
            height: this.height
          }}
        ><canvas id={this.uuid} width={this.width} height={this.height} /></div>
      </div>
    );
  }
}
