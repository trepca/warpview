const t=window.warpview.h;import{a as e,b as s}from"./chunk-1029d1a2.js";import{a}from"./chunk-bf214dd1.js";class i{}class n{constructor(){this.gtsFilter="x",this.hiddenData=[],this.debug=!1,this.kbdLastKeyPressed=[],this.refreshCounter=0,this._node={selected:!0,gts:i}}onGtsFilter(t,s){s!=t&&(""!==this.gtsFilter.slice(1)?this.setState(new RegExp(this.gtsFilter.slice(1),"gi").test(e.serializeGtsMetadata(this._node.gts))):this.setState(!0))}onHideData(t){this.LOG.debug(["hiddenData"],t),this._node=Object.assign({},this._node,{selected:-1===this.hiddenData.indexOf(this._node.gts.id),label:e.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["hiddenData"],this._node),this.colorizeChip()}handleKeyDown(t){"a"===t[0]&&this.setState(!0),"n"===t[0]&&this.setState(!1)}colorizeChip(){this.chip&&(this._node.selected?(this.chip.style.setProperty("background-color",a.transparentize(a.getColor(this._node.gts.id))),this.chip.style.setProperty("border-color",a.getColor(this._node.gts.id))):this.chip.style.setProperty("background-color","#eeeeee"),this.refreshCounter++)}componentWillLoad(){this.LOG=new s(n,this.debug),this._node=Object.assign({},this.node,{selected:-1===this.hiddenData.indexOf(this.node.gts.id)})}componentDidLoad(){(""!==this.gtsFilter.slice(1)&&new RegExp(this.gtsFilter.slice(1),"gi").test(e.serializeGtsMetadata(this._node.gts))||this.hiddenData.indexOf(this._node.gts.id)>-1)&&this.setState(!1),this.colorizeChip()}lastIndex(t,e){return t===this.toArray(e).length-1}toArray(t){return void 0===t?[]:Object.keys(t).map(function(e){return{name:e,value:t[e]}})}switchPlotState(t){return t.preventDefault(),this.setState(!this._node.selected),!1}setState(t){this._node=Object.assign({},this._node,{selected:t,label:e.serializeGtsMetadata(this._node.gts)}),this.LOG.debug(["switchPlotState"],this._node),this.colorizeChip(),this.warpViewSelectedGTS.emit(this._node)}render(){return t("div",null,this._node&&this._node.gts&&this._node.gts.l?t("span",{onClick:t=>this.switchPlotState(t)},t("i",{class:"normal",ref:t=>this.chip=t}),t("span",{class:"gtsInfo"},t("span",{class:"gts-classname"},"  ",this._node.gts.c),t("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.l).map((e,s)=>t("span",null,t("span",{class:"gts-labelname"},e.name),t("span",{class:"gts-separator"},"="),t("span",{class:"gts-labelvalue"},e.value),t("span",{hidden:this.lastIndex(s,this._node.gts.l)},", "))),t("span",{class:"gts-separator",innerHTML:" &rcub;"}),this.toArray(this._node.gts.a).length>0?t("span",null,t("span",{class:"gts-separator",innerHTML:"&lcub; "}),this.toArray(this._node.gts.a).map((e,s)=>t("span",null,t("span",{class:"gts-attrname"},e.name),t("span",{class:"gts-separator"},"="),t("span",{class:"gts-attrvalue"},e.value),t("span",{hidden:this.lastIndex(s,this._node.gts.a)},", "))),t("span",{class:"gts-separator",innerHTML:" &rcub;"})):"")):"")}static get is(){return"warp-view-chip"}static get encapsulation(){return"shadow"}static get properties(){return{debug:{type:Boolean,attr:"debug"},gtsFilter:{type:String,attr:"gts-filter",watchCallbacks:["onGtsFilter"]},hiddenData:{type:"Any",attr:"hidden-data",watchCallbacks:["onHideData"]},kbdLastKeyPressed:{type:"Any",attr:"kbd-last-key-pressed",watchCallbacks:["handleKeyDown"]},name:{type:String,attr:"name"},node:{type:"Any",attr:"node"},refreshCounter:{state:!0}}}static get events(){return[{name:"warpViewSelectedGTS",method:"warpViewSelectedGTS",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-warp-view-chip-h   .normal.sc-warp-view-chip, .sc-warp-view-chip-h   div.sc-warp-view-chip   span.sc-warp-view-chip{cursor:pointer}.sc-warp-view-chip-h   .normal.sc-warp-view-chip{border-radius:50%;background-color:#bbb;display:inline-block;width:5px;height:5px;border:2px solid #454545;margin-top:auto;margin-bottom:auto;vertical-align:middle}.sc-warp-view-chip-h   .gts-classname.sc-warp-view-chip{color:var(--gts-classname-font-color,#0074d9)}.sc-warp-view-chip-h   .gts-labelname.sc-warp-view-chip{color:var(--gts-labelname-font-color,#19a979)}.sc-warp-view-chip-h   .gts-attrname.sc-warp-view-chip{color:var(--gts-labelname-font-color,#ed4a7b)}.sc-warp-view-chip-h   .gts-separator.sc-warp-view-chip{color:var(--gts-separator-font-color,#bbb)}.sc-warp-view-chip-h   .gts-attrvalue.sc-warp-view-chip, .sc-warp-view-chip-h   .gts-labelvalue.sc-warp-view-chip{color:var(--gts-labelvalue-font-color,#aaa);font-style:italic}"}}export{n as WarpViewChip};