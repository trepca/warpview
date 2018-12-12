/*! Built with http://stenciljs.com */
const{h:t}=window.warpview;import{d as e}from"./chunk-dd0ef508.js";import{a as i,d as s,b as a,c as r,e as o}from"./chunk-a35aff3f.js";import{a as n}from"./chunk-08dc32d6.js";import{a as h}from"./chunk-07b61ac6.js";class l{constructor(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new r,this.width="",this.height="",this.LOG=new a(l),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join(""),this._mapIndex={},this.parentWidth=-1}onResize(){this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250))}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}buildGraph(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid),i=this.gtsToData(this.data);if(!i)return;const a=this._options.gridLineColor,r={legend:{display:this.showLegend},animation:{duration:0},tooltips:{mode:"index",position:"nearest"},scales:{xAxes:[{type:"time",gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a}}],yAxes:[{gridLines:{color:a,zeroLineColor:a},ticks:{fontColor:a},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive};"timestamp"===this._options.timeMode?(r.scales.xAxes[0].time=void 0,r.scales.xAxes[0].type="linear",r.scales.xAxes[0].ticks={fontColor:a}):(r.scales.xAxes[0].time={displayFormats:{millisecond:"HH:mm:ss.SSS",second:"HH:mm:ss",minute:"HH:mm",hour:"HH"}},r.scales.xAxes[0].ticks={fontColor:a},r.scales.xAxes[0].type="time"),this._chart&&this._chart.destroy(),this._chart=new e(t,{type:"bar",data:{labels:i.ticks,datasets:i.datasets},options:r}),this.onResize()}drawChart(){this._options=s.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.data&&this.buildGraph()}gtsToData(t){this.LOG.debug(["gtsToData"],t);let e,a=[],r=[],l=0;if("string"==typeof t&&(t=JSON.parse(this.data)),i.isArray(t)&&t[0]&&(t[0]instanceof o||t[0].hasOwnProperty("data"))&&(t=t[0]),t instanceof o||t.hasOwnProperty("data")?(e=t.data,this._options=s.mergeDeep(this._options,t.globalParams||{})):e=t,e&&0!==e.length){{e=i.flatDeep(e);let t=1e3;this._options.timeUnit&&"ms"===this._options.timeUnit&&(t=1),this._options.timeUnit&&"ns"===this._options.timeUnit&&(t=1e6),e.forEach(e=>{let s=[];if(e.v){i.gtsSort(e),e.v.forEach(e=>{"timestamp"===this._options.timeMode?r.push(e[0]):r.push(h.utc(e[0]/t)),s.push(e[e.length-1])});let o=n.getColor(l),p=i.serializeGtsMetadata(e);this._mapIndex[p]=l;let d={label:p,data:s,borderColor:o,borderWidth:1,backgroundColor:n.transparentize(o)};a.push(d),l++}})}return this.LOG.debug(["gtsToData","datasets"],a),{datasets:a,ticks:i.unique(r).sort((t,e)=>t>e?1:t===e?0:-1)}}}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"warp-view-bar"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{height:var(--warp-view-chart-height,100%)}:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"}}class p{constructor(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new r,this.width="",this.height="",this._options={gridLineColor:"#8e8e8e"},this.LOG=new a(p),this.uuid="chart-"+s.guid().split("-").join(""),this.parentWidth=-1}onResize(){this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250))}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}drawChart(){this._options=s.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";let t,a=this.el.shadowRoot.querySelector("#"+this.uuid);if(!this.data)return;let r=this.data;"string"==typeof r&&(r=JSON.parse(r)),i.isArray(r)&&r[0]&&(r[0]instanceof o||r[0].hasOwnProperty("data"))&&(r=r[0]),r instanceof o||r.hasOwnProperty("data")?(t=r.data,this._options=s.mergeDeep(this._options,r.globalParams||{})):t=r;const n=this._options.gridLineColor,h={legend:{display:this.showLegend},layout:{padding:{left:0,right:50,top:50,bottom:50}},borderWidth:1,animation:{duration:0},scales:{xAxes:[{gridLines:{color:n,zeroLineColor:n},ticks:{fontColor:n}}],yAxes:[{gridLines:{color:n,zeroLineColor:n},ticks:{fontColor:n},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]},responsive:this.responsive},l=this.parseData(t);this.LOG.debug(["drawChart"],[h,l]),this._chart&&this._chart.destroy(),this._chart=new e(a,{type:"bubble",tooltips:{mode:"x",position:"nearest",callbacks:s.getTooltipCallbacks()},data:{datasets:l},options:h}),this.onResize()}parseData(t){if(!t)return;let e=[];for(let s=0;s<t.length;s++){let a=Object.keys(t[s])[0],r=[],o=t[s][a];i.isArray(o)&&o.forEach(t=>{r.push({x:t[0],y:t[1],r:t[2]})}),e.push({data:r,label:a,backgroundColor:n.transparentize(n.getColor(s)),borderColor:n.getColor(s),borderWidth:1})}return e}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"warp-view-bubble"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{height:var(--warp-view-chart-height,100%)}:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"}}class d{constructor(){this.unit="",this.responsive=!1,this.options=new r,this.width="",this.height="",this.LOG=new a(d),this.toDisplay="",this._options=new r}onData(t,e){e!==t&&(this.LOG.debug(["onData"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}drawChart(){this.LOG.debug(["drawChart"],[this.options,this._options]),this._options=s.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"px",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"px";let t=this.data;if(t){if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}i.isArray(t)&&t[0]&&(t[0]instanceof o||t[0].hasOwnProperty("data"))&&(t=t[0]),t instanceof o||t.hasOwnProperty("data")?(this.toDisplay=i.isArray(t.data)?t.data[0]:t.data,this._options=s.mergeDeep(this._options,t.globalParams||{})):this.toDisplay=i.isArray(t)?t[0]:t,this.LOG.debug(["drawChart"],[t,this.toDisplay])}}getStyle(){if(this.LOG.debug(["getStyle"],this._options),this._options){const t={"background-color":this._options.bgColor||"transparent"};return this._options.fontColor&&(t.color=this._options.fontColor),this.LOG.debug(["getStyle","style"],t),t}return{}}componentDidLoad(){this.LOG.debug(["componentDidLoad"],this._options),this.drawChart()}render(){return t("div",null,this.toDisplay&&""!==this.toDisplay?t("div",{class:"chart-container",id:"#wrapper"},t("div",{style:this.getStyle()},t("div",{class:"value"},this.toDisplay+"",t("small",null,this.unit)))):t("warp-view-spinner",null))}static get is(){return"warp-view-display"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:"Any",attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{height:var(--warp-view-chart-height,100%)}:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative;color:var(--warp-view-font-color,#000)}:host .chart-container div{font-size:10rem;height:100%;width:100%}:host .chart-container div .value{position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%);text-align:center;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content}:host .chart-container div .value small{font-size:3rem}"}}class c{constructor(){this.imageTitle="",this.responsive=!1,this.options=new r,this.width="",this.height="",this.LOG=new a(c),this._options=new r}onResize(){clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250)}onData(t,e){e!==t&&(this.LOG.debug(["onData"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}drawChart(){if(this.LOG.debug(["drawChart"],[this.options,this._options]),this._options=s.mergeDeep(this._options,this.options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"px",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"px",this.toDisplay=[],!this.data)return;let t=this.data;if("string"==typeof t)try{t=JSON.parse(t)}catch(t){}t instanceof o||t.hasOwnProperty("data")?t.data&&t.data.length>0&&i.isEmbeddedImage(t.data[0])?(this._options=s.mergeDeep(this._options,t.globalParams||{}),this.toDisplay.push(t.data[0])):t.data&&i.isEmbeddedImage(t.data)&&this.toDisplay.push(t.data):i.isArray(t)&&t.forEach(t=>{i.isEmbeddedImage(t)&&this.toDisplay.push(t)}),this.LOG.debug(["drawChart"],[this.data,this.toDisplay])}getStyle(){if(this.LOG.debug(["getStyle"],this._options),this._options){const t={"background-color":this._options.bgColor||"transparent"};return this._options.fontColor&&(t.color=this._options.fontColor),this.LOG.debug(["getStyle","style"],t),t}return{}}componentDidLoad(){this.LOG.debug(["componentDidLoad"],this._options),this.drawChart()}render(){return t("div",null,this.toDisplay?t("div",{class:"chart-container",id:"#wrapper"},this.toDisplay.map(e=>t("div",{style:this.getStyle()},t("img",{src:e,class:"responsive",alt:"Result"})))):t("warp-view-spinner",null))}static get is(){return"warp-view-image"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},imageTitle:{type:String,attr:"image-title"},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{height:var(--warp-view-chart-height,100%)}:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}:host .chart-container div{font-size:10rem;height:100%;width:100%}:host .chart-container div .responsive{width:calc(100% - 10px);height:auto}"}}class g{constructor(){this.showLegend=!0,this.options=new r,this.width="",this.height="",this.responsive=!1,this.LOG=new a(g),this._options={type:"pie"},this.uuid="chart-"+s.guid().split("-").join(""),this.parentWidth=-1}onResize(){this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250))}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}parseData(t){if(this.LOG.debug(["parseData"],t),!t)return;let e,a=[],r=[];return"string"==typeof t&&(t=JSON.parse(t)),i.isArray(t)&&t[0]&&(t[0]instanceof o||t[0].hasOwnProperty("data"))&&(t=t[0]),t instanceof o||t.hasOwnProperty("data")?(e=t.data,this._options=s.mergeDeep(this._options,t.globalParams||{})):e=t,e.forEach(t=>{r.push(t[1]),a.push(t[0])}),this.LOG.debug(["parseData"],[a,r]),{labels:a,data:r}}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid),i=this.parseData(this.data);i&&(this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",this.LOG.debug(["drawChart"],[this.data,this._options,i]),this._chart&&(this._chart.destroy(),delete this._chart),this.LOG.debug(["data.data"],i.data),i.data&&i.data.length>0&&(this._options.type=this.options.type||this._options.type,this._chart=new e(t,{type:"gauge"===this._options.type?"doughnut":this._options.type,data:{datasets:[{data:i.data,backgroundColor:n.generateTransparentColors(i.data.length),borderColor:n.generateColors(i.data.length)}],labels:i.labels},options:{legend:{display:this.showLegend},animation:{duration:0},responsive:this.responsive,tooltips:{mode:"index",intersect:!0},circumference:this.getCirc(),rotation:this.getRotation()}}),this.onResize()))}getRotation(){return"gauge"===this._options.type?Math.PI:-.5*Math.PI}getCirc(){return"gauge"===this._options.type?Math.PI:2*Math.PI}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"warp-view-pie"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{width:calc(var(--warp-view-chart-width,100%));height:calc(var(--warp-view-chart-height,100%) - 10px)}:host .chart-container{position:relative;margin:auto}"}}class u{constructor(){this.responsive=!1,this.showLegend=!0,this.options=new r,this.width="",this.height="",this.LOG=new a(u),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join(""),this.parentWidth=-1}onResize(){this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250))}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}parseData(t){let e=[],i=[];return t.forEach(t=>{i.push(Math.abs(t[1])),e.push(t[0])}),{labels:e,data:i}}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";const a=this._options.gridLineColor;if(!this.data)return;let r,h=this.data;"string"==typeof h&&(h=JSON.parse(h)),i.isArray(h)&&h[0]&&(h[0]instanceof o||h[0].hasOwnProperty("data"))&&(h=h[0]),r=h instanceof o||h.hasOwnProperty("data")?h.data:h;let l=this.parseData(r);this._chart&&(this._chart.destroy(),delete this._chart),this.LOG.debug(["gts.data"],l.data),l&&l.data&&l.data.length>0&&(this._chart=new e(t,{type:"polarArea",data:{datasets:[{data:l.data,backgroundColor:n.generateTransparentColors(l.data.length),borderColor:n.generateColors(l.data.length)}],labels:l.labels},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:a,zeroLineColor:a},pointLabels:{fontColor:a},ticks:{fontColor:a,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}}),this.onResize())}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"warp-view-polar"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{height:var(--warp-view-chart-height,100%)}:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"}}class w{constructor(){this.responsive=!0,this.showLegend=!0,this.options=new r,this.width="",this.height="",this.LOG=new a(w),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join(""),this.parentWidth=-1}onResize(){this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250))}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}parseData(t){this.LOG.debug(["gtsToData"],t);let e=[],i={};if(t&&0!==t.length){{let s=0;t.forEach(t=>{Object.keys(t).forEach(a=>{const r={label:a,data:[],backgroundColor:n.transparentize(n.getColor(s)),borderColor:n.getColor(s)};t[a].forEach(t=>{const e=Object.keys(t)[0];i[e]=0,r.data.push(t[e])}),e.push(r),s++})})}return this.LOG.debug(["gtsToData","datasets"],[e,Object.keys(i)]),{datasets:e,labels:Object.keys(i)}}}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t=this.el.shadowRoot.querySelector("#"+this.uuid);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";const a=this._options.gridLineColor;let r,n=this.data;if(!n)return;"string"==typeof n&&(n=JSON.parse(n)),i.isArray(n)&&n[0]&&(n[0]instanceof o||n[0].hasOwnProperty("data"))&&(n=n[0]),r=n instanceof o||n.hasOwnProperty("data")?n.data:n;let h=this.parseData(r);h&&(this._chart&&(this._chart.destroy(),delete this._chart),this.LOG.debug(["gts.data"],h.datasets),h.datasets&&h.datasets.length>0&&(this._chart=new e(t,{type:"radar",legend:{display:this.showLegend},data:{labels:h.labels,datasets:h.datasets},options:{layout:{padding:{left:0,right:0,top:50,bottom:0}},animation:{duration:0},legend:{display:this.showLegend},responsive:this.responsive,scale:{gridLines:{color:a,zeroLineColor:a},pointLabels:{fontColor:a},ticks:{fontColor:a,backdropColor:"transparent"}},tooltips:{mode:"index",intersect:!0}}}),this.onResize()))}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"warp-view-radar"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{height:var(--warp-view-chart-height,100%)}:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"}}class m{constructor(){this.unit="",this.responsive=!1,this.showLegend=!0,this.options=new r,this.width="",this.height="",this.LOG=new a(m),this._options={gridLineColor:"#8e8e8e"},this.uuid="chart-"+s.guid().split("-").join(""),this.parentWidth=-1}onResize(){this.el.parentElement.clientWidth!==this.parentWidth&&(this.parentWidth=this.el.parentElement.clientWidth,clearTimeout(this.resizeTimer),this.resizeTimer=setTimeout(()=>{this.LOG.debug(["onResize"],this.el.parentElement.clientWidth),this.drawChart()},250))}onData(t,e){e!==t&&(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,e){e!==t&&(this.LOG.debug(["options"],t),this.drawChart())}drawChart(){this._options=s.mergeDeep(this._options,this.options);let t,a=this.el.shadowRoot.querySelector("#"+this.uuid),r=this.data;if(!r)return;"string"==typeof r&&(r=JSON.parse(r)),i.isArray(r)&&r[0]&&(r[0]instanceof o||r[0].hasOwnProperty("data"))&&(r=r[0]),t=r instanceof o||r.hasOwnProperty("data")?r.data:r;let n=this.gtsToScatter(t);this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"";const h=this._options.gridLineColor,l={legend:{display:this.showLegend},responsive:this.responsive,animation:{duration:0},tooltips:{mode:"x",position:"nearest",callbacks:s.getTooltipCallbacks()},scales:{xAxes:[{gridLines:{color:h,zeroLineColor:h},ticks:{fontColor:h}}],yAxes:[{gridLines:{color:h,zeroLineColor:h},ticks:{fontColor:h},scaleLabel:{display:""!==this.unit,labelString:this.unit}}]}};"timestamp"===this._options.timeMode?(l.scales.xAxes[0].time=void 0,l.scales.xAxes[0].type="linear",l.scales.xAxes[0].ticks={fontColor:h}):(l.scales.xAxes[0].time={displayFormats:{millisecond:"HH:mm:ss.SSS",second:"HH:mm:ss",minute:"HH:mm",hour:"HH"}},l.scales.xAxes[0].ticks={fontColor:h},l.scales.xAxes[0].type="time"),this._chart&&this._chart.destroy(),this._chart=new e.Scatter(a,{data:{datasets:n},options:l}),this.onResize(),this.LOG.debug(["gtsToScatter","chart"],[n,l])}gtsToScatter(t){if(!t)return;this.LOG.debug(["gtsToScatter"],t);let e=[],s=1e3;this._options.timeUnit&&"ms"===this._options.timeUnit&&(s=1),this._options.timeUnit&&"ns"===this._options.timeUnit&&(s=1e6);for(let a=0;a<t.length;a++){let r=t[a],o=[];r.v.forEach(t=>{"timestamp"===this._options.timeMode?o.push({x:t[0],y:t[t.length-1]}):o.push({x:h.utc(t[0]/s),y:t[t.length-1]})}),e.push({label:i.serializeGtsMetadata(r),data:o,pointRadius:2,borderColor:n.getColor(a),backgroundColor:n.transparentize(n.getColor(a))})}return this.LOG.debug(["gtsToScatter","datasets"],e),e}componentDidLoad(){this.drawChart()}render(){return t("div",null,t("div",{class:"chart-container"},t("canvas",{id:this.uuid,width:this.width,height:this.height})))}static get is(){return"warp-view-scatter"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},el:{elementRef:!0},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width",mutable:!0}}}static get listeners(){return[{name:"window:resize",method:"onResize",passive:!0}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host div{height:var(--warp-view-chart-height,100%)}:host .chart-container{width:var(--warp-view-chart-width,100%);height:var(--warp-view-chart-height,100%);position:relative}"}}class y{constructor(){this.LOG=new a(y),this.unit="",this.type="line",this.chartTitle="",this.responsive=!1,this.showLegend=!1,this.url="",this.gtsFilter="",this.warpscript="",this.execUrl="",this.timeunit="us",this.graphs={scatter:["scatter"],chart:["line","spline","step","area"],pie:["pie","doughnut","gauge"],polar:["polar"],radar:["radar"],bar:["bar"],annotation:["annotation"],"gts-tree":["gts-tree"]},this.loading=!0,this.executionErrorText=""}onOptions(t,e){this.LOG.debug(["options"],t),e!==t&&(this.LOG.debug(["options","changed"],t),this.parseGTS())}onGtsFilter(t,e){e!==t&&this.parseGTS()}resize(){this.execute()}handleKeyDown(t){"r"===t.key&&this.execute()}componentDidLoad(){this.execute()}parseGTS(){let t=new o;if(i.isArray(this.gtsList)&&1===this.gtsList.length){const e=this.gtsList[0];e.hasOwnProperty("data")?(t.data=e.data,t.globalParams=e.globalParams||{},t.globalParams.type=t.globalParams.type||this.type,t.params=e.params):(t.data=e,t.globalParams={type:this.type})}else t.data=this.gtsList,t.globalParams={type:this.type};this.LOG.debug(["parseGTS","data"],t),this.data=t,this._options=s.mergeDeep(this.options||{},t.globalParams),this.LOG.debug(["parseGTS","options"],this._options),this._autoRefresh!==this._options.autoRefresh&&(this._autoRefresh=this._options.autoRefresh,this.timer&&window.clearInterval(this.timer),this._autoRefresh&&this._autoRefresh>0&&(this.timer=window.setInterval(()=>this.execute(),1e3*this._autoRefresh))),this.loading=!1}detectWarpScriptSpecialComments(){let t=this.warpscript.split("\n");for(let e=1;e<t.length;e++){let i=t[e];if(!(""==i||i.search("//")>=0))break;{let t,e=RegExp(/\s*\/\/\s*@(\w*)\s*(.*)$/g);for(;t=e.exec(i);){let e=t[1],i=t[2];switch(e){case"endpoint":this.execUrl=i;break;case"timeunit":this.timeunit=i.toLowerCase()}}}}}execute(){this.loading=!0,this.warpscript=this.wsElement.textContent,this.LOG.debug(["execute","warpscript"],this.warpscript),this.execUrl=this.url,this.detectWarpScriptSpecialComments(),fetch(this.execUrl,{method:"POST",body:this.warpscript}).then(t=>{200==t.status?t.text().then(t=>{this.LOG.debug(["execute","response"],t);try{this.gtsList=JSON.parse(t),this.parseGTS()}catch(t){this.LOG.error(["execute"],t)}this.loading=!1},t=>{this.LOG.error(["execute"],[t,this.url,this.warpscript]),this.loading=!1}):this.executionErrorText="Execution Error : #"+t.headers.get("X-Warp10-Error-Line")+" "+t.headers.get("X-Warp10-Error-Message")},t=>{this.LOG.error(["execute"],[t,this.url,this.warpscript]),this.loading=!1,this.executionErrorText="Failed to reach execution endpoint "+this.url})}render(){return""!=this.executionErrorText?t("div",{class:"executionErrorText"}," ",this.executionErrorText," "):t("div",{class:"wrapper",id:"wrapper"},t("div",{class:"warpscript"},t("slot",null)),""!=this.executionErrorText?t("div",{class:"executionErrorText"}," ",this.executionErrorText," "):"",this.graphs.scatter.indexOf(this.type)>-1?t("div",null,t("h1",null,this.chartTitle),t("div",{class:"tile"},t("warp-view-scatter",{responsive:this.responsive,unit:this.unit,data:this.data,options:this._options,showLegend:this.showLegend}))):"",this.graphs.chart.indexOf(this.type)>-1?t("div",null,t("h1",null,this.chartTitle),t("div",{class:"tile"},t("warp-view-chart",{type:this.type,responsive:this.responsive,unit:this.unit,data:this.data,options:this._options,"show-legend":this.showLegend}))):"","bubble"==this.type?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-bubble",{showLegend:this.showLegend,responsive:!0,unit:this.unit,data:this.data,options:this._options}))):"","map"==this.type?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-map",{responsive:!0,data:this.data,options:this._options}))):"",this.graphs.pie.indexOf(this.type)>-1?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-pie",{responsive:this.responsive,data:this.data,options:this._options,showLegend:this.showLegend}))):"",this.graphs.polar.indexOf(this.type)>-1?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-polar",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"",this.graphs.radar.indexOf(this.type)>-1?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-radar",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"",this.graphs.bar.indexOf(this.type)>-1?t("div",null,t("h1",null,this.chartTitle),t("div",{class:"tile"},t("warp-view-bar",{responsive:this.responsive,unit:this.unit,data:this.data,showLegend:this.showLegend,options:this._options}))):"","text"==this.type?t("div",null,t("h1",null,this.chartTitle),t("div",{class:"tile"},t("warp-view-display",{responsive:this.responsive,unit:this.unit,data:this.data,options:this._options}))):"","image"==this.type?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-image",{responsive:this.responsive,data:this.data,options:this._options}))):"","plot"==this.type?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-plot",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options,gtsFilter:this.gtsFilter}))):"","annotation"==this.type?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-annotation",{responsive:this.responsive,data:this.data,showLegend:this.showLegend,options:this._options}))):"","gts-tree"==this.type?t("div",null,t("h1",null,this.chartTitle,t("small",null,this.unit)),t("div",{class:"tile"},t("warp-view-gts-tree",{data:this.data,options:this._options}))):"",this.loading?t("warp-view-spinner",null):"")}static get is(){return"warp-view-tile"}static get encapsulation(){return"shadow"}static get properties(){return{chartTitle:{type:String,attr:"chart-title"},data:{state:!0},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},resize:{method:!0},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},type:{type:String,attr:"type"},unit:{type:String,attr:"unit"},url:{type:String,attr:"url"},wsElement:{elementRef:!0}}}static get listeners(){return[{name:"document:keyup",method:"handleKeyDown"}]}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host{--warp-view-chart-height:100%}:host .warpscript{display:none}:host .executionErrorText{color:red;padding:10px;border-color:red;border-width:2px;border-radius:3px;border-style:solid}:host .wrapper{min-height:var(--warp-view-tile-height,400px);width:var(--warp-view-tile-width,100%);height:var(--warp-view-tile-height,100%)}:host .wrapper .tile{width:100%;height:calc(var(--warp-view-tile-height,100%) - 40px);overflow-y:auto;overflow-x:hidden}:host .wrapper h1{font-size:20px;padding:5px;margin:0;color:var(--warp-view-font-color,#000)}:host .wrapper h1 small{font-size:10px;margin-left:10px}"}}export{l as WarpViewBar,p as WarpViewBubble,d as WarpViewDisplay,c as WarpViewImage,g as WarpViewPie,u as WarpViewPolar,w as WarpViewRadar,m as WarpViewScatter,y as WarpViewTile};