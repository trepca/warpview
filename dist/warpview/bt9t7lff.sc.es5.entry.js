warpview.loadBundle("bt9t7lff",["exports"],function(e){var t=window.warpview.h,n=function(){function e(){this.modalTitle="",this.kbdLastKeyPressed=[],this.opened=!1}return e.prototype.open=function(){this.el.style.display="block",this.el.style.zIndex="999999",this.opened=!0,this.warpViewModalOpen.emit({})},e.prototype.close=function(){this.el.style.display="none",this.el.style.zIndex="-1",this.opened=!1,this.warpViewModalClose.emit({})},e.prototype.isOpened=function(){var e=this;return new Promise(function(t){t(e.opened)})},e.prototype.handleKeyDown=function(e){"Escape"===e[0]&&this.close()},e.prototype.componentDidLoad=function(){var e=this;this.el.addEventListener("click",function(t){"WARP-VIEW-MODAL"===t.path[0].nodeName&&e.close()})},e.prototype.render=function(){var e=this;return t("div",{class:"popup"},t("div",{class:"header"},t("div",{class:"title",innerHTML:this.modalTitle}),t("div",{class:"close",onClick:function(){return e.close()}},"×")),t("div",{class:"body"},t("slot",null)))},Object.defineProperty(e,"is",{get:function(){return"warp-view-modal"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{close:{method:!0},el:{elementRef:!0},isOpened:{method:!0},kbdLastKeyPressed:{type:"Any",attr:"kbd-last-key-pressed",watchCallbacks:["handleKeyDown"]},modalTitle:{type:String,attr:"modal-title"},open:{method:!0}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"events",{get:function(){return[{name:"warpViewModalOpen",method:"warpViewModalOpen",bubbles:!0,cancelable:!0,composed:!0},{name:"warpViewModalClose",method:"warpViewModalClose",bubbles:!0,cancelable:!0,composed:!0}]},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-warp-view-modal-h{position:fixed;top:0;left:0;z-index:0;display:none;height:100%;overflow:hidden;background-color:rgba(0,0,0,.3)}.sc-warp-view-modal-h, .sc-warp-view-modal-h   .popup.sc-warp-view-modal{width:100%;outline:0}.sc-warp-view-modal-h   .popup.sc-warp-view-modal{position:relative;height:auto;background-color:var(--warpview-popup-bg-color,#fff);top:10%;z-index:999999;background-clip:padding-box;border:1px solid var(--warpview-popup-border-color,rgba(0,0,0,.2));border-radius:.3rem;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;pointer-events:auto;margin:1.75rem auto}\@media (min-width:576px){.sc-warp-view-modal-h   .popup.sc-warp-view-modal{max-width:800px}}.sc-warp-view-modal-h   .popup.sc-warp-view-modal   .header.sc-warp-view-modal{background-color:var(--warpview-popup-header-bg-color,#ddd);display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;-ms-flex-pack:justify;justify-content:space-between;padding:1rem 1rem;border-bottom:1px solid #e9ecef;border-top-left-radius:.3rem;border-top-right-radius:.3rem}.sc-warp-view-modal-h   .popup.sc-warp-view-modal   .header.sc-warp-view-modal   .title.sc-warp-view-modal{margin-bottom:0;line-height:1.5;color:var(--warpview-popup-title-color,#888)}.sc-warp-view-modal-h   .popup.sc-warp-view-modal   .header.sc-warp-view-modal   .close.sc-warp-view-modal{padding:1rem 1rem;margin:-1rem -1rem -1rem auto;cursor:pointer;color:var(--warpview-popup-close-color,#888)}.sc-warp-view-modal-h   .popup.sc-warp-view-modal   .body.sc-warp-view-modal{position:relative;background-color:var(--warpview-popup-body-bg-color,#fff);color:var(--warpview-popup-body-color,#000);height:auto;padding:10px}"},enumerable:!0,configurable:!0}),e}();e.WarpViewModal=n,Object.defineProperty(e,"__esModule",{value:!0})});