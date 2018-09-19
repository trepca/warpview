/*! Built with http://stenciljs.com */
quantumviz.loadBundle("lzsgvvqu",["exports","./chunk-096584ca.js","./chunk-83c4cc39.js","./chunk-a0ba8c72.js","./chunk-87d66f99.js","./chunk-60da8b15.js","./chunk-12ee72ee.js"],function(t,e,i,n,o,s,a){var r=window.quantumviz.h,h=function(){function t(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new s.Param,this.width="",this.height="",this.LOG=new o.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+n.ChartLib.guid().split("-").join(""),this._mapIndex={}}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.buildGraph=function(){this._options=n.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid),i=this.gtsToData(this.data);if(i){var o=this._options.gridLineColor,s={legend:{display:this.showLegend},animation:{duration:0},tooltips:{mode:"index",position:"nearest"},scales:{xAxes:[{type:"time",gridLines:{color:o,zeroLineColor:o},ticks:{fontColor:o}}],yAxes:[{gridLines:{color:o,zeroLineColor:o},ticks:{fontColor:o},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive};this._chart&&this._chart.destroy(),this._chart=new e.Chart(t,{type:"bar",data:{labels:i.ticks,datasets:i.datasets},options:s})}},t.prototype.drawChart=function(){this._options=n.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.data&&this.buildGraph()},t.prototype.gtsToData=function(t){var e=this;this.LOG.debug(["gtsToData"],t);var n,s=[],a=[],r=0;if((n=this.data instanceof i.DataModel?t.data:t)&&0!==n.length)return(n=i.GTSLib.flatDeep(n)).forEach(function(t){var n=[];if(t.v){i.GTSLib.gtsSort(t),t.v.forEach(function(t){a.push(Math.floor(parseInt(t[0])/1e3)),n.push(t[t.length-1])});var h=o.ColorLib.getColor(r),l=i.GTSLib.serializeGtsMetadata(t);e._mapIndex[l]=r;var p={label:l,data:n,borderColor:h,borderWidth:1,backgroundColor:o.ColorLib.transparentize(h,.5)};s.push(p),r++}}),this.LOG.debug(["gtsToData","datasets"],s),{datasets:s,ticks:i.GTSLib.unique(a).sort(function(t,e){return t>e?1:t===e?0:-1})}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return r("div",null,r("div",{class:"chart-container"},r("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-bar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-bar-host]   div[data-quantum-bar]{height:var(--quantum-chart-height,100%)}[data-quantum-bar-host]   .chart-container[data-quantum-bar]{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),l=function(){function t(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new s.Param,this.width="",this.height="",this._options={gridLineColor:"#8e8e8e"},this.LOG=new o.Logger(t),this.uuid="chart-"+n.ChartLib.guid().split("-").join("")}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){this._options=n.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var t=this.el.shadowRoot.querySelector("#"+this.uuid);if(this.data){var o;o=this.data instanceof i.DataModel?this.data.data:this.data;var s=this._options.gridLineColor,a={legend:{display:this.showLegend},layout:{padding:{left:0,right:50,top:50,bottom:50}},borderWidth:1,animation:{duration:0},scales:{xAxes:[{gridLines:{color:s,zeroLineColor:s},ticks:{fontColor:s}}],yAxes:[{gridLines:{color:s,zeroLineColor:s},ticks:{fontColor:s},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive},r=this.parseData(o);this.LOG.debug(["drawChart"],[a,r]),this._chart&&this._chart.destroy(),this._chart=new e.Chart(t,{type:"bubble",tooltips:{mode:"x",position:"nearest",callbacks:n.ChartLib.getTooltipCallbacks()},data:{datasets:r},options:a})}},t.prototype.parseData=function(t){if(t){for(var e=[],n=function(n){var s=Object.keys(t[n])[0],a=[],r=t[n][s];i.GTSLib.isArray(r)&&r.forEach(function(t){a.push({x:t[0],y:t[1],r:t[2]})}),e.push({data:a,label:s,backgroundColor:o.ColorLib.transparentize(o.ColorLib.getColor(n),.5),borderColor:o.ColorLib.getColor(n),borderWidth:1})},s=0;s<t.length;s++)n(s);return e}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return r("div",null,r("div",{class:"chart-container"},r("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-bubble"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-bubble-host]   div[data-quantum-bubble]{height:var(--quantum-chart-height,100%)}[data-quantum-bubble-host]   .chart-container[data-quantum-bubble]{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),p=function(){function t(){this.unit="",this.responsive=!1,this.options=new s.Param,this.width="",this.height="",this.LOG=new o.Logger(t),this._options=new s.Param}return t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["onData"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){this.LOG.debug(["drawChart"],[this.options,this._options]),this._options=n.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"px",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"px",this.data instanceof i.DataModel?this.toDisplay=i.GTSLib.isArray(this.data.data)?this.data.data[0]:this.data.data:this.toDisplay=i.GTSLib.isArray(this.data)?this.data[0]:this.data,this.LOG.debug(["drawChart"],[this.data,this.toDisplay])},t.prototype.getStyle=function(){if(this.LOG.debug(["getStyle"],this._options),this._options){var t={"background-color":this._options.bgColor||"transparent"};return this._options.fontColor&&(t.color=this._options.fontColor),this.LOG.debug(["getStyle","style"],t),t}return{}},t.prototype.componentDidLoad=function(){this.LOG.debug(["componentDidLoad"],this._options),this.drawChart()},t.prototype.render=function(){return r("div",null,this.toDisplay&&""!==this.toDisplay?r("div",{class:"chart-container",id:"#wrapper"},r("div",{style:this.getStyle()},r("div",{class:"value"},this.toDisplay,r("small",null,this.unit)))):r("quantum-spinner",null))},Object.defineProperty(t,"is",{get:function(){return"quantum-display"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-display-host]   div[data-quantum-display]{height:var(--quantum-chart-height,100%)}[data-quantum-display-host]   .chart-container[data-quantum-display]{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative;color:var(--quantum-font-color,#000)}[data-quantum-display-host]   .chart-container[data-quantum-display]   div[data-quantum-display]{font-size:10rem;height:100%;width:100%}[data-quantum-display-host]   .chart-container[data-quantum-display]   div[data-quantum-display]   .value[data-quantum-display]{position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);text-align:center;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}[data-quantum-display-host]   .chart-container[data-quantum-display]   div[data-quantum-display]   .value[data-quantum-display]   small[data-quantum-display]{font-size:3rem}"},enumerable:!0,configurable:!0}),t}(),d=function(){function t(){this.imageTitle="",this.responsive=!1,this.options=new s.Param,this.width="",this.height="",this.LOG=new o.Logger(t),this._options=new s.Param}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["onData"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){var t=this;this.LOG.debug(["drawChart"],[this.options,this._options]),this._options=n.ChartLib.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"px",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"px",this.toDisplay=[],this.data instanceof i.DataModel?this.data.data&&this.data.data.length>0&&i.GTSLib.isEmbeddedImage(this.data.data[0])?this.toDisplay.push(this.data.data[0]):this.data.data&&i.GTSLib.isEmbeddedImage(this.data.data)&&this.toDisplay.push(this.data.data):i.GTSLib.isArray(this.data)&&this.data.forEach(function(e){i.GTSLib.isEmbeddedImage(e)&&t.toDisplay.push(e)}),this.LOG.debug(["drawChart"],[this.data,this.toDisplay])},t.prototype.getStyle=function(){if(this.LOG.debug(["getStyle"],this._options),this._options){var t={"background-color":this._options.bgColor||"transparent"};return this._options.fontColor&&(t.color=this._options.fontColor),this.LOG.debug(["getStyle","style"],t),t}return{}},t.prototype.componentDidLoad=function(){this.LOG.debug(["componentDidLoad"],this._options),this.drawChart()},t.prototype.render=function(){var t=this;return r("div",null,this.toDisplay?r("div",{class:"chart-container",id:"#wrapper"},this.toDisplay.map(function(e){return r("div",{style:t.getStyle()},r("img",{src:e,class:"responsive"}))})):r("quantum-spinner",null))},Object.defineProperty(t,"is",{get:function(){return"quantum-image"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},imageTitle:{type:String,attr:"image-title"},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-image-host]   div[data-quantum-image]{height:var(--quantum-chart-height,100%)}[data-quantum-image-host]   .chart-container[data-quantum-image]{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}[data-quantum-image-host]   .chart-container[data-quantum-image]   div[data-quantum-image]{font-size:10rem;height:100%;width:100%}[data-quantum-image-host]   .chart-container[data-quantum-image]   div[data-quantum-image]   .responsive[data-quantum-image]{width:calc(100% - 10px);height:auto}"},enumerable:!0,configurable:!0}),t}(),u=function(){function t(){this.showLegend=!0,this.options=new s.Param,this.width="",this.height="",this.responsive=!1,this.LOG=new o.Logger(t),this._options={type:"pie"},this.uuid="chart-"+n.ChartLib.guid().split("-").join("")}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.parseData=function(t){if(this.LOG.debug(["parseData"],t),t){var e=[],n=[];return(this.data instanceof i.DataModel?this.data.data:this.data).forEach(function(t){n.push(t[1]),e.push(t[0])}),this.LOG.debug(["parseData"],[e,n]),{labels:e,data:n}}},t.prototype.drawChart=function(){this._options=n.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid),i=this.parseData(this.data);i&&(this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.LOG.debug(["drawChart"],[this.data,this._options,i]),this._chart&&this._chart.destroy(),this._options.type=this.options.type||this._options.type,this._chart=new e.Chart(t,{type:"gauge"===this._options.type?"doughnut":this._options.type,data:{datasets:[{data:i.data,backgroundColor:o.ColorLib.generateTransparentColors(i.data.length),borderColor:o.ColorLib.generateColors(i.data.length)}],labels:i.labels},options:{legend:{display:this.showLegend},animation:{duration:0},responsive:this.responsive,tooltips:{mode:"index",intersect:!0},circumference:this.getCirc(),rotation:this.getRotation()}}))},t.prototype.getRotation=function(){return"gauge"===this._options.type?Math.PI:-.5*Math.PI},t.prototype.getCirc=function(){return"gauge"===this._options.type?Math.PI:2*Math.PI},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return r("div",null,r("div",{class:"chart-container"},r("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-pie"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-pie-host]   div[data-quantum-pie]{width:calc(var(--quantum-chart-width,100%));height:calc(var(--quantum-chart-height,100%) - 10px)}[data-quantum-pie-host]   .chart-container[data-quantum-pie]{position:relative;margin:auto}"},enumerable:!0,configurable:!0}),t}(),c=function(){function t(){this.responsive=!1,this.showLegend=!0,this.options=new s.Param,this.width="",this.height="",this.LOG=new o.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+n.ChartLib.guid().split("-").join("")}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.parseData=function(t){var e=[],i=[];return t.forEach(function(t){i.push(t[1]),e.push(t[0])}),{labels:e,data:i}},t.prototype.drawChart=function(){this._options=n.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var s=this._options.gridLineColor;if(this.LOG.debug(["color"],s),this.data){var a;a=this.data instanceof i.DataModel?this.data.data:this.data;var r=this.parseData(a);this._chart&&this._chart.destroy(),this._chart=new e.Chart(t,{type:"polarArea",data:{datasets:[{data:r.data,backgroundColor:o.ColorLib.generateTransparentColors(r.data.length),borderColor:o.ColorLib.generateColors(r.data.length)}],labels:r.labels},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:s,zeroLineColor:s},pointLabels:{fontColor:s},ticks:{fontColor:s,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}})}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return r("div",null,r("div",{class:"chart-container"},r("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-polar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-polar-host]   div[data-quantum-polar]{height:var(--quantum-chart-height,100%)}[data-quantum-polar-host]   .chart-container[data-quantum-polar]{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),g=function(){function t(){this.responsive=!0,this.showLegend=!0,this.options=new s.Param,this.width="",this.height="",this.LOG=new o.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+n.ChartLib.guid().split("-").join("")}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.parseData=function(t){this.LOG.debug(["gtsToData"],t);var e=[],i={};if(t&&0!==t.length){var n=0;return t.forEach(function(t){Object.keys(t).forEach(function(s){var a={label:s,data:[],backgroundColor:o.ColorLib.transparentize(o.ColorLib.getColor(n),.5),borderColor:o.ColorLib.getColor(n)};t[s].forEach(function(t){var e=Object.keys(t)[0];i[e]=0,a.data.push(t[e])}),e.push(a),n++})}),this.LOG.debug(["gtsToData","datasets"],[e,Object.keys(i)]),{datasets:e,labels:Object.keys(i)}}},t.prototype.drawChart=function(){this._options=n.ChartLib.mergeDeep(this._options,this.options);var t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var o=this._options.gridLineColor;if(this.data){var s;s=this.data instanceof i.DataModel?this.data.data:this.data;var a=this.parseData(s);a&&(this._chart&&this._chart.destroy(),this._chart=new e.Chart(t,{type:"radar",legend:{display:this.showLegend},data:{labels:a.labels,datasets:a.datasets},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:o,zeroLineColor:o},pointLabels:{fontColor:o},ticks:{fontColor:o,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}}))}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return r("div",null,r("div",{class:"chart-container"},r("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-radar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-radar-host]   div[data-quantum-radar]{height:var(--quantum-chart-height,100%)}[data-quantum-radar-host]   .chart-container[data-quantum-radar]{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),b=function(){function t(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new s.Param,this.width="",this.height="",this.LOG=new o.Logger(t),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+n.ChartLib.guid().split("-").join("")}return t.prototype.onResize=function(){var t=this;clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(function(){t.LOG.debug(["onResize"],t.el.parentElement.clientWidth),t.drawChart()},250)},t.prototype.onData=function(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())},t.prototype.onOptions=function(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())},t.prototype.drawChart=function(){this._options=n.ChartLib.mergeDeep(this._options,this.options);var t,o=this.el.shadowRoot.querySelector("#"+this.uuid);t=this.data instanceof i.DataModel?this.data.data:this.data;var s=this.gtsToScatter(t);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";var a=this._options.gridLineColor,r={legend:{display:this.showLegend},responsive:this.responsive,animation:{duration:0},tooltips:{mode:"x",position:"nearest",callbacks:n.ChartLib.getTooltipCallbacks()},scales:{xAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a}}],yAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]}};this._chart&&this._chart.destroy(),this._chart=new e.Chart.Scatter(o,{data:{datasets:s},options:r}),this.LOG.debug(["gtsToScatter","chart"],[s,r])},t.prototype.gtsToScatter=function(t){if(t){this.LOG.debug(["gtsToScatter"],t);for(var e=[],n=function(n){var s=t[n],a=[];s.v.forEach(function(t){a.push({x:t[0]/1e3,y:t[t.length-1]})}),e.push({label:i.GTSLib.serializeGtsMetadata(s),data:a,pointRadius:2,borderColor:o.ColorLib.getColor(n),backgroundColor:o.ColorLib.transparentize(o.ColorLib.getColor(n),.5)})},s=0;s<t.length;s++)n(s);return this.LOG.debug(["gtsToScatter","datasets"],e),e}},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return r("div",null,r("div",{class:"chart-container"},r("canvas",{id:this.uuid,width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-scatter"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"window:resize",method:"onResize",passive:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-scatter-host]   div[data-quantum-scatter]{height:var(--quantum-chart-height,100%)}[data-quantum-scatter-host]   .chart-container[data-quantum-scatter]{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}(),f=function(){function t(){this.LOG=new o.Logger(t),this.unit="",this.type="line",this.chartTitle="",this.responsive=!1,this.showLegend=!0,this.url="",this.warpscript="",this.graphs={scatter:["scatter"],chart:["line","spline","step","area"],pie:["pie","doughnut","gauge"],polar:["polar"],radar:["radar"],bar:["bar"]},this.loading=!0}return t.prototype.onOptions=function(t,e){this.LOG.debug(["options"],t),e!==t&&(this.LOG.debug(["options","changed"],t),this.parseGTS())},t.prototype.componentDidLoad=function(){this.execute()},t.prototype.parseGTS=function(){var t=new i.DataModel;if(i.GTSLib.isArray(this.gtsList)&&1===this.gtsList.length){var e=this.gtsList[0];e.hasOwnProperty("data")?(t.data=e.data,t.globalParams=e.globalParams||{},t.globalParams.type=t.globalParams.type||this.type,t.params=e.params):(t.data=e,t.globalParams={type:this.type})}else t.data=this.gtsList,t.globalParams={type:this.type};this.LOG.debug(["parseGTS","data"],t),this.data=t,this._options=n.ChartLib.mergeDeep(this.options||{},t.globalParams),this.LOG.debug(["parseGTS","options"],this._options),this.loading=!1},t.prototype.execute=function(){var t=this;this.loading=!0,this.warpscript=this.wsElement.textContent,this.LOG.debug(["componentDidLoad","warpscript"],this.warpscript),fetch(this.url,{method:"POST",body:this.warpscript}).then(function(e){e.text().then(function(e){t.gtsList=JSON.parse(e),t.parseGTS()},function(e){t.LOG.error(["componentDidLoad"],e),t.loading=!1})},function(e){t.LOG.error(["componentDidLoad"],e),t.loading=!1})},t.prototype.render=function(){return r("div",{class:"wrapper",id:"wrapper"},r("div",{class:"warpscript"},r("slot",null)),this.graphs.scatter.indexOf(this.type)>-1?r("div",null,r("h1",null,this.chartTitle),r("div",{class:"tile"},r("quantum-scatter",{responsive:this.responsive,unit:this.unit,data:this.data,options:this._options,"show-legend":this.showLegend}))):"",this.graphs.chart.indexOf(this.type)>-1?r("div",null,r("h1",null,this.chartTitle),r("div",{class:"tile"},r("quantum-chart",{type:this.type,responsive:this.responsive,unit:this.unit,data:this.data,options:this._options,"show-legend":this.showLegend}))):"","bubble"==this.type?r("div",null,r("h1",null,this.chartTitle,r("small",null,this.unit)),r("div",{class:"tile"},r("quantum-bubble",{showLegend:this.showLegend,responsive:!0,unit:this.unit,data:this.data,options:this._options}))):"","map"==this.type?r("div",null,r("h1",null,this.chartTitle,r("small",null,this.unit)),r("div",{class:"tile"},r("quantum-map",{responsive:!0,data:this.data}))):"",this.graphs.pie.indexOf(this.type)>-1?r("div",null,r("h1",null,this.chartTitle,r("small",null,this.unit)),r("div",{class:"tile"},r("quantum-pie",{responsive:this.responsive,data:this.data,options:this._options,showLegend:this.showLegend}))):"",this.graphs.polar.indexOf(this.type)>-1?r("div",null,r("h1",null,this.chartTitle,r("small",null,this.unit)),r("div",{class:"tile"},r("quantum-polar",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"",this.graphs.radar.indexOf(this.type)>-1?r("div",null,r("h1",null,this.chartTitle,r("small",null,this.unit)),r("div",{class:"tile"},r("quantum-radar",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"",this.graphs.bar.indexOf(this.type)>-1?r("div",null,r("h1",null,this.chartTitle),r("div",{class:"tile"},r("quantum-bar",{responsive:this.responsive,unit:this.unit,data:this.data,showLegend:this.showLegend,options:this._options}))):"","text"==this.type?r("div",null,r("h1",null,this.chartTitle),r("div",{class:"tile"},r("quantum-display",{responsive:this.responsive,unit:this.unit,data:this.data,options:this._options}))):"","image"==this.type?r("div",null,r("h1",null,this.chartTitle,r("small",null,this.unit)),r("div",{class:"tile"},r("quantum-image",{responsive:this.responsive,data:this.data,options:this._options}))):"","plot"==this.type?r("div",null,r("h1",null,this.chartTitle,r("small",null,this.unit)),r("div",{class:"tile"},r("quantum-plot",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"")},Object.defineProperty(t,"is",{get:function(){return"quantum-tile"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{chartTitle:{type:String,attr:"chart-title"},data:{state:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},url:{type:String,attr:"url"},wsElement:{elementRef:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"[data-quantum-tile-host]{--quantum-chart-height:100%}[data-quantum-tile-host]   .warpscript[data-quantum-tile]{display:none}[data-quantum-tile-host]   .wrapper[data-quantum-tile]{min-height:var(--quantum-tile-height,400px);width:var(--quantum-tile-width,100%);height:var(--quantum-tile-height,100%)}[data-quantum-tile-host]   .wrapper[data-quantum-tile]   .tile[data-quantum-tile]{width:100%;height:calc(var(--quantum-tile-height,100%) - 40px);position:absolute;top:0;bottom:0;left:0;right:0;overflow-y:auto;overflow-x:hidden;margin:60px 0 0;padding-bottom:10px}[data-quantum-tile-host]   .wrapper[data-quantum-tile]   h1[data-quantum-tile]{font-size:20px;padding:5px;margin:0;color:var(--quantum-font-color,#000)}[data-quantum-tile-host]   .wrapper[data-quantum-tile]   h1[data-quantum-tile]   small[data-quantum-tile]{font-size:10px;margin-left:10px}"},enumerable:!0,configurable:!0}),t}();t.QuantumBar=h,t.QuantumBubble=l,t.QuantumDisplay=p,t.QuantumImage=d,t.QuantumPie=u,t.QuantumPolar=c,t.QuantumRadar=g,t.QuantumScatter=b,t.QuantumTile=f,Object.defineProperty(t,"__esModule",{value:!0})});