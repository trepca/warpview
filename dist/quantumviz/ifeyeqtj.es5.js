/*! Built with http://stenciljs.com */
quantumviz.loadBundle("ifeyeqtj",["exports","./chunk-a824490f.js"],function(e,t){var n=window.quantumviz.h,i=function(){function e(){this.option="{}",this.checked=!1,this.state=!1,this._option={switchClass:"",switchLabelClass:"",switchHandleClass:""}}return e.prototype.componentWillLoad=function(){this._option=t.GTSLib.mergeDeep(this._option,JSON.parse(this.option))},e.prototype.componentDidLoad=function(){},e.prototype.componentWillUpdate=function(){},e.prototype.componentDidUpdate=function(){},e.prototype.render=function(){var e=this;return n("label",{class:"switch "+this._option.switchClass},this.checked?n("input",{type:"checkbox",class:"switch-input",checked:!0,onClick:function(){return e.switched()}}):n("input",{type:"checkbox",class:"switch-input",onClick:function(){return e.switched()}}),n("span",{class:"switch-label "+this._option.switchLabelClass}),n("span",{class:"switch-handle "+this._option.switchHandleClass}))},e.prototype.switched=function(){this.state=!this.state,this.timeSwitched.emit({state:this.state})},e.prototype.switchedListener=function(e){},Object.defineProperty(e,"is",{get:function(){return"quantum-toggle"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{checked:{type:Boolean,attr:"checked"},option:{type:String,attr:"option"},state:{state:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"timeSwitched",method:"timeSwitched",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"listeners",{get:function(){return[{name:"timeSwitched",method:"switchedListener"}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".switch{position:relative;display:block;width:100px;height:30px;padding:3px;margin:0 10px 10px 0;border-radius:18px;cursor:pointer}.switch-input{display:none}.switch-label{position:relative;display:block;height:inherit;font-size:10px;text-transform:uppercase;background:#eceeef;border-radius:inherit;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15);box-shadow:inset 0 1px 2px rgba(0,0,0,.12),inset 0 0 2px rgba(0,0,0,.15)}.switch-input:checked~.switch-label{background:#00cd00;-webkit-box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2);box-shadow:inset 0 1px 2px rgba(0,0,0,.15),inset 0 0 3px rgba(0,0,0,.2)}.switch-handle{position:absolute;top:4px;left:4px;width:28px;height:28px;background:radial-gradient(#fff 15%,#f0f0f0 100%);border-radius:100%;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2)}.switch-input:checked~.switch-handle{left:74px;background:radial-gradient(#fff 15%,#00cd00 100%);-webkit-box-shadow:-1px 1px 5px rgba(0,0,0,.2);box-shadow:-1px 1px 5px rgba(0,0,0,.2)}.switch-handle,.switch-label{-webkit-transition:All .3s ease;transition:All .3s ease;-webkit-transition:All .3s ease;-moz-transition:All .3s ease;-o-transition:All .3s ease}"},enumerable:!0,configurable:!0}),e}();e.QuantumToggle=i,Object.defineProperty(e,"__esModule",{value:!0})});