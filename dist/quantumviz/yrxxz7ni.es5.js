/*! Built with http://stenciljs.com */
quantumviz.loadBundle("yrxxz7ni",["exports","./chunk-0497819c.js","./chunk-e262070a.js","./chunk-12ee72ee.js"],function(t,e,r,n){var a=window.quantumviz.h,i=function(){function t(){this.unit="",this.chartTitle="",this.responsive=!0,this.showLegend=!0,this.data="[]",this.options={},this.width="",this.height=""}return t.prototype.redraw=function(t,e){e!==t&&this.drawChart()},t.prototype.generateColors=function(t){for(var e=[],n=0;n<t;n++)e.push(r.GTSLib.transparentize(r.GTSLib.getColor(n),.5));return e},t.prototype.parseData=function(t){var e=[],r=[];return t.forEach(function(t){r.push(t[1]),e.push(t[0])}),{labels:e,datas:r}},t.prototype.drawChart=function(){var t=this.el.shadowRoot.querySelector("#myChart");new e.Chart(t,{type:"radar",legend:{display:this.showLegend},data:{labels:["Beer","Rum","Peanut","Crisps"],datasets:[{data:[50,25,10,10],backgroundColor:"#64aa3939"},{data:[35,75,90,5],backgroundColor:"#642d882d"}]},options:{responsive:this.responsive,tooltips:{mode:"index",intersect:!0}}})},t.prototype.componentDidLoad=function(){this.drawChart()},t.prototype.render=function(){return a("div",null,a("h1",null,this.chartTitle),a("div",{class:"chart-container"},this.responsive?a("canvas",{id:"myChart"}):a("canvas",{id:"myChart",width:this.width,height:this.height})))},Object.defineProperty(t,"is",{get:function(){return"quantum-radar"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{chartTitle:{type:String,attr:"chart-title"},data:{type:String,attr:"data",watchCallbacks:["redraw"]},el:{elementRef:!0},height:{type:String,attr:"height"},options:{type:"Any",attr:"options"},responsive:{type:Boolean,attr:"responsive"},showLegend:{type:Boolean,attr:"show-legend"},unit:{type:String,attr:"unit"},width:{type:String,attr:"width"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".chart-container{width:var(--quantum-chart-width,100%);height:var(--quantum-chart-height,100%);position:relative}"},enumerable:!0,configurable:!0}),t}();t.QuantumRadar=i,Object.defineProperty(t,"__esModule",{value:!0})});