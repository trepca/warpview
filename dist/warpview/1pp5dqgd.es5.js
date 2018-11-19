/*! Built with http://stenciljs.com */
warpview.loadBundle("1pp5dqgd",["exports","./chunk-ffddf84d.js"],function(t,e){var i=window.warpview.h,s=function(){function t(){this.width="",this.height="",this.responsive=!1,this.showLegend=!1,this.gtsFilter="",this._options={showControls:!0,showGTSTree:!0},this._data=new e.DataModel,this._toHide=[],this.showChart=!0,this.showMap=!1,this.LOG=new e.Logger(t),this.graphId="container-"+e.ChartLib.guid()}return t.prototype.componentDidLoad=function(){this.line=this.el.shadowRoot.querySelector("div.bar"),this.main=this.el.shadowRoot.querySelector("div.maincontainer"),this.chart=this.el.shadowRoot.querySelector("warp-view-chart"),this.annotation=this.el.shadowRoot.querySelector("warp-view-annotation"),this.drawCharts()},t.prototype.onGtsFilter=function(t,e){e!==t&&this.drawCharts()},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawCharts())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawCharts())},t.prototype.stateChange=function(t){var e=this;switch(this.LOG.debug(["stateChange"],t.detail),t.detail.id){case"timeSwitch":t.detail.state?this._options.timeMode="timestamp":this._options.timeMode="date",this.drawCharts();break;case"chartSwitch":this.showChart=t.detail.state,this.drawCharts();break;case"mapSwitch":this.showMap=t.detail.state,this.showMap&&window.setTimeout(function(){e.el.shadowRoot.querySelector("#map").resize()},500)}},t.prototype.boundsDidChange=function(t){this.LOG.debug(["boundsDidChange"],t.detail),this._timeMin=t.detail.bounds.min,this._timeMax=t.detail.bounds.max,this.line.style.left="-100px"},t.prototype.handleMouseMove=function(t){var e=this;this.line=this.el.shadowRoot.querySelector("div.bar"),this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(function(){e.line.style.display="block",e.line.style.left=Math.max(t.offsetX,100)+"px"},1))},t.prototype.handleMouseOut=function(t){var e=this;this.LOG.debug(["handleMouseOut"],t),this.line.style.left=Math.max(t.offsetX,100)+"px",this.mouseOutTimer&&(window.clearTimeout(this.mouseOutTimer),delete this.mouseOutTimer),this.mouseOutTimer||(this.mouseOutTimer=window.setTimeout(function(){e.line.style.left="-100px",e.line.style.display="none"},500))},t.prototype.onResize=function(t){var e=this.el.shadowRoot.querySelector("#"+this.graphId);this.LOG.debug(["warpViewChartResize"],[t.detail,e]),e&&(e.style.height=t.detail.h+"px")},t.prototype.warpViewSelectedGTS=function(t){this.LOG.debug(["warpViewSelectedGTS"],t.detail),this._toHide.find(function(e){return e===t.detail.label})||t.detail.selected?this._toHide=this._toHide.filter(function(e){return e!==t.detail.label}):this._toHide.push(t.detail.label),this.LOG.debug(["warp-viewSelectedGTS"],this._toHide),this._toHide=this._toHide.slice(),this.drawCharts()},t.prototype.drawCharts=function(){this.LOG.debug(["drawCharts"],[this.data,this.options]),this._options=e.ChartLib.mergeDeep(this._options,this.options),this._data=e.GTSLib.getData(this.data);var t=new e.Param;t="string"==typeof this.options?JSON.parse(this.options):this.options,this._options=e.ChartLib.mergeDeep(this._options,t),this.LOG.debug(["drawCharts","parsed"],[this._data,this._options])},t.prototype.render=function(){var t=this;return i("div",null,this._options.showControls?i("div",{class:"inline"},i("warp-view-toggle",{id:"timeSwitch","text-1":"Date","text-2":"Timestamp"}),i("warp-view-toggle",{id:"chartSwitch","text-1":"Hide chart","text-2":"Display chart",checked:this.showChart}),i("warp-view-toggle",{id:"mapSwitch","text-1":"Hide map","text-2":"Display map",checked:this.showMap})):"",this._options.showGTSTree?i("warp-view-gts-tree",{data:this._data,id:"tree",gtsFilter:this.gtsFilter,options:this._options}):"",this.showChart?i("div",{class:"maincontainer",onMouseMove:function(e){return t.handleMouseMove(e)},onMouseLeave:function(e){return t.handleMouseOut(e)}},i("div",{class:"bar"}),i("div",{class:"annotation"},i("warp-view-annotation",{data:this._data,responsive:this.responsive,id:"annotation","show-legend":this.showLegend,timeMin:this._timeMin,timeMax:this._timeMax,hiddenData:this._toHide,options:this._options})),i("div",{style:{width:"100%",height:"768px"},id:this.graphId},i("warp-view-chart",{id:"chart",responsive:this.responsive,standalone:!1,data:this._data,hiddenData:this._toHide,options:this._options}))):"",this.showMap?i("div",{style:{width:"100%",height:"768px"}},i("warp-view-map",{options:this._options,id:"map",data:this._data,responsive:this.responsive,hiddenData:this._toHide})):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-plot"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{_data:{state:!0},_options:{state:!0},_timeMax:{state:!0},_timeMin:{state:!0},_toHide:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},height:{type:String,attr:"height",mutable:!0},options:{type:String,attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showChart:{state:!0},showLegend:{type:Boolean,attr:"show-legend"},showMap:{state:!0},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"stateChange",method:"stateChange"},{name:"boundsDidChange",method:"boundsDidChange"},{name:"warpViewChartResize",method:"onResize"},{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host{position:relative}:host .maincontainer{position:relative}:host .bar{width:1px;left:-100px;position:absolute;background-color:var(--warp-view-bar-color,red);top:0;bottom:55px;overflow:hidden;display:none;z-index:999}:host .inline{display:-webkit-inline-box;display:-webkit-inline-flex;display:-ms-inline-flexbox;display:inline-flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-pack:space-evenly;-webkit-justify-content:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;width:100%}:host .annotation{max-width:calc(100% - 18px)}"},enumerable:!0,configurable:!0}),t}(),o=function(){function t(){this.checked=!1,this.text1="",this.text2="",this.state=!1}return t.prototype.componentWillLoad=function(){this.state=this.checked},t.prototype.switched=function(){this.state=!this.state,this.stateChange.emit({state:this.state,id:this.el.id})},t.prototype.render=function(){var t=this;return i("div",{class:"container"},i("div",{class:"text"},this.text1),i("label",{class:"switch"},this.state?i("input",{type:"checkbox",class:"switch-input",checked:!0,onClick:function(){return t.switched()}}):i("input",{type:"checkbox",class:"switch-input",onClick:function(){return t.switched()}}),i("span",{class:"switch-label"}),i("span",{class:"switch-handle"})),i("div",{class:"text"},this.text2))},Object.defineProperty(t,"is",{get:function(){return"warp-view-toggle"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{checked:{type:Boolean,attr:"checked"},el:{elementRef:!0},state:{state:!0},text1:{type:String,attr:"text-1"},text2:{type:String,attr:"text-2"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"stateChange",method:"stateChange",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host .switch{position:relative;margin-top:auto;margin-bottom:auto;display:block;width:var(--warp-view-switch-width,100px);height:var(--warp-view-switch-height,30px);padding:3px;border-radius:var(--warp-view-switch-radius,18px);cursor:pointer}:host .switch-input{display:none}:host .switch-label{position:relative;display:block;height:inherit;text-transform:uppercase;background:var(--warp-view-switch-inset-color,#eceeef);border-radius:inherit;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15)}:host .switch-input:checked~.switch-label{background:var(--warp-view-switch-inset-checked-color,#00cd00);-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2);box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2)}:host .switch-handle{position:absolute;top:4px;left:4px;width:calc(var(--warp-view-switch-height,30px) - 2px);height:calc(var(--warp-view-switch-height,30px) - 2px);background:var(--warp-view-switch-handle-color,radial-gradient(#fff 15%,#f0f0f0 100%));border-radius:100%;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2)}:host .switch-input:checked~.switch-handle{left:calc(var(--warp-view-switch-width,100px) - var(--warp-view-switch-height,30px) + 4px);background:var(--warp-view-switch-handle-checked-color,radial-gradient(#fff 15%,#00cd00 100%));-webkit-box-shadow:-1px 1px 5px rgba(0,0,0,.2);box-shadow:-1px 1px 5px rgba(0,0,0,.2)}:host .switch-handle,:host .switch-label{-webkit-transition:All .3s ease;transition:All .3s ease;-webkit-transition:All .3s ease;-moz-transition:All .3s ease;-o-transition:All .3s ease}:host .container{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}:host .text{color:var(--warp-view-font-color,#000);padding:7px}"},enumerable:!0,configurable:!0}),t}();t.WarpViewPlot=s,t.WarpViewToggle=o,Object.defineProperty(t,"__esModule",{value:!0})});