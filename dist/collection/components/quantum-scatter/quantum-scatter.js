import Chart from 'chart.js';
import { ChartLib } from "../../utils/chart-lib";
import { ColorLib } from "../../utils/color-lib";
import { Logger } from "../../utils/logger";
import { GTSLib } from "../../utils/gts.lib";
export class QuantumScatter {
    constructor() {
        this.unit = '';
        this.chartTitle = '';
        this.responsive = false;
        this.showLegend = true;
        this.data = '[]';
        this.options = '{}';
        this.width = '';
        this.height = '';
        this.theme = 'light';
        this.LOG = new Logger(QuantumScatter);
        this._options = {};
        this.uuid = 'chart-' + ChartLib.guid().split('-').join('');
    }
    onData(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.LOG.debug(['data'], newValue);
            this.drawChart();
        }
    }
    onOptions(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.LOG.debug(['options'], newValue);
            this.drawChart();
        }
    }
    onTheme(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.LOG.debug(['theme'], newValue);
            this.drawChart();
        }
    }
    drawChart() {
        this._options = ChartLib.mergeDeep(this._options, JSON.parse(this.options));
        let ctx = this.el.shadowRoot.querySelector('#' + this.uuid);
        let gts = this.gtsToScatter(JSON.parse(this.data));
        this.height = (this.responsive ? this.el.parentElement.clientHeight : this.height || 600) + '';
        this.width = (this.responsive ? this.el.parentElement.clientWidth : this.width || 800) + '';
        const color = this._options.gridLineColor || ChartLib.getGridColor(this.theme);
        const options = {
            legend: {
                display: this.showLegend
            },
            responsive: this.responsive,
            tooltips: {
                mode: 'x',
                position: 'nearest',
                callbacks: ChartLib.getTooltipCallbacks()
            },
            scales: {
                xAxes: [{
                        gridLines: {
                            color: color,
                            zeroLineColor: color,
                        },
                        ticks: {
                            fontColor: color
                        }
                    }],
                yAxes: [{
                        gridLines: {
                            color: color,
                            zeroLineColor: color,
                        },
                        ticks: {
                            fontColor: color
                        },
                        scaleLabel: {
                            display: this.unit !== '',
                            labelString: this.unit
                        }
                    }]
            },
        };
        this.chart = new Chart.Scatter(ctx, {
            data: {
                datasets: gts
            },
            options: options
        });
        this.LOG.debug(['gtsToScatter', 'chart'], [gts, options]);
    }
    gtsToScatter(gts) {
        this.LOG.debug(['gtsToScatter'], gts);
        let dataList;
        if (gts.hasOwnProperty('data')) {
            dataList = gts.data;
        }
        else {
            dataList = gts;
        }
        let datasets = [];
        for (let i = 0; i < dataList.length; i++) {
            let g = dataList[i];
            let data = [];
            g.v.forEach(d => {
                data.push({ x: d[0] / 1000, y: d[d.length - 1] });
            });
            datasets.push({
                label: GTSLib.serializeGtsMetadata(g),
                data: data,
                pointRadius: 2,
                borderColor: ColorLib.getColor(i),
                backgroundColor: ColorLib.transparentize(ColorLib.getColor(i), 0.5)
            });
        }
        this.LOG.debug(['gtsToScatter', 'datasets'], datasets);
        return datasets;
    }
    customTooltips(tooltip) {
        // Tooltip Element
        let tooltipEl = this.el.shadowRoot.querySelector("#chartjs-tooltip");
        if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<table></table>';
            this.chart.canvas.parentNode.appendChild(tooltipEl);
        }
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
        }
        // Set caret Position
        tooltipEl.classList.remove('above', 'below', 'no-transform');
        if (tooltip.yAlign) {
            tooltipEl.classList.add(tooltip.yAlign);
        }
        else {
            tooltipEl.classList.add('no-transform');
        }
        function getBody(bodyItem) {
            return bodyItem.lines;
        }
        // Set Text
        if (tooltip.body) {
            var titleLines = tooltip.title || [];
            var bodyLines = tooltip.body.map(getBody);
            var innerHtml = '<thead>';
            titleLines.forEach(function (title) {
                innerHtml += '<tr><th>' + title + '</th></tr>';
            });
            innerHtml += '</thead><tbody>';
            bodyLines.forEach(function (body, i) {
                var colors = tooltip.labelColors[i];
                var style = 'background:' + colors.backgroundColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px';
                var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
                innerHtml += '<tr><td>' + span + body + '</td></tr>';
            });
            innerHtml += '</tbody>';
            var tableRoot = tooltipEl.querySelector('table');
            tableRoot.innerHTML = innerHtml;
        }
        var positionY = this.chart.canvas.offsetTop;
        var positionX = this.chart.canvas.offsetLeft;
        // Display, position, and set styles for font
        tooltipEl.style.opacity = '1';
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY + 'px';
        tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
        tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
        tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
        tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
    }
    componentDidLoad() {
        this.drawChart();
    }
    render() {
        return h("div", { class: this.theme },
            h("h1", null, this.chartTitle),
            h("div", { class: "chart-container" },
                h("canvas", { id: this.uuid, width: this.width, height: this.height })));
    }
    static get is() { return "quantum-scatter"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "chartTitle": {
            "type": String,
            "attr": "chart-title"
        },
        "data": {
            "type": String,
            "attr": "data",
            "watchCallbacks": ["onData"]
        },
        "el": {
            "elementRef": true
        },
        "height": {
            "type": String,
            "attr": "height",
            "mutable": true
        },
        "options": {
            "type": String,
            "attr": "options",
            "watchCallbacks": ["onOptions"]
        },
        "responsive": {
            "type": Boolean,
            "attr": "responsive"
        },
        "showLegend": {
            "type": Boolean,
            "attr": "show-legend"
        },
        "theme": {
            "type": String,
            "attr": "theme",
            "watchCallbacks": ["onTheme"]
        },
        "unit": {
            "type": String,
            "attr": "unit"
        },
        "width": {
            "type": String,
            "attr": "width",
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:quantum-scatter:**/"; }
}
