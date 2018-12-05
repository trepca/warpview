/*! Built with http://stenciljs.com */
const{h:t}=window.warpview;import{e,c as i,b as s,a,d as h}from"./chunk-f6bb409c.js";class o{constructor(){this.width="",this.height="",this.responsive=!1,this.showLegend=!1,this.gtsFilter="",this._options={showControls:!0,showGTSTree:!0},this._data=new e,this._toHide=[],this.showChart=!0,this.showMap=!1,this.chartType="line",this.LOG=new s(o),this.graphId="container-"+h.guid()}componentDidLoad(){this.line=this.el.shadowRoot.querySelector("div.bar"),this.main=this.el.shadowRoot.querySelector("div.maincontainer"),this.chart=this.el.shadowRoot.querySelector("warp-view-chart"),this.annotation=this.el.shadowRoot.querySelector("warp-view-annotation"),this.drawCharts()}onGtsFilter(t,e){e!==t&&this.drawCharts()}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawCharts())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawCharts())}stateChange(t){switch(this.LOG.debug(["stateChange"],t.detail),t.detail.id){case"timeSwitch":t.detail.state?this._options.timeMode="timestamp":this._options.timeMode="date",this.drawCharts();break;case"typeSwitch":t.detail.state?this.chartType="step":this.chartType="line",this.drawCharts();break;case"chartSwitch":this.showChart=t.detail.state,this.drawCharts();break;case"mapSwitch":this.showMap=t.detail.state,this.showMap&&window.setTimeout(()=>{this.el.shadowRoot.querySelector("#map").resize()},500)}}boundsDidChange(t){this.LOG.debug(["boundsDidChange"],t.detail),this._timeMin=t.detail.bounds.min,this._timeMax=t.detail.bounds.max,this.line.style.left="-100px"}handleMouseMove(t){this.line=this.el.shadowRoot.querySelector("div.bar"),this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(()=>{this.line.style.display="block",this.line.style.left=Math.max(t.offsetX,100)+"px"},1))}handleMouseOut(t){this.LOG.debug(["handleMouseOut"],t),this.line.style.left=Math.max(t.offsetX,100)+"px",this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(()=>{this.line.style.left="-100px",this.line.style.display="none"},500))}onResize(t){const e=this.el.shadowRoot.querySelector("#"+this.graphId);this.LOG.debug(["warpViewChartResize"],[t.detail,e]),e&&(e.style.height=t.detail.h+"px")}warpViewSelectedGTS(t){this.LOG.debug(["warpViewSelectedGTS"],t.detail),this._toHide.find(e=>e===t.detail.gts.id)||t.detail.selected?this._toHide=this._toHide.filter(e=>e!==t.detail.gts.id):this._toHide.push(t.detail.gts.id),this.LOG.debug(["warp-viewSelectedGTS"],this._toHide),this._toHide=this._toHide.slice(),this.drawCharts()}drawCharts(){this.LOG.debug(["drawCharts"],[this.data,this.options]),this._options=h.mergeDeep(this._options,this.options),this._data=a.getData(this.data);let t=new i;t="string"==typeof this.options?JSON.parse(this.options):this.options,this._options=h.mergeDeep(this._options,t),this.LOG.debug(["drawCharts","parsed"],[this._data,this._options])}render(){return t("div",null,this._options.showControls?t("div",{class:"inline"},t("warp-view-toggle",{id:"timeSwitch","text-1":"Date","text-2":"Timestamp"}),t("warp-view-toggle",{id:"typeSwitch","text-1":"Line","text-2":"Step"}),t("warp-view-toggle",{id:"chartSwitch","text-1":"Hide chart","text-2":"Display chart",checked:this.showChart}),t("warp-view-toggle",{id:"mapSwitch","text-1":"Hide map","text-2":"Display map",checked:this.showMap})):"",this._options.showGTSTree?t("warp-view-gts-tree",{data:this._data,id:"tree",gtsFilter:this.gtsFilter,options:this._options}):"",this.showChart?t("div",{class:"maincontainer",onMouseMove:t=>this.handleMouseMove(t),onMouseLeave:t=>this.handleMouseOut(t)},t("div",{class:"bar"}),t("div",{class:"annotation"},t("warp-view-annotation",{data:this._data,responsive:this.responsive,id:"annotation","show-legend":this.showLegend,timeMin:this._timeMin,timeMax:this._timeMax,hiddenData:this._toHide,options:this._options})),t("div",{style:{width:"100%",height:"768px"},id:this.graphId},t("warp-view-chart",{id:"chart",responsive:this.responsive,standalone:!1,data:this._data,hiddenData:this._toHide,type:this.chartType,options:this._options}))):"",this.showMap?t("div",{style:{width:"100%",height:"768px"}},t("warp-view-map",{options:this._options,id:"map",data:this._data,responsive:this.responsive,hiddenData:this._toHide})):"")}static get is(){return"warp-view-plot"}static get encapsulation(){return"shadow"}static get properties(){return{_data:{state:!0},_options:{state:!0},_timeMax:{state:!0},_timeMin:{state:!0},_toHide:{state:!0},chartType:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},height:{type:String,attr:"height",mutable:!0},options:{type:String,attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showChart:{state:!0},showLegend:{type:Boolean,attr:"show-legend"},showMap:{state:!0},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"stateChange",method:"stateChange"},{name:"boundsDidChange",method:"boundsDidChange"},{name:"warpViewChartResize",method:"onResize"},{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS"}]}static get style(){return"[data-warp-view-plot-host]{position:relative}[data-warp-view-plot-host]   .maincontainer[data-warp-view-plot]{position:relative}[data-warp-view-plot-host]   .bar[data-warp-view-plot]{width:1px;left:-100px;position:absolute;background-color:var(--warp-view-bar-color,red);top:0;bottom:55px;overflow:hidden;display:none;z-index:0}[data-warp-view-plot-host]   .inline[data-warp-view-plot]{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-evenly;-webkit-justify-content:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%}[data-warp-view-plot-host]   .annotation[data-warp-view-plot]{max-width:calc(100% - 18px)}"}}class n{constructor(){this.checked=!1,this.text1="",this.text2="",this.state=!1}componentWillLoad(){this.state=this.checked}switched(){this.state=!this.state,this.stateChange.emit({state:this.state,id:this.el.id})}render(){return t("div",{class:"container"},t("div",{class:"text"},this.text1),t("label",{class:"switch"},this.state?t("input",{type:"checkbox",class:"switch-input",checked:!0,onClick:()=>this.switched()}):t("input",{type:"checkbox",class:"switch-input",onClick:()=>this.switched()}),t("span",{class:"switch-label"}),t("span",{class:"switch-handle"})),t("div",{class:"text"},this.text2))}static get is(){return"warp-view-toggle"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked"},el:{elementRef:!0},state:{state:!0},text1:{type:String,attr:"text-1"},text2:{type:String,attr:"text-2"}}}static get events(){return[{name:"stateChange",method:"stateChange",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return"[data-warp-view-toggle-host]   .switch[data-warp-view-toggle]{position:relative;margin-top:auto;margin-bottom:auto;display:block;width:var(--warp-view-switch-width,100px);height:var(--warp-view-switch-height,30px);padding:3px;border-radius:var(--warp-view-switch-radius,18px);cursor:pointer}[data-warp-view-toggle-host]   .switch-input[data-warp-view-toggle]{display:none}[data-warp-view-toggle-host]   .switch-label[data-warp-view-toggle]{position:relative;display:block;height:inherit;text-transform:uppercase;background:var(--warp-view-switch-inset-color,#eceeef);border-radius:inherit;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15)}[data-warp-view-toggle-host]   .switch-input[data-warp-view-toggle]:checked ~ .switch-label[data-warp-view-toggle]{background:var(--warp-view-switch-inset-checked-color,#00cd00);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2);box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2)}[data-warp-view-toggle-host]   .switch-handle[data-warp-view-toggle]{position:absolute;top:4px;left:4px;width:calc(var(--warp-view-switch-height,30px) - 2px);height:calc(var(--warp-view-switch-height,30px) - 2px);background:var(--warp-view-switch-handle-color,radial-gradient(#fff 15%,#f0f0f0 100%));border-radius:100%;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2)}[data-warp-view-toggle-host]   .switch-input[data-warp-view-toggle]:checked ~ .switch-handle[data-warp-view-toggle]{left:calc(var(--warp-view-switch-width,100px) - var(--warp-view-switch-height,30px) + 4px);background:var(--warp-view-switch-handle-checked-color,radial-gradient(#fff 15%,#00cd00 100%));-webkit-box-shadow:-1px 1px 5px rgba(0,0,0,.2);box-shadow:-1px 1px 5px rgba(0,0,0,.2)}[data-warp-view-toggle-host]   .switch-handle[data-warp-view-toggle], [data-warp-view-toggle-host]   .switch-label[data-warp-view-toggle]{-webkit-transition:All .3s ease;transition:All .3s ease;-webkit-transition:All .3s ease;-moz-transition:All .3s ease;-o-transition:All .3s ease}[data-warp-view-toggle-host]   .container[data-warp-view-toggle]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[data-warp-view-toggle-host]   .text[data-warp-view-toggle]{color:var(--warp-view-font-color,#000);padding:7px}"}}export{o as WarpViewPlot,n as WarpViewToggle};