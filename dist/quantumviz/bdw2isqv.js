/*! Built with http://stenciljs.com */
const{h:t}=window.quantumviz;import{a as e}from"./chunk-49509f30.js";import{a}from"./chunk-cadd3091.js";import"./chunk-ee323282.js";class i{constructor(){this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.data="[]",this.hiddenData="[]",this.options="",this.width="",this.height="",this.legendOffset=70,this._mapIndex={}}redraw(t,e){e!==t&&this.drawChart()}changeScale(t,e){if(e!==t){const e=JSON.parse(t);"timestamp"===e.time.timeMode?(this._chart.options.scales.xAxes[0].time.stepSize=e.time.stepSize,this._chart.options.scales.xAxes[0].time.unit=e.time.unit,this._chart.options.scales.xAxes[0].time.displayFormats.millisecond=e.time.displayFormats,this._chart.update()):(this._chart.options.scales.xAxes[0].time.stepSize=e.time.stepSize,this._chart.options.scales.xAxes[0].time.unit=e.time.unit,this._chart.update())}}hideData(t,e){if(e!==t){const e=a.cleanArray(JSON.parse(t));Object.keys(this._mapIndex).forEach(t=>{this._chart.getDatasetMeta(this._mapIndex[t]).hidden=!!e.find(e=>e===t)}),this._chart.update()}}minBoundChange(t,e){this._chart.options.animation.duration=0,e!==t&&(this._chart.options.scales.xAxes[0].time.min=t,this._chart.update())}maxBoundChange(t,e){this._chart.options.animation.duration=0,e!==t&&(this._chart.options.scales.xAxes[0].time.max=t,this._chart.update())}drawChart(){let t=this.el.shadowRoot.querySelector("#myChart"),a=this.gtsToScatter(JSON.parse(this.data)),i=30*a.length+this.legendOffset,s=this.height||""!==this.height?Math.max(i,parseInt(this.height)):i;this.height=s+"",t.parentElement.style.height=s+"px",t.parentElement.style.width="100%";const n=this;this._chart=new e.Scatter(t,{data:{datasets:a},options:{layout:{padding:{bottom:30*a.length}},legend:{display:this.showLegend},responsive:this.responsive,tooltips:{mode:"x",position:"nearest",custom:function(t){t.opacity>0?n.pointHover.emit({x:t.dataPoints[0].x+15,y:this._eventPosition.y}):n.pointHover.emit({x:-100,y:this._eventPosition.y})},callbacks:{title:(t,e)=>t[0].xLabel||"",label:(t,e)=>`${e.datasets[t.datasetIndex].label}: ${e.datasets[t.datasetIndex].data[t.index].val}`}},scales:{xAxes:[{drawTicks:!1,type:"time",time:{min:this.timeMin,max:this.timeMax,unit:"day"},gridLines:{display:!1}}],yAxes:[{display:!1,drawTicks:!1,scaleLabel:{display:!1},afterFit:function(t){t.width=100},ticks:{min:0,max:1,beginAtZero:!0,stepSize:1}}]}}})}buildImage(t,e,a){const i=new Image(t,e),s=`<svg width="${t}px" height="${e}px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${t} ${e}" preserveAspectRatio="xMidYMid">\n<rect width="${t}" height="${e}" style="fill:${a};" />\n</svg>`;return i.src="data:image/svg+xml;base64,"+btoa(s),i}gtsToScatter(t){let e=[],i=0;if(t)return t.forEach(t=>{t.gts=a.flatDeep(t.gts),t.gts.forEach((s,n)=>{if(a.isGtsToAnnotate(s)){let h=[],r=a.getColor(n);const o=this.buildImage(1,30,r);s.v.forEach(t=>{h.push({x:t[0]/1e3,y:.5,val:t[t.length-1]})}),t.params&&t.params[n]&&t.params[n].color&&(r=t.params[n].color);let d=a.serializeGtsMetadata(s);this._mapIndex[d]=i,t.params&&t.params[n]&&t.params[n].key&&(d=t.params[n].key),e.push({label:d,data:h,pointRadius:5,pointHoverRadius:5,pointHitRadius:5,pointStyle:o,borderColor:r,backgroundColor:a.transparentize(r,.5)}),i++}})}),e}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("h1",null,this.chartTitle),t("div",{class:"chart-container",style:{position:"relative",width:this.width,height:this.height}},t("canvas",{id:"myChart",width:this.width,height:this.height})))}static get is(){return"quantum-annotation"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},hiddenData:{type:String,attr:"hidden-data",watchCallbacks:["hideData"]},options:{type:String,attr:"options",watchCallbacks:["changeScale"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},timeMax:{type:Number,attr:"time-max",watchCallbacks:["maxBoundChange"]},timeMin:{type:Number,attr:"time-min",watchCallbacks:["minBoundChange"]},width:{type:String,attr:"width"}}}static get events(){return[{name:"pointHover",method:"pointHover",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"quantum-annotation .chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"}}export{i as QuantumAnnotation};