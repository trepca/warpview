import './stencil.core';
/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import './stencil.core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import {
  DataModel,
} from './model/dataModel';
import {
  GTS,
} from './model/GTS';
import {
  Param,
} from './model/param';
import {
  Datum,
} from './components/warp-view-drilldown/datum';

declare global {

  namespace StencilComponents {
    interface WarpViewAnnotation {
      'data': DataModel | DataModel[] | GTS[] | string;
      'height': string;
      'hiddenData': number[];
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'standalone': boolean;
      'timeMax': number;
      'timeMin': number;
      'width': string;
    }
  }

  interface HTMLWarpViewAnnotationElement extends StencilComponents.WarpViewAnnotation, HTMLStencilElement {}

  var HTMLWarpViewAnnotationElement: {
    prototype: HTMLWarpViewAnnotationElement;
    new (): HTMLWarpViewAnnotationElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-annotation': HTMLWarpViewAnnotationElement;
  }
  interface ElementTagNameMap {
    'warp-view-annotation': HTMLWarpViewAnnotationElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-annotation': JSXElements.WarpViewAnnotationAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewAnnotationAttributes extends HTMLAttributes {
      'data'?: DataModel | DataModel[] | GTS[] | string;
      'height'?: string;
      'hiddenData'?: number[];
      'onPointHover'?: (event: CustomEvent) => void;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'standalone'?: boolean;
      'timeMax'?: number;
      'timeMin'?: number;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewBar {
      'data': DataModel | DataModel[] | GTS[] | string;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLWarpViewBarElement extends StencilComponents.WarpViewBar, HTMLStencilElement {}

  var HTMLWarpViewBarElement: {
    prototype: HTMLWarpViewBarElement;
    new (): HTMLWarpViewBarElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-bar': HTMLWarpViewBarElement;
  }
  interface ElementTagNameMap {
    'warp-view-bar': HTMLWarpViewBarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-bar': JSXElements.WarpViewBarAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewBarAttributes extends HTMLAttributes {
      'data'?: DataModel | DataModel[] | GTS[] | string;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewBubble {
      'data': DataModel | DataModel[] | GTS[] | string;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLWarpViewBubbleElement extends StencilComponents.WarpViewBubble, HTMLStencilElement {}

  var HTMLWarpViewBubbleElement: {
    prototype: HTMLWarpViewBubbleElement;
    new (): HTMLWarpViewBubbleElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-bubble': HTMLWarpViewBubbleElement;
  }
  interface ElementTagNameMap {
    'warp-view-bubble': HTMLWarpViewBubbleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-bubble': JSXElements.WarpViewBubbleAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewBubbleAttributes extends HTMLAttributes {
      'data'?: DataModel | DataModel[] | GTS[] | string;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewChart {
      'data': DataModel | GTS[] | string;
      'getTimeClip': () => number[];
      'hiddenData': number[];
      'options': Param;
      'responsive': boolean;
      'standalone': boolean;
      'type': string;
      'unit': string;
    }
  }

  interface HTMLWarpViewChartElement extends StencilComponents.WarpViewChart, HTMLStencilElement {}

  var HTMLWarpViewChartElement: {
    prototype: HTMLWarpViewChartElement;
    new (): HTMLWarpViewChartElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-chart': HTMLWarpViewChartElement;
  }
  interface ElementTagNameMap {
    'warp-view-chart': HTMLWarpViewChartElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-chart': JSXElements.WarpViewChartAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewChartAttributes extends HTMLAttributes {
      'data'?: DataModel | GTS[] | string;
      'hiddenData'?: number[];
      'onBoundsDidChange'?: (event: CustomEvent) => void;
      'onPointHover'?: (event: CustomEvent) => void;
      'onWarpViewChartResize'?: (event: CustomEvent) => void;
      'options'?: Param;
      'responsive'?: boolean;
      'standalone'?: boolean;
      'type'?: string;
      'unit'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewDatagrid {
      'data': DataModel | any[] | string;
      'elemsCount': number;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'width': string;
    }
  }

  interface HTMLWarpViewDatagridElement extends StencilComponents.WarpViewDatagrid, HTMLStencilElement {}

  var HTMLWarpViewDatagridElement: {
    prototype: HTMLWarpViewDatagridElement;
    new (): HTMLWarpViewDatagridElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-datagrid': HTMLWarpViewDatagridElement;
  }
  interface ElementTagNameMap {
    'warp-view-datagrid': HTMLWarpViewDatagridElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-datagrid': JSXElements.WarpViewDatagridAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewDatagridAttributes extends HTMLAttributes {
      'data'?: DataModel | any[] | string;
      'elemsCount'?: number;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewPaginable {
      'data': { name: string, values: any[], headers: string[] };
      'elemsCount': number;
      'options': Param;
    }
  }

  interface HTMLWarpViewPaginableElement extends StencilComponents.WarpViewPaginable, HTMLStencilElement {}

  var HTMLWarpViewPaginableElement: {
    prototype: HTMLWarpViewPaginableElement;
    new (): HTMLWarpViewPaginableElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-paginable': HTMLWarpViewPaginableElement;
  }
  interface ElementTagNameMap {
    'warp-view-paginable': HTMLWarpViewPaginableElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-paginable': JSXElements.WarpViewPaginableAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewPaginableAttributes extends HTMLAttributes {
      'data'?: { name: string, values: any[], headers: string[] };
      'elemsCount'?: number;
      'options'?: Param;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewDisplay {
      'data': DataModel | DataModel[] | any[] | string | number;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLWarpViewDisplayElement extends StencilComponents.WarpViewDisplay, HTMLStencilElement {}

  var HTMLWarpViewDisplayElement: {
    prototype: HTMLWarpViewDisplayElement;
    new (): HTMLWarpViewDisplayElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-display': HTMLWarpViewDisplayElement;
  }
  interface ElementTagNameMap {
    'warp-view-display': HTMLWarpViewDisplayElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-display': JSXElements.WarpViewDisplayAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewDisplayAttributes extends HTMLAttributes {
      'data'?: DataModel | DataModel[] | any[] | string | number;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface CalendarHeatmap {
      'data': Datum[];
      'maxColor': string;
      'minColor': string;
      'overview': string;
    }
  }

  interface HTMLCalendarHeatmapElement extends StencilComponents.CalendarHeatmap, HTMLStencilElement {}

  var HTMLCalendarHeatmapElement: {
    prototype: HTMLCalendarHeatmapElement;
    new (): HTMLCalendarHeatmapElement;
  };
  interface HTMLElementTagNameMap {
    'calendar-heatmap': HTMLCalendarHeatmapElement;
  }
  interface ElementTagNameMap {
    'calendar-heatmap': HTMLCalendarHeatmapElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'calendar-heatmap': JSXElements.CalendarHeatmapAttributes;
    }
  }
  namespace JSXElements {
    export interface CalendarHeatmapAttributes extends HTMLAttributes {
      'data'?: Datum[];
      'maxColor'?: string;
      'minColor'?: string;
      'onHandler'?: (event: CustomEvent) => void;
      'onOnChange'?: (event: CustomEvent) => void;
      'overview'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewDrilldown {
      'data': DataModel | any[] | string;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'width': string;
    }
  }

  interface HTMLWarpViewDrilldownElement extends StencilComponents.WarpViewDrilldown, HTMLStencilElement {}

  var HTMLWarpViewDrilldownElement: {
    prototype: HTMLWarpViewDrilldownElement;
    new (): HTMLWarpViewDrilldownElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-drilldown': HTMLWarpViewDrilldownElement;
  }
  interface ElementTagNameMap {
    'warp-view-drilldown': HTMLWarpViewDrilldownElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-drilldown': JSXElements.WarpViewDrilldownAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewDrilldownAttributes extends HTMLAttributes {
      'data'?: DataModel | any[] | string;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewGtsPopup {
      'gtsList': DataModel;
      'hiddenData': number[];
      'maxToShow': number;
    }
  }

  interface HTMLWarpViewGtsPopupElement extends StencilComponents.WarpViewGtsPopup, HTMLStencilElement {}

  var HTMLWarpViewGtsPopupElement: {
    prototype: HTMLWarpViewGtsPopupElement;
    new (): HTMLWarpViewGtsPopupElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-gts-popup': HTMLWarpViewGtsPopupElement;
  }
  interface ElementTagNameMap {
    'warp-view-gts-popup': HTMLWarpViewGtsPopupElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-gts-popup': JSXElements.WarpViewGtsPopupAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewGtsPopupAttributes extends HTMLAttributes {
      'gtsList'?: DataModel;
      'hiddenData'?: number[];
      'maxToShow'?: number;
      'onWarpViewSelectedGTS'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewChip {
      'gtsFilter': string;
      'hiddenData': number[];
      'name': string;
      'node': any;
    }
  }

  interface HTMLWarpViewChipElement extends StencilComponents.WarpViewChip, HTMLStencilElement {}

  var HTMLWarpViewChipElement: {
    prototype: HTMLWarpViewChipElement;
    new (): HTMLWarpViewChipElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-chip': HTMLWarpViewChipElement;
  }
  interface ElementTagNameMap {
    'warp-view-chip': HTMLWarpViewChipElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-chip': JSXElements.WarpViewChipAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewChipAttributes extends HTMLAttributes {
      'gtsFilter'?: string;
      'hiddenData'?: number[];
      'name'?: string;
      'node'?: any;
      'onWarpViewSelectedGTS'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewGtsTree {
      'data': DataModel | DataModel[] | GTS[] | string;
      'gtsFilter': string;
      'hiddenData': number[];
      'options': Param;
    }
  }

  interface HTMLWarpViewGtsTreeElement extends StencilComponents.WarpViewGtsTree, HTMLStencilElement {}

  var HTMLWarpViewGtsTreeElement: {
    prototype: HTMLWarpViewGtsTreeElement;
    new (): HTMLWarpViewGtsTreeElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-gts-tree': HTMLWarpViewGtsTreeElement;
  }
  interface ElementTagNameMap {
    'warp-view-gts-tree': HTMLWarpViewGtsTreeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-gts-tree': JSXElements.WarpViewGtsTreeAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewGtsTreeAttributes extends HTMLAttributes {
      'data'?: DataModel | DataModel[] | GTS[] | string;
      'gtsFilter'?: string;
      'hiddenData'?: number[];
      'options'?: Param;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewTreeView {
      'branch': boolean;
      'gtsFilter': string;
      'gtsList': any[];
      'hidden': boolean;
      'hiddenData': number[];
    }
  }

  interface HTMLWarpViewTreeViewElement extends StencilComponents.WarpViewTreeView, HTMLStencilElement {}

  var HTMLWarpViewTreeViewElement: {
    prototype: HTMLWarpViewTreeViewElement;
    new (): HTMLWarpViewTreeViewElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-tree-view': HTMLWarpViewTreeViewElement;
  }
  interface ElementTagNameMap {
    'warp-view-tree-view': HTMLWarpViewTreeViewElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-tree-view': JSXElements.WarpViewTreeViewAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewTreeViewAttributes extends HTMLAttributes {
      'branch'?: boolean;
      'gtsFilter'?: string;
      'gtsList'?: any[];
      'hidden'?: boolean;
      'hiddenData'?: number[];
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewImage {
      'data': DataModel | any[] | string;
      'height': string;
      'imageTitle': string;
      'options': Param;
      'responsive': boolean;
      'width': string;
    }
  }

  interface HTMLWarpViewImageElement extends StencilComponents.WarpViewImage, HTMLStencilElement {}

  var HTMLWarpViewImageElement: {
    prototype: HTMLWarpViewImageElement;
    new (): HTMLWarpViewImageElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-image': HTMLWarpViewImageElement;
  }
  interface ElementTagNameMap {
    'warp-view-image': HTMLWarpViewImageElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-image': JSXElements.WarpViewImageAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewImageAttributes extends HTMLAttributes {
      'data'?: DataModel | any[] | string;
      'height'?: string;
      'imageTitle'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewHeatmapSliders {
      'blurValue': number;
      'maxBlurValue': number;
      'maxRadiusValue': number;
      'minBlurValue': number;
      'minRadiusValue': number;
      'radiusValue': number;
    }
  }

  interface HTMLWarpViewHeatmapSlidersElement extends StencilComponents.WarpViewHeatmapSliders, HTMLStencilElement {}

  var HTMLWarpViewHeatmapSlidersElement: {
    prototype: HTMLWarpViewHeatmapSlidersElement;
    new (): HTMLWarpViewHeatmapSlidersElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-heatmap-sliders': HTMLWarpViewHeatmapSlidersElement;
  }
  interface ElementTagNameMap {
    'warp-view-heatmap-sliders': HTMLWarpViewHeatmapSlidersElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-heatmap-sliders': JSXElements.WarpViewHeatmapSlidersAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewHeatmapSlidersAttributes extends HTMLAttributes {
      'blurValue'?: number;
      'maxBlurValue'?: number;
      'maxRadiusValue'?: number;
      'minBlurValue'?: number;
      'minRadiusValue'?: number;
      'onHeatBlurDidChange'?: (event: CustomEvent) => void;
      'onHeatOpacityDidChange'?: (event: CustomEvent) => void;
      'onHeatRadiusDidChange'?: (event: CustomEvent) => void;
      'radiusValue'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewMap {
      'data': any;
      'heatData': any[];
      'height': number;
      'hiddenData': number[];
      'options': any;
      'resize': () => void;
      'responsive': boolean;
      'width': number;
    }
  }

  interface HTMLWarpViewMapElement extends StencilComponents.WarpViewMap, HTMLStencilElement {}

  var HTMLWarpViewMapElement: {
    prototype: HTMLWarpViewMapElement;
    new (): HTMLWarpViewMapElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-map': HTMLWarpViewMapElement;
  }
  interface ElementTagNameMap {
    'warp-view-map': HTMLWarpViewMapElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-map': JSXElements.WarpViewMapAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewMapAttributes extends HTMLAttributes {
      'data'?: any;
      'heatData'?: any[];
      'height'?: number;
      'hiddenData'?: number[];
      'options'?: any;
      'responsive'?: boolean;
      'width'?: number;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewModal {
      'close': () => void;
      'open': () => void;
      'title': string;
    }
  }

  interface HTMLWarpViewModalElement extends StencilComponents.WarpViewModal, HTMLStencilElement {}

  var HTMLWarpViewModalElement: {
    prototype: HTMLWarpViewModalElement;
    new (): HTMLWarpViewModalElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-modal': HTMLWarpViewModalElement;
  }
  interface ElementTagNameMap {
    'warp-view-modal': HTMLWarpViewModalElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-modal': JSXElements.WarpViewModalAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewModalAttributes extends HTMLAttributes {
      'title'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewPie {
      'data': DataModel | any[] | string;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'width': string;
    }
  }

  interface HTMLWarpViewPieElement extends StencilComponents.WarpViewPie, HTMLStencilElement {}

  var HTMLWarpViewPieElement: {
    prototype: HTMLWarpViewPieElement;
    new (): HTMLWarpViewPieElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-pie': HTMLWarpViewPieElement;
  }
  interface ElementTagNameMap {
    'warp-view-pie': HTMLWarpViewPieElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-pie': JSXElements.WarpViewPieAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewPieAttributes extends HTMLAttributes {
      'data'?: DataModel | any[] | string;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewPlot {
      'data': string | GTS[] | DataModel;
      'getTimeClip': () => number[];
      'gtsFilter': string;
      'height': string;
      'options': string | Param;
      'responsive': boolean;
      'showLegend': boolean;
      'width': string;
    }
  }

  interface HTMLWarpViewPlotElement extends StencilComponents.WarpViewPlot, HTMLStencilElement {}

  var HTMLWarpViewPlotElement: {
    prototype: HTMLWarpViewPlotElement;
    new (): HTMLWarpViewPlotElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-plot': HTMLWarpViewPlotElement;
  }
  interface ElementTagNameMap {
    'warp-view-plot': HTMLWarpViewPlotElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-plot': JSXElements.WarpViewPlotAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewPlotAttributes extends HTMLAttributes {
      'data'?: string | GTS[] | DataModel;
      'gtsFilter'?: string;
      'height'?: string;
      'options'?: string | Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewPolar {
      'data': DataModel | any[] | string;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'width': string;
    }
  }

  interface HTMLWarpViewPolarElement extends StencilComponents.WarpViewPolar, HTMLStencilElement {}

  var HTMLWarpViewPolarElement: {
    prototype: HTMLWarpViewPolarElement;
    new (): HTMLWarpViewPolarElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-polar': HTMLWarpViewPolarElement;
  }
  interface ElementTagNameMap {
    'warp-view-polar': HTMLWarpViewPolarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-polar': JSXElements.WarpViewPolarAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewPolarAttributes extends HTMLAttributes {
      'data'?: DataModel | any[] | string;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewRadar {
      'data': DataModel | any[] | string;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'width': string;
    }
  }

  interface HTMLWarpViewRadarElement extends StencilComponents.WarpViewRadar, HTMLStencilElement {}

  var HTMLWarpViewRadarElement: {
    prototype: HTMLWarpViewRadarElement;
    new (): HTMLWarpViewRadarElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-radar': HTMLWarpViewRadarElement;
  }
  interface ElementTagNameMap {
    'warp-view-radar': HTMLWarpViewRadarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-radar': JSXElements.WarpViewRadarAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewRadarAttributes extends HTMLAttributes {
      'data'?: DataModel | any[] | string;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewScatter {
      'data': DataModel | GTS[] | string;
      'height': string;
      'options': Param;
      'responsive': boolean;
      'showLegend': boolean;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLWarpViewScatterElement extends StencilComponents.WarpViewScatter, HTMLStencilElement {}

  var HTMLWarpViewScatterElement: {
    prototype: HTMLWarpViewScatterElement;
    new (): HTMLWarpViewScatterElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-scatter': HTMLWarpViewScatterElement;
  }
  interface ElementTagNameMap {
    'warp-view-scatter': HTMLWarpViewScatterElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-scatter': JSXElements.WarpViewScatterAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewScatterAttributes extends HTMLAttributes {
      'data'?: DataModel | GTS[] | string;
      'height'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewSpinner {
      'message': string;
    }
  }

  interface HTMLWarpViewSpinnerElement extends StencilComponents.WarpViewSpinner, HTMLStencilElement {}

  var HTMLWarpViewSpinnerElement: {
    prototype: HTMLWarpViewSpinnerElement;
    new (): HTMLWarpViewSpinnerElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-spinner': HTMLWarpViewSpinnerElement;
  }
  interface ElementTagNameMap {
    'warp-view-spinner': HTMLWarpViewSpinnerElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-spinner': JSXElements.WarpViewSpinnerAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewSpinnerAttributes extends HTMLAttributes {
      'message'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewTile {
      'chartTitle': string;
      'gtsFilter': string;
      'options': Param;
      'resize': () => void;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
      'url': string;
    }
  }

  interface HTMLWarpViewTileElement extends StencilComponents.WarpViewTile, HTMLStencilElement {}

  var HTMLWarpViewTileElement: {
    prototype: HTMLWarpViewTileElement;
    new (): HTMLWarpViewTileElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-tile': HTMLWarpViewTileElement;
  }
  interface ElementTagNameMap {
    'warp-view-tile': HTMLWarpViewTileElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-tile': JSXElements.WarpViewTileAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewTileAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'gtsFilter'?: string;
      'options'?: Param;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'type'?: string;
      'unit'?: string;
      'url'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface WarpViewToggle {
      'checked': boolean;
      'text1': string;
      'text2': string;
    }
  }

  interface HTMLWarpViewToggleElement extends StencilComponents.WarpViewToggle, HTMLStencilElement {}

  var HTMLWarpViewToggleElement: {
    prototype: HTMLWarpViewToggleElement;
    new (): HTMLWarpViewToggleElement;
  };
  interface HTMLElementTagNameMap {
    'warp-view-toggle': HTMLWarpViewToggleElement;
  }
  interface ElementTagNameMap {
    'warp-view-toggle': HTMLWarpViewToggleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'warp-view-toggle': JSXElements.WarpViewToggleAttributes;
    }
  }
  namespace JSXElements {
    export interface WarpViewToggleAttributes extends HTMLAttributes {
      'checked'?: boolean;
      'onStateChange'?: (event: CustomEvent) => void;
      'text1'?: string;
      'text2'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
