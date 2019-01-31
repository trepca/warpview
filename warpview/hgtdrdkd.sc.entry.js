const t=window.warpview.h;import{a,c as e,b as s}from"./chunk-97ee157e.js";import{c as i,b as h,a as r}from"./chunk-d3ecdc47.js";import{a as d}from"./chunk-f20deb19.js";class n{constructor(){this.responsive=!1,this.showLegend=!0,this.options=new i,this.width="",this.height="",this.elemsCount=15,this.debug=!1,this.page=0,this._options={timeMode:"date"},this._data=[]}onData(t,a){h(t,a)||(this.LOG.debug(["data"],t),this.drawChart())}onOptions(t,a){h(t,a)||(this.LOG.debug(["options"],t),this.drawChart())}drawChart(){if(this._options=r.mergeDeep(this._options,this.options),this.LOG.debug(["drawChart","_options"],this._options),this.height=(this.responsive?this.el.parentElement.clientHeight:this.height||600)+"",this.width=(this.responsive?this.el.parentElement.clientWidth:this.width||800)+"",!this.data)return;let t,s=this.data;"string"==typeof s&&(s=JSON.parse(s)),a.isArray(s)&&s[0]&&(s[0]instanceof e||s[0].hasOwnProperty("data"))&&(s=s[0]),t=s instanceof e||s.hasOwnProperty("data")?s.data:s,this._data=this.parseData(a.flatDeep(t)),this.LOG.debug(["drawChart","_data"],this._data)}getHeaderParam(t,a,e,s){return this.data.params&&this.data.params[t]&&this.data.params[t][e]&&this.data.params[t][e][a]?this.data.params[t][e][a]:this.data.globalParams&&this.data.globalParams[e]&&this.data.globalParams[e][a]?this.data.globalParams[e][a]:s}parseData(t){const e=[];return this.LOG.debug(["parseData"],t),t.forEach((t,s)=>{let i={name:"",values:[],headers:[]};a.isGts(t)?(this.LOG.debug(["parseData","isGts"],t),i.name=a.serializeGtsMetadata(t),i.values=t.v):(this.LOG.debug(["parseData","is not a Gts"],t),i.values=a.isArray(t)?t:[t]),i.headers=[this.getHeaderParam(s,0,"headers","Date")],t.v.length>0&&t.v[0].length>2&&i.headers.push(this.getHeaderParam(s,1,"headers","Latitude")),t.v.length>0&&t.v[0].length>3&&i.headers.push(this.getHeaderParam(s,2,"headers","Longitude")),t.v.length>0&&t.v[0].length>4&&i.headers.push(this.getHeaderParam(s,3,"headers","Elevation")),i.headers.push(this.getHeaderParam(s,t.v[0].length-1,"headers","Value")),e.push(i)}),this.LOG.debug(["parseData","flatData"],e),e}componentWillLoad(){this.LOG=new s(n,this.debug),this.drawChart()}render(){return t("div",{class:"wrapper"},this._data.map(a=>t("warp-view-paginable",{data:a,options:this._options,debug:this.debug})))}static get is(){return"warp-view-datagrid"}static get encapsulation(){return"shadow"}static get properties(){return{_data:{state:!0},data:{type:String,attr:"data",watchCallbacks:["onData"]},debug:{type:Boolean,attr:"debug"},el:{elementRef:!0},elemsCount:{type:Number,attr:"elems-count"},height:{type:String,attr:"height",mutable:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]},page:{state:!0},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},width:{type:String,attr:"width",mutable:!0}}}static get style(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */"}}class o{constructor(){this.options=new i,this.elemsCount=15,this.debug=!1,this.page=0,this.pages=[],this.displayedValues=[],this._options={timeMode:"date"},this.windowed=5}formatDate(t){return"date"===this._options.timeMode?d.utc(t/1e3).toISOString():t.toString()}goto(t){this.page=t,this.drawGridData()}next(){this.page=Math.min(this.page+1,this._data.values.length-1),this.drawGridData()}prev(){this.page=Math.max(this.page-1,0),this.drawGridData()}drawGridData(){if(this._options=r.mergeDeep(this._options,this.options),this.LOG.debug(["drawGridData","_options"],this._options),this.data){this.pages=[];for(let t=0;t<this.data.values.length/this.elemsCount;t++)this.pages.push(t);this._data=Object.assign({},this.data),this.displayedValues=this._data.values.slice(Math.max(0,this.elemsCount*this.page),Math.min(this.elemsCount*(this.page+1),this._data.values.length)),this.LOG.debug(["drawGridData","_data"],this.data)}}componentWillLoad(){this.LOG=new s(o,this.debug),this.drawGridData()}render(){return t("div",{class:"wrapper"},this._data?t("div",null,t("div",{class:"heading",innerHTML:a.formatLabel(this._data.name)}),t("table",null,t("thead",null,this._data.headers.map(a=>t("th",null,a))),t("tbody",null,this.displayedValues.map((a,e)=>t("tr",{class:e%2==0?"odd":"even"},a.map((a,e)=>t("td",null,0===e?this.formatDate(a):a)))))),t("div",{class:"center"},t("div",{class:"pagination"},0!==this.page?t("div",{class:"prev hoverable",onClick:()=>this.prev()},"<"):"",this.page-this.windowed>0?t("div",{class:"index disabled"},"..."):"",this.pages.map(a=>a>=this.page-this.windowed&&a<=this.page+this.windowed?t("div",{class:"index "+(this.page===a?"active":"hoverable"),onClick:()=>this.goto(a)},a):""),this.page+this.windowed<this.pages.length?t("div",{class:"index disabled"},"..."):"",this.page!==this._data.values.length-1?t("div",{class:"next hoverable",onClick:()=>this.next()},">"):""))):"")}static get is(){return"warp-view-paginable"}static get encapsulation(){return"shadow"}static get properties(){return{data:{type:"Any",attr:"data"},debug:{type:Boolean,attr:"debug"},elemsCount:{type:Number,attr:"elems-count"},options:{type:"Any",attr:"options"},page:{state:!0}}}static get style(){return".sc-warp-view-paginable-h   table.sc-warp-view-paginable{width:100%;color:var(--warp-view-font-color,#000)}.sc-warp-view-paginable-h   table.sc-warp-view-paginable   td.sc-warp-view-paginable, .sc-warp-view-paginable-h   table.sc-warp-view-paginable   th.sc-warp-view-paginable{padding:var(--warp-view-datagrid-cell-padding,5px)}.sc-warp-view-paginable-h   table.sc-warp-view-paginable   .odd.sc-warp-view-paginable{background-color:var(--warp-view-datagrid-odd-bg-color,#fff);color:var(--warp-view-datagrid-odd-color,#000)}.sc-warp-view-paginable-h   table.sc-warp-view-paginable   .even.sc-warp-view-paginable{background-color:var(--warp-view-datagrid-even-bg-color,#ddd);color:var(--warp-view-datagrid-even-color,#000)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable{text-align:center}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable{display:inline-block}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.sc-warp-view-paginable{color:var(--warp-view-font-color,#000);float:left;padding:8px 16px;text-decoration:none;-webkit-transition:background-color .3s;transition:background-color .3s;border:1px solid var(--warp-view-pagination-border-color,#ddd);margin:0;cursor:pointer;background-color:var(--warp-view-pagination-bg-color,#fff)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.active.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.active.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.active.sc-warp-view-paginable{background-color:var(--warp-view-pagination-active-bg-color,#4caf50);color:var(--warp-view-pagination-active-color,#fff);border:1px solid var(--warp-view-pagination-active-border-color,#4caf50)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.hoverable.sc-warp-view-paginable:hover, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.hoverable.sc-warp-view-paginable:hover, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.hoverable.sc-warp-view-paginable:hover{background-color:var(--warp-view-pagination-hover-bg-color,#ddd);color:var(--warp-view-pagination-hover-color,#000);border:1px solid var(--warp-view-pagination-hover-border-color,#ddd)}.sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .index.disabled.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .next.disabled.sc-warp-view-paginable, .sc-warp-view-paginable-h   .center.sc-warp-view-paginable   .pagination.sc-warp-view-paginable   .prev.disabled.sc-warp-view-paginable{cursor:auto;color:var(--warp-view-pagination-disabled-color,#ddd)}.sc-warp-view-paginable-h   .gts-classname.sc-warp-view-paginable{color:var(--gts-classname-font-color,#0074d9)}.sc-warp-view-paginable-h   .gts-labelname.sc-warp-view-paginable{color:var(--gts-labelname-font-color,#19a979)}.sc-warp-view-paginable-h   .gts-attrname.sc-warp-view-paginable{color:var(--gts-labelname-font-color,#ed4a7b)}.sc-warp-view-paginable-h   .gts-separator.sc-warp-view-paginable{color:var(--gts-separator-font-color,#bbb)}.sc-warp-view-paginable-h   .gts-attrvalue.sc-warp-view-paginable, .sc-warp-view-paginable-h   .gts-labelvalue.sc-warp-view-paginable{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}.sc-warp-view-paginable-h   .round.sc-warp-view-paginable{border-radius:50%;background-color:#bbb;display:inline-block;width:12px;height:12px;border:2px solid #454545}.sc-warp-view-paginable-h   ul.sc-warp-view-paginable{list-style:none}"}}export{n as WarpViewDatagrid,o as WarpViewPaginable};