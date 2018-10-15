/*! Built with http://stenciljs.com */
warpview.loadBundle("b1hmmoxe",["exports","./chunk-1074ad0b.js","./chunk-698cd879.js","./chunk-29c10030.js","./chunk-4586562c.js","./chunk-12ee72ee.js"],function(t,e,i,a,s,n){var o=window.warpview.h,r=function(){function t(){this.responsive=!1,this.showLegend=!0,this.options=new a.Param,this.hiddenData=[],this.width="",this.height="",this.legendOffset=70,this._mapIndex={},this.LOG=new i.Logger(t),this._options={gridLineColor:"#000000",timeMode:"date"},this.uuid="chart-"+s.ChartLib.guid().split("-").join("")}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.changeScale=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.hideData=function(t,e){var a=this;if(e!==t&&this._chart){this.LOG.debug(["hiddenData"],t);var s=i.GTSLib.cleanArray(t);Object.keys(this._mapIndex).forEach(function(t){a._chart.getDatasetMeta(a._mapIndex[t]).hidden=!!s.find(function(e){return e===t})}),this._chart.update()}},t.prototype.minBoundChange=function(t,e){this._chart&&(this._chart.options.animation.duration=0,e!==t&&this._chart.options.scales.xAxes[0].time&&(this._chart.options.scales.xAxes[0].time.min=t,this.LOG.debug(["minBoundChange"],this._chart.options.scales.xAxes[0].time.min),this._chart.update()))},t.prototype.maxBoundChange=function(t,e){this._chart&&(this._chart.options.animation.duration=0,e!==t&&this._chart.options.scales.xAxes[0].time&&(this._chart.options.scales.xAxes[0].time.max=t,this.LOG.debug(["maxBoundChange"],this._chart.options.scales.xAxes[0].time.max),this._chart.update()))},t.prototype.drawChart=function(){var t=this;if(this.data){this._options.timeMode="date",this._options=s.ChartLib.mergeDeep(this._options,this.options),this.LOG.debug(["drawChart","hiddenData"],this.hiddenData);var i=this.el.shadowRoot.querySelector("#"+this.uuid),a=this.parseData(this.data),n=30*a.length+this.legendOffset,o=this.height||""!==this.height?Math.max(n,parseInt(this.height)):n;this.height=o.toString(),i.parentElement.style.height=o+"px",i.parentElement.style.width="100%";var r=this._options.gridLineColor,h=this,d={layout:{padding:{bottom:30*a.length}},legend:{display:this.showLegend},responsive:this.responsive,animation:{duration:0},tooltips:{mode:"x",position:"nearest",custom:function(t){t.opacity>0?h.pointHover.emit({x:t.dataPoints[0].x,y:this._eventPosition.y}):h.pointHover.emit({x:-100,y:this._eventPosition.y})},callbacks:{title:function(t){return t[0].xLabel||""},label:function(t,e){return e.datasets[t.datasetIndex].label+": "+e.datasets[t.datasetIndex].data[t.index].val}}},scales:{xAxes:[{drawTicks:!1,type:"linear",time:{},gridLines:{zeroLineColor:r,color:r,display:!1},ticks:{}}],yAxes:[{display:!1,drawTicks:!1,scaleLabel:{display:!1},afterFit:function(t){t.width=94},gridLines:{color:r,zeroLineColor:r},ticks:{fontColor:r,min:0,max:1,beginAtZero:!0,stepSize:1}}]}};this.LOG.debug(["options"],this._options),"timestamp"===this._options.timeMode?(d.scales.xAxes[0].time=void 0,d.scales.xAxes[0].type="linear",d.scales.xAxes[0].ticks={fontColor:r,min:this.timeMin,max:this.timeMax}):(d.scales.xAxes[0].time={min:this.timeMin,max:this.timeMax,displayFormats:{millisecond:"HH:mm:ss.SSS",second:"HH:mm:ss",minute:"HH:mm",hour:"HH"}},d.scales.xAxes[0].ticks={fontColor:r},d.scales.xAxes[0].type="time"),this.LOG.debug(["drawChart"],[o,a]),this._chart&&this._chart.destroy(),a&&0!==a.length&&(this._chart=new e.Chart.Scatter(i,{data:{datasets:a},options:d}),Object.keys(this._mapIndex).forEach(function(e){t._chart.getDatasetMeta(t._mapIndex[e]).hidden=!!t.hiddenData.find(function(t){return t===e})}),this._chart.update())}},t.prototype.parseData=function(t){var e=this;this.LOG.debug(["parseData"],t);var a=i.GTSLib.getData(t).data;if(this.LOG.debug(["parseData","dataList"],a),a&&0!==a.length){var n=[],o=0;return(a=i.GTSLib.flatDeep(a)).forEach(function(t,a){if(i.GTSLib.isGtsToAnnotate(t)){var r=[],h=i.ColorLib.getColor(a),d=s.ChartLib.buildImage(1,30,h);t.v.forEach(function(t){var i=t[0];"timestamp"!==e._options.timeMode&&(i=s.moment(i/1e3).utc(!0).valueOf(),e.LOG.debug(["moment"],i)),r.push({x:i,y:.5,val:t[t.length-1]})});var l=i.GTSLib.serializeGtsMetadata(t);e._mapIndex[l]=o,n.push({label:l,data:r,pointRadius:5,pointHoverRadius:5,pointHitRadius:5,pointStyle:d,borderColor:h,backgroundColor:i.ColorLib.transparentize(h,.5)}),o++}}),n}return[]},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return o("div",null,o("div",{class:"chart-container",style:{position:"relative",width:this.width,height:this.height}},o("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"warp-view-annotation"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["hideData"]},options:{type:"Any",attr:"options",watchCallbacks:["changeScale"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},timeMax:{type:Number,attr:"time-max",watchCallbacks:["maxBoundChange"]},timeMin:{type:Number,attr:"time-min",watchCallbacks:["minBoundChange"]},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"pointHover",method:"pointHover",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-annotation-host]   .chart-container[data-warp-view-annotation]{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),h=function(){function t(){this.width="",this.height="",this.responsive=!1,this.showLegend=!1,this._options=new a.Param,this._data=new i.DataModel,this._toHide=[],this.showChart=!0,this.showMap=!1,this.LOG=new i.Logger(t)}return t.prototype.componentDidLoad=function(){this.line=this.el.shadowRoot.querySelector("div.bar"),this.main=this.el.shadowRoot.querySelector("div.maincontainer"),this.chart=this.el.shadowRoot.querySelector("warp-view-chart"),this.annotation=this.el.shadowRoot.querySelector("warp-view-annotation"),this.drawCharts()},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawCharts())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawCharts())},t.prototype.stateChange=function(t){var e=this;switch(this.LOG.debug(["stateChange"],t.detail),t.detail.id){case"timeSwitch":t.detail.state?this._options.timeMode="timestamp":this._options.timeMode="date",this.drawCharts();break;case"chartSwitch":this.showChart=t.detail.state;break;case"mapSwitch":this.showMap=t.detail.state,this.showMap&&window.setTimeout(function(){e.el.shadowRoot.querySelector("#map").resize()},500)}},t.prototype.boundsDidChange=function(t){this.LOG.debug(["boundsDidChange"],t.detail),this._timeMin=t.detail.bounds.min,this._timeMax=t.detail.bounds.max,this.line.style.left="-100px"},t.prototype.handleMouseMove=function(t){var e=this;this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.LOG.debug(["handleMouseMove"],[t,this.mouseOutTimer]),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(function(){e.line.style.display="block",e.line.style.left=t.offsetX+"px"},1))},t.prototype.handleMouseOut=function(t){var e=this;this.LOG.debug(["handleMouseOut"],t),this.line.style.left=t.offsetX+"px",this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(function(){e.line.style.left="-100px",e.line.style.display="none"},500))},t.prototype.warpViewSelectedGTS=function(t){this.LOG.debug(["warpViewSelectedGTS"],t.detail),this._toHide.find(function(e){return e===t.detail.label})||t.detail.selected?this._toHide=this._toHide.filter(function(e){return e!==t.detail.label}):this._toHide.push(t.detail.label),this.LOG.debug(["warp-viewSelectedGTS"],this._toHide),this._toHide=this._toHide.slice(),this.drawCharts()},t.prototype.drawCharts=function(){this.LOG.debug(["drawCharts"],[this.data,this.options]),this._data=i.GTSLib.getData(this.data);var t=new a.Param;t="string"==typeof this.options?JSON.parse(this.options):this.options,this._options=s.ChartLib.mergeDeep(this._options,t),this.LOG.debug(["drawCharts","parsed"],[this._data,this._options])},t.prototype.render=function(){var t=this;return o("div",null,o("div",{class:"inline"},o("warp-view-toggle",{id:"timeSwitch","text-1":"Date","text-2":"Timestamp"}),o("warp-view-toggle",{id:"chartSwitch","text-1":"Hide chart","text-2":"Display chart",checked:this.showChart}),o("warp-view-toggle",{id:"mapSwitch","text-1":"Hide map","text-2":"Display map",checked:this.showMap})),o("warp-view-gts-tree",{data:this._data,id:"tree"}),this.showChart?o("div",{class:"maincontainer",onMouseMove:function(e){return t.handleMouseMove(e)},onMouseLeave:function(e){return t.handleMouseOut(e)}},o("div",{class:"bar"}),o("warp-view-annotation",{data:this._data,responsive:this.responsive,id:"annotation","show-legend":this.showLegend,timeMin:this._timeMin,timeMax:this._timeMax,hiddenData:this._toHide,options:this._options}),o("div",{style:{width:"100%",height:"768px"}},o("warp-view-chart",{id:"chart",responsive:this.responsive,standalone:!1,data:this._data,hiddenData:this._toHide,options:this._options}))):"",this.showMap?o("div",{style:{width:"100%",height:"768px"}},o("warp-view-map",{options:this._options,id:"map",data:this._data,responsive:this.responsive,hiddenData:this._toHide})):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-plot"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{_data:{state:!0},_options:{state:!0},_timeMax:{state:!0},_timeMin:{state:!0},_toHide:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:String,attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showChart:{state:!0},showLegend:{type:Boolean,attr:"show-legend"},showMap:{state:!0},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"stateChange",method:"stateChange"},{name:"boundsDidChange",method:"boundsDidChange"},{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-plot-host]{position:relative}[data-warp-view-plot-host]   .maincontainer[data-warp-view-plot]{position:relative}[data-warp-view-plot-host]   .bar[data-warp-view-plot]{width:1px;left:-100px;position:absolute;background-color:var(--warp-view-bar-color,red);top:0;bottom:55px;overflow:hidden;display:none;z-index:999}[data-warp-view-plot-host]   .inline[data-warp-view-plot]{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-evenly;-webkit-justify-content:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%}"},enumerable:!0,configurable:!0}),t}(),d=function(){function t(){this.checked=!1,this.text1="",this.text2="",this.state=!1}return t.prototype.componentWillLoad=function(){this.state=this.checked},t.prototype.switched=function(){this.state=!this.state,this.stateChange.emit({state:this.state,id:this.el.id})},t.prototype.render=function(){var t=this;return o("div",{class:"container"},o("div",{class:"text"},this.text1),o("label",{class:"switch"},this.state?o("input",{type:"checkbox",class:"switch-input",checked:!0,onClick:function(){return t.switched()}}):o("input",{type:"checkbox",class:"switch-input",onClick:function(){return t.switched()}}),o("span",{class:"switch-label"}),o("span",{class:"switch-handle"})),o("div",{class:"text"},this.text2))},Object.defineProperty(t,"is",{get:function(){return"warp-view-toggle"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{checked:{type:Boolean,attr:"checked"},el:{elementRef:!0},state:{state:!0},text1:{type:String,attr:"text-1"},text2:{type:String,attr:"text-2"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"stateChange",method:"stateChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-warp-view-toggle-host]   .switch[data-warp-view-toggle]{position:relative;margin-top:auto;margin-bottom:auto;display:block;width:var(--warp-view-switch-width,100px);height:var(--warp-view-switch-height,30px);padding:3px;border-radius:var(--warp-view-switch-radius,18px);cursor:pointer}[data-warp-view-toggle-host]   .switch-input[data-warp-view-toggle]{display:none}[data-warp-view-toggle-host]   .switch-label[data-warp-view-toggle]{position:relative;display:block;height:inherit;text-transform:uppercase;background:var(--warp-view-switch-inset-color,#eceeef);border-radius:inherit;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15)}[data-warp-view-toggle-host]   .switch-input[data-warp-view-toggle]:checked ~ .switch-label[data-warp-view-toggle]{background:var(--warp-view-switch-inset-checked-color,#00cd00);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2);box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2)}[data-warp-view-toggle-host]   .switch-handle[data-warp-view-toggle]{position:absolute;top:4px;left:4px;width:calc(var(--warp-view-switch-height,30px) - 2px);height:calc(var(--warp-view-switch-height,30px) - 2px);background:var(--warp-view-switch-handle-color,radial-gradient(#fff 15%,#f0f0f0 100%));border-radius:100%;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2)}[data-warp-view-toggle-host]   .switch-input[data-warp-view-toggle]:checked ~ .switch-handle[data-warp-view-toggle]{left:calc(var(--warp-view-switch-width,100px) - var(--warp-view-switch-height,30px) + 4px);background:var(--warp-view-switch-handle-checked-color,radial-gradient(#fff 15%,#00cd00 100%));-webkit-box-shadow:-1px 1px 5px rgba(0,0,0,.2);box-shadow:-1px 1px 5px rgba(0,0,0,.2)}[data-warp-view-toggle-host]   .switch-handle[data-warp-view-toggle], [data-warp-view-toggle-host]   .switch-label[data-warp-view-toggle]{-webkit-transition:All .3s ease;transition:All .3s ease;-webkit-transition:All .3s ease;-moz-transition:All .3s ease;-o-transition:All .3s ease}[data-warp-view-toggle-host]   .container[data-warp-view-toggle]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}[data-warp-view-toggle-host]   .text[data-warp-view-toggle]{color:var(--warp-view-font-color,#000);padding:7px}"},enumerable:!0,configurable:!0}),t}();t.WarpViewAnnotation=r,t.WarpViewPlot=h,t.WarpViewToggle=d,Object.defineProperty(t,"__esModule",{value:!0})});