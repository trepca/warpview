warpview.loadBundle("ybjzncqu",["exports","./chunk-bf183c8f.js","./chunk-a31bdffc.js"],function(t,e,i){var n=window.warpview.h,s=function(){},a=function(){function t(){this.gtsFilter="",this.hiddenData=[],this.debug=!1,this.ref=!1,this._node={selected:!0,gts:s}}return t.prototype.onGtsFilter=function(t,i){i!==t&&""!==this.gtsFilter&&this.setState(new RegExp(this.gtsFilter,"gi").test(e.GTSLib.serializeGtsMetadata(this._node.gts)))},t.prototype.onHideData=function(t,i){e.deepEqual(t,i)||(this.LOG.debug(["hiddenData"],t),this._node=Object.assign({},this._node,{selected:-1===this.hiddenData.indexOf(this._node.gts.id),label:e.GTSLib.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["hiddenData"],this._node),this.colorizeChip())},t.prototype.handleKeyDown=function(t){"a"===t.key&&this.setState(!0),"n"===t.key&&this.setState(!1)},t.prototype.colorizeChip=function(){this._node.selected?(this.chip.style.setProperty("background-color",i.ColorLib.transparentize(i.ColorLib.getColor(this._node.gts.id))),this.chip.style.setProperty("border-color",i.ColorLib.getColor(this._node.gts.id))):this.chip.style.setProperty("background-color","#eeeeee"),this.ref=!this.ref},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug),this._node=Object.assign({},this.node,{selected:-1===this.hiddenData.indexOf(this.node.gts.id)})},t.prototype.componentDidLoad=function(){(""!==this.gtsFilter&&new RegExp(this.gtsFilter,"gi").test(e.GTSLib.serializeGtsMetadata(this._node.gts))||this.hiddenData.indexOf(this._node.gts.id)>-1)&&this.setState(!1),this.colorizeChip()},t.prototype.lastIndex=function(t,e){return t===this.toArray(e).length-1},t.prototype.toArray=function(t){return void 0===t?[]:Object.keys(t).map(function(e){return{name:e,value:t[e]}})},t.prototype.switchPlotState=function(t){return t.preventDefault(),this.setState(!this._node.selected),!1},t.prototype.setState=function(t){this._node=Object.assign({},this._node,{selected:t,label:e.GTSLib.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["switchPlotState"],this._node),this.colorizeChip(),this.warpViewSelectedGTS.emit(this._node)},t.prototype.render=function(){var t=this;return n("div",null,this._node&&this._node.gts&&this._node.gts.l?n("span",{onClick:function(e){return t.switchPlotState(e)}},n("i",{class:"normal",ref:function(e){return t.chip=e}}),n("span",{class:"gtsInfo"},n("span",{class:"gts-classname"},"  ",this._node.gts.c),n("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.l).map(function(e,i){return n("span",null,n("span",{class:"gts-labelname"},e.name),n("span",{class:"gts-separator"},"="),n("span",{class:"gts-labelvalue"},e.value),n("span",{hidden:t.lastIndex(i,t._node.gts.l)},", "))}),n("span",{class:"gts-separator",innerHTML:" &rcub;"}),this.toArray(this._node.gts.a).length>0?n("span",null,n("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.a).map(function(e,i){return n("span",null,n("span",{class:"gts-attrname"},e.name),n("span",{class:"gts-separator"},"="),n("span",{class:"gts-attrvalue"},e.value),n("span",{hidden:t.lastIndex(i,t._node.gts.a)},", "))}),n("span",{class:"gts-separator",innerHTML:" &rcub;"})):"")):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-chip"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},name:{type:String,attr:"name"},node:{type:"Any",attr:"node"},ref:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"events",{get:function(){return[{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"listeners",{get:function(){return[{name:"document:keyup",method:"handleKeyDown"}]},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-warp-view-chip-h   .normal.sc-warp-view-chip, .sc-warp-view-chip-h   div.sc-warp-view-chip   span.sc-warp-view-chip{cursor:pointer}.sc-warp-view-chip-h   .normal.sc-warp-view-chip{border-radius:50%;background-color:#bbb;display:inline-block;width:5px;height:5px;border:2px solid #454545;margin-top:auto;margin-bottom:auto;vertical-align:middle}.sc-warp-view-chip-h   .gts-classname.sc-warp-view-chip{color:var(--gts-classname-font-color,#0074d9)}.sc-warp-view-chip-h   .gts-labelname.sc-warp-view-chip{color:var(--gts-labelname-font-color,#19a979)}.sc-warp-view-chip-h   .gts-attrname.sc-warp-view-chip{color:var(--gts-labelname-font-color,#ed4a7b)}.sc-warp-view-chip-h   .gts-separator.sc-warp-view-chip{color:var(--gts-separator-font-color,#bbb)}.sc-warp-view-chip-h   .gts-attrvalue.sc-warp-view-chip, .sc-warp-view-chip-h   .gts-labelvalue.sc-warp-view-chip{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}"},enumerable:!0,configurable:!0}),t}(),r=function(){function t(){this.gtsFilter="",this.options=new e.Param,this.hiddenData=[],this.debug=!1,this.hide=!1,this.gtsList=[],this._options=new e.Param}return t.prototype.onData=function(t,i){e.deepEqual(t,i)||(this.LOG.debug(["options"],t,i),this.doRender())},t.prototype.onOptions=function(t,i){e.deepEqual(t,i)||(this.LOG.debug(["options"],t,i),this.doRender(),this._options.foldGTSTree&&!this.hide&&this.foldAll())},t.prototype.onGtsFilter=function(t,e){e!==t&&(this.LOG.debug(["gtsFilter"],t),this.doRender())},t.prototype.onHideData=function(t,i){e.deepEqual(t,i)||(this.LOG.debug(["hiddenData"],t),this.doRender())},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug)},t.prototype.componentDidLoad=function(){this.LOG.debug(["componentDidLoad","data"],this.data),this.data&&this.doRender(),void 0!==this._options.foldGTSTree&&this._options.foldGTSTree&&!this.hide&&this.foldAll()},t.prototype.doRender=function(){if(this.LOG.debug(["doRender","gtsList"],this.data),this._options=e.ChartLib.mergeDeep(this._options,this.options),this.data){var t=e.GTSLib.getData(this.data).data;this.LOG.debug(["doRender","gtsList","dataList"],t),t&&(this.gtsList=e.GTSLib.flattenGtsIdArray(t,0).res,this.LOG.debug(["doRender","gtsList"],this.gtsList,this._options.foldGTSTree,this.hide))}},t.prototype.foldAll=function(){var t=this;this.root?this.hide=!0:window.setTimeout(function(){t.foldAll()},100)},t.prototype.toggleVisibility=function(){this.hide=!this.hide},t.prototype.render=function(){var t=this;return this.gtsList?n("div",null,n("div",{class:"stack-level",onClick:function(){return t.toggleVisibility()}},n("span",{class:{expanded:!this.hide,collapsed:this.hide},ref:function(e){return t.root=e}})," Stack"),n("warp-view-tree-view",{gtsList:this.gtsList,branch:!1,hidden:this.hide,debug:this.debug,hiddenData:this.hiddenData,gtsFilter:this.gtsFilter})):""},Object.defineProperty(t,"is",{get:function(){return"warp-view-gts-tree"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{data:{type:String,attr:"data",watchCallbacks:["onData"]},debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},hide:{state:!0},options:{type:"Any",attr:"options",watchCallbacks:["onOptions"]}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */:host .stack-level{font-size:1em;padding-top:5px;cursor:pointer;color:var(--gts-stack-font-color,#000)}:host .stack-level+div{padding-left:25px}:host .expanded{background-image:var(--gts-tree-expanded-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==))}:host .collapsed,:host .expanded{padding:1px 10px;margin-right:5px;background-position:0;background-repeat:no-repeat}:host .collapsed{background-image:var(--gts-tree-collapsed-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T6WTUW7CQAxEPQdozxYb9Qb94Aj9gQSoVCp6lMr21doDZFCQiFCU3YDY//d2PeOFPHnwJC+zAlVdA/jp+/6YmZ+1S0qCPxF5HUAAO3fvSpKS4ENEvm6gfUS0c5JiBma2Ibm/QiQPmbmdSqohquoA7GqSxRaapmkBjBkAeHP336t0UWBmHcnb+VcR4XcJpjDJLjPHkS4tleqZubmNiDHU6gumDQDYuvvh7hpV9V9EXgaA5Ka2jbMjmNk7yZOIfEfE8eFVfuSDLda4JDsD3FNdEckTC0YAAAAASUVORK5CYII=))}"},enumerable:!0,configurable:!0}),t}(),o=function(){function t(){this.branch=!1,this.hidden=!1,this.gtsFilter="",this.hiddenData=[],this.debug=!1,this.ref=!1,this.hide={}}return t.prototype.toggleVisibility=function(t,e){var i;"expanded"===(i=t.currentTarget.id?t.currentTarget:t.currentTarget.previousElementSibling).className?(i.className="collapsed",this.hide[e+""]=!0):(i.className="expanded",this.hide[e+""]=!1),this.ref=!this.ref},t.prototype.onGtsFilter=function(t,e){e!==t&&(this.ref=!this.ref)},t.prototype.onHideData=function(t,i){e.deepEqual(t,i)||(this.LOG.debug(["hiddenData"],t),this.ref=!this.ref)},t.prototype.isHidden=function(t){return!!this.hide.hasOwnProperty(t+"")&&this.hide[t+""]},t.prototype.componentWillLoad=function(){this.LOG=new e.Logger(t,this.debug)},t.prototype.render=function(){var t=this;return n("div",{class:"list"},this.gtsList?n("ul",null,this.gtsList.map(function(i,s){return n("li",{hidden:t.hidden},e.GTSLib.isGts(i)?n("warp-view-chip",{node:{gts:i},name:i.c,gtsFilter:t.gtsFilter,debug:t.debug,hiddenData:t.hiddenData}):n("span",null,i?n("div",null,t.branch?n("div",null,n("span",{class:"expanded",onClick:function(e){return t.toggleVisibility(e,s)},id:e.ChartLib.guid()}),n("span",{onClick:function(e){return t.toggleVisibility(e,s)}},n("small",null,"List of ",i.length," item",i.length>1?"s":""))):n("div",{class:"stack-level"},n("span",{class:"expanded",onClick:function(e){return t.toggleVisibility(e,s)},id:e.ChartLib.guid()}),n("span",{onClick:function(e){return t.toggleVisibility(e,s)}},0===s?"[TOP]":"["+(s+1)+"]"," ",n("small",null,"List of ",i.length," item",i.length>1?"s":""))),n("warp-view-tree-view",{gtsList:i,branch:!0,hidden:t.isHidden(s),debug:t.debug,gtsFilter:t.gtsFilter})):""))})):"")},Object.defineProperty(t,"is",{get:function(){return"warp-view-tree-view"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{branch:{type:Boolean,attr:"branch"},debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},gtsList:{type:"Any",attr:"gts-list"},hidden:{type:Boolean,attr:"hidden"},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},ref:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return"/*!\n *  Copyright 2018  SenX S.A.S.\n *\n *  Licensed under the Apache License, Version 2.0 (the \"License\");\n *  you may not use this file except in compliance with the License.\n *  You may obtain a copy of the License at\n *\n *    http://www.apache.org/licenses/LICENSE-2.0\n *\n *  Unless required by applicable law or agreed to in writing, software\n *  distributed under the License is distributed on an \"AS IS\" BASIS,\n *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n *  See the License for the specific language governing permissions and\n *  limitations under the License.\n *\n */warp-view-tree-view ul{margin:0;padding:0;list-style:none;border:none;overflow:hidden}warp-view-tree-view li{color:var(--gts-stack-font-color,#000);position:relative;padding:0 0 0 20px;line-height:20px}warp-view-tree-view li .stack-level{font-size:1em;padding-top:5px}warp-view-tree-view li .stack-level+div{padding-left:25px}warp-view-tree-view li .expanded{background-image:var(--gts-tree-expanded-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA7klEQVQ4T82TMW7CQBBF/0g+QOpINEkVCmpaLoBm5COk5QYoaeAY3MDSei2LGu4QKakiBA1tCpTK8kS2sLVe2xSh8XSrnf9m/s4s4c6gO/UYGEBEXlT1bK396bFGIjIJguA7iqJLkVNbYOZXItoQ0QHAzBhz9CCFeAVgCeAjy7Jpmqa/NUBEEgDzktqGuOKKO47j+KsGhGH4lOf5HsDIg5ycyqVYVd+steuGheLAzM9EtPMgW1VdVGWJ6N0YU1gpozVGH+K+gy/uBHR1crXUqNzbQXXhduJ69sd7cxOZ+UFVH5Mk+exb+YGt8n9+5h8up1sReYC0WAAAAABJRU5ErkJggg==))}warp-view-tree-view li .collapsed,warp-view-tree-view li .expanded{padding:1px 10px;margin-right:5px;background-position:0;background-repeat:no-repeat}warp-view-tree-view li .collapsed{background-image:var(--gts-tree-collapsed-icon,url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA0UlEQVQ4T6WTUW7CQAxEPQdozxYb9Qb94Aj9gQSoVCp6lMr21doDZFCQiFCU3YDY//d2PeOFPHnwJC+zAlVdA/jp+/6YmZ+1S0qCPxF5HUAAO3fvSpKS4ENEvm6gfUS0c5JiBma2Ibm/QiQPmbmdSqohquoA7GqSxRaapmkBjBkAeHP336t0UWBmHcnb+VcR4XcJpjDJLjPHkS4tleqZubmNiDHU6gumDQDYuvvh7hpV9V9EXgaA5Ka2jbMjmNk7yZOIfEfE8eFVfuSDLda4JDsD3FNdEckTC0YAAAAASUVORK5CYII=))}warp-view-tree-view li .gtsInfo{white-space:normal;word-wrap:break-word}warp-view-tree-view li .gtsInfo[disabled]{color:#aaa;cursor:not-allowed}warp-view-tree-view li .normal{border-radius:50%;background-color:#bbb;display:inline-block}warp-view-tree-view li i,warp-view-tree-view li span{cursor:pointer}warp-view-tree-view li .selected{background-color:#adf;font-weight:700;padding:1px 5px}"},enumerable:!0,configurable:!0}),t}();t.WarpViewChip=a,t.WarpViewGtsTree=r,t.WarpViewTreeView=o,Object.defineProperty(t,"__esModule",{value:!0})});