/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

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


declare global {

  namespace StencilComponents {
    interface QuantumAnnotation {
      'chartTitle': string;
      'data': string;
      'height': string;
      'hiddenData': string;
      'options': string;
      'responsive': boolean;
      'showLegend': boolean;
      'timeMax': number;
      'timeMin': number;
      'width': string;
    }
  }

  interface HTMLQuantumAnnotationElement extends StencilComponents.QuantumAnnotation, HTMLStencilElement {}

  var HTMLQuantumAnnotationElement: {
    prototype: HTMLQuantumAnnotationElement;
    new (): HTMLQuantumAnnotationElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-annotation': HTMLQuantumAnnotationElement;
  }
  interface ElementTagNameMap {
    'quantum-annotation': HTMLQuantumAnnotationElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-annotation': JSXElements.QuantumAnnotationAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumAnnotationAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'height'?: string;
      'hiddenData'?: string;
      'onPointHover'?: (event: CustomEvent) => void;
      'options'?: string;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'timeMax'?: number;
      'timeMin'?: number;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumBubble {
      'chartTitle': string;
      'data': string;
      'height': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'timeMax': number;
      'timeMin': number;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLQuantumBubbleElement extends StencilComponents.QuantumBubble, HTMLStencilElement {}

  var HTMLQuantumBubbleElement: {
    prototype: HTMLQuantumBubbleElement;
    new (): HTMLQuantumBubbleElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-bubble': HTMLQuantumBubbleElement;
  }
  interface ElementTagNameMap {
    'quantum-bubble': HTMLQuantumBubbleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-bubble': JSXElements.QuantumBubbleAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumBubbleAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'height'?: string;
      'onPointHover'?: (event: CustomEvent) => void;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'timeMax'?: number;
      'timeMin'?: number;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumChart {
      'alone': boolean;
      'chartTitle': string;
      'config': string;
      'data': string;
      'height': string;
      'hiddenData': string;
      'options': string;
      'responsive': boolean;
      'showLegend': boolean;
      'timeMax': number;
      'timeMin': number;
      'toBase64Image': () => any;
      'type': string;
      'unit': string;
      'width': string;
      'xView': string;
      'yView': string;
    }
  }

  interface HTMLQuantumChartElement extends StencilComponents.QuantumChart, HTMLStencilElement {}

  var HTMLQuantumChartElement: {
    prototype: HTMLQuantumChartElement;
    new (): HTMLQuantumChartElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-chart': HTMLQuantumChartElement;
  }
  interface ElementTagNameMap {
    'quantum-chart': HTMLQuantumChartElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-chart': JSXElements.QuantumChartAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumChartAttributes extends HTMLAttributes {
      'alone'?: boolean;
      'chartTitle'?: string;
      'config'?: string;
      'data'?: string;
      'height'?: string;
      'hiddenData'?: string;
      'onBoundsDidChange'?: (event: CustomEvent) => void;
      'onChartInfos'?: (event: CustomEvent) => void;
      'onPointHover'?: (event: CustomEvent) => void;
      'options'?: string;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'timeMax'?: number;
      'timeMin'?: number;
      'type'?: string;
      'unit'?: string;
      'width'?: string;
      'xView'?: string;
      'yView'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumDygraphs {
      'data': string;
      'hiddenData': string;
      'options': string;
      'responsive': boolean;
    }
  }

  interface HTMLQuantumDygraphsElement extends StencilComponents.QuantumDygraphs, HTMLStencilElement {}

  var HTMLQuantumDygraphsElement: {
    prototype: HTMLQuantumDygraphsElement;
    new (): HTMLQuantumDygraphsElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-dygraphs': HTMLQuantumDygraphsElement;
  }
  interface ElementTagNameMap {
    'quantum-dygraphs': HTMLQuantumDygraphsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-dygraphs': JSXElements.QuantumDygraphsAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumDygraphsAttributes extends HTMLAttributes {
      'data'?: string;
      'hiddenData'?: string;
      'onBoundsDidChange'?: (event: CustomEvent) => void;
      'onPointHover'?: (event: CustomEvent) => void;
      'onReceivedData'?: (event: CustomEvent) => void;
      'options'?: string;
      'responsive'?: boolean;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumChip {
      'index': number;
      'name': string;
      'node': any;
    }
  }

  interface HTMLQuantumChipElement extends StencilComponents.QuantumChip, HTMLStencilElement {}

  var HTMLQuantumChipElement: {
    prototype: HTMLQuantumChipElement;
    new (): HTMLQuantumChipElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-chip': HTMLQuantumChipElement;
  }
  interface ElementTagNameMap {
    'quantum-chip': HTMLQuantumChipElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-chip': JSXElements.QuantumChipAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumChipAttributes extends HTMLAttributes {
      'index'?: number;
      'name'?: string;
      'node'?: any;
      'onQuantumSelectedGTS'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumGtsTree {
      'data': string;
    }
  }

  interface HTMLQuantumGtsTreeElement extends StencilComponents.QuantumGtsTree, HTMLStencilElement {}

  var HTMLQuantumGtsTreeElement: {
    prototype: HTMLQuantumGtsTreeElement;
    new (): HTMLQuantumGtsTreeElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-gts-tree': HTMLQuantumGtsTreeElement;
  }
  interface ElementTagNameMap {
    'quantum-gts-tree': HTMLQuantumGtsTreeElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-gts-tree': JSXElements.QuantumGtsTreeAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumGtsTreeAttributes extends HTMLAttributes {
      'data'?: string;
      'onSelectedGTS'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumTreeView {
      'branch': boolean;
      'gtsList': any;
    }
  }

  interface HTMLQuantumTreeViewElement extends StencilComponents.QuantumTreeView, HTMLStencilElement {}

  var HTMLQuantumTreeViewElement: {
    prototype: HTMLQuantumTreeViewElement;
    new (): HTMLQuantumTreeViewElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-tree-view': HTMLQuantumTreeViewElement;
  }
  interface ElementTagNameMap {
    'quantum-tree-view': HTMLQuantumTreeViewElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-tree-view': JSXElements.QuantumTreeViewAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumTreeViewAttributes extends HTMLAttributes {
      'branch'?: boolean;
      'gtsList'?: any;
      'onSelected'?: (event: CustomEvent) => void;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumHeatmapSliders {
      'blurValue': number;
      'maxBlurValue': number;
      'maxRadiusValue': number;
      'minBlurValue': number;
      'minRadiusValue': number;
      'radiusValue': number;
    }
  }

  interface HTMLQuantumHeatmapSlidersElement extends StencilComponents.QuantumHeatmapSliders, HTMLStencilElement {}

  var HTMLQuantumHeatmapSlidersElement: {
    prototype: HTMLQuantumHeatmapSlidersElement;
    new (): HTMLQuantumHeatmapSlidersElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-heatmap-sliders': HTMLQuantumHeatmapSlidersElement;
  }
  interface ElementTagNameMap {
    'quantum-heatmap-sliders': HTMLQuantumHeatmapSlidersElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-heatmap-sliders': JSXElements.QuantumHeatmapSlidersAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumHeatmapSlidersAttributes extends HTMLAttributes {
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
    interface QuantumMap {
      'data': string;
      'dotsLimit': number;
      'heatBlur': number;
      'heatControls': boolean;
      'heatData': string;
      'heatOpacity': number;
      'heatRadius': number;
      'height': string;
      'mapTitle': string;
      'responsive': boolean;
      'startLat': number;
      'startLong': number;
      'startZoom': number;
      'width': string;
    }
  }

  interface HTMLQuantumMapElement extends StencilComponents.QuantumMap, HTMLStencilElement {}

  var HTMLQuantumMapElement: {
    prototype: HTMLQuantumMapElement;
    new (): HTMLQuantumMapElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-map': HTMLQuantumMapElement;
  }
  interface ElementTagNameMap {
    'quantum-map': HTMLQuantumMapElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-map': JSXElements.QuantumMapAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumMapAttributes extends HTMLAttributes {
      'data'?: string;
      'dotsLimit'?: number;
      'heatBlur'?: number;
      'heatControls'?: boolean;
      'heatData'?: string;
      'heatOpacity'?: number;
      'heatRadius'?: number;
      'height'?: string;
      'mapTitle'?: string;
      'responsive'?: boolean;
      'startLat'?: number;
      'startLong'?: number;
      'startZoom'?: number;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumMultiCharts {
      'chartTitle': string;
      'data': string;
      'height': string;
      'hiddenData': string;
      'options': string;
      'responsive': boolean;
      'showLegend': boolean;
      'timeMax': number;
      'timeMin': number;
      'type': string;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLQuantumMultiChartsElement extends StencilComponents.QuantumMultiCharts, HTMLStencilElement {}

  var HTMLQuantumMultiChartsElement: {
    prototype: HTMLQuantumMultiChartsElement;
    new (): HTMLQuantumMultiChartsElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-multi-charts': HTMLQuantumMultiChartsElement;
  }
  interface ElementTagNameMap {
    'quantum-multi-charts': HTMLQuantumMultiChartsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-multi-charts': JSXElements.QuantumMultiChartsAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumMultiChartsAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'height'?: string;
      'hiddenData'?: string;
      'options'?: string;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'timeMax'?: number;
      'timeMin'?: number;
      'type'?: string;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumPie {
      'chartTitle': string;
      'data': string;
      'height': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLQuantumPieElement extends StencilComponents.QuantumPie, HTMLStencilElement {}

  var HTMLQuantumPieElement: {
    prototype: HTMLQuantumPieElement;
    new (): HTMLQuantumPieElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-pie': HTMLQuantumPieElement;
  }
  interface ElementTagNameMap {
    'quantum-pie': HTMLQuantumPieElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-pie': JSXElements.QuantumPieAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumPieAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'height'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'type'?: string;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumPolar {
      'chartTitle': string;
      'data': string;
      'height': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLQuantumPolarElement extends StencilComponents.QuantumPolar, HTMLStencilElement {}

  var HTMLQuantumPolarElement: {
    prototype: HTMLQuantumPolarElement;
    new (): HTMLQuantumPolarElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-polar': HTMLQuantumPolarElement;
  }
  interface ElementTagNameMap {
    'quantum-polar': HTMLQuantumPolarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-polar': JSXElements.QuantumPolarAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumPolarAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'height'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'type'?: string;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumRadar {
      'chartTitle': string;
      'data': string;
      'height': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLQuantumRadarElement extends StencilComponents.QuantumRadar, HTMLStencilElement {}

  var HTMLQuantumRadarElement: {
    prototype: HTMLQuantumRadarElement;
    new (): HTMLQuantumRadarElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-radar': HTMLQuantumRadarElement;
  }
  interface ElementTagNameMap {
    'quantum-radar': HTMLQuantumRadarElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-radar': JSXElements.QuantumRadarAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumRadarAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'height'?: string;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumScatter {
      'chartTitle': string;
      'data': string;
      'height': string;
      'options': object;
      'responsive': boolean;
      'showLegend': boolean;
      'timeMax': number;
      'timeMin': number;
      'unit': string;
      'width': string;
    }
  }

  interface HTMLQuantumScatterElement extends StencilComponents.QuantumScatter, HTMLStencilElement {}

  var HTMLQuantumScatterElement: {
    prototype: HTMLQuantumScatterElement;
    new (): HTMLQuantumScatterElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-scatter': HTMLQuantumScatterElement;
  }
  interface ElementTagNameMap {
    'quantum-scatter': HTMLQuantumScatterElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-scatter': JSXElements.QuantumScatterAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumScatterAttributes extends HTMLAttributes {
      'chartTitle'?: string;
      'data'?: string;
      'height'?: string;
      'onPointHover'?: (event: CustomEvent) => void;
      'options'?: object;
      'responsive'?: boolean;
      'showLegend'?: boolean;
      'timeMax'?: number;
      'timeMin'?: number;
      'unit'?: string;
      'width'?: string;
    }
  }
}


declare global {

  namespace StencilComponents {
    interface QuantumTile {
      'chartTitle': string;
      'responsive': boolean;
      'showLegend': boolean;
      'type': string;
      'unit': string;
      'url': string;
    }
  }

  interface HTMLQuantumTileElement extends StencilComponents.QuantumTile, HTMLStencilElement {}

  var HTMLQuantumTileElement: {
    prototype: HTMLQuantumTileElement;
    new (): HTMLQuantumTileElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-tile': HTMLQuantumTileElement;
  }
  interface ElementTagNameMap {
    'quantum-tile': HTMLQuantumTileElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-tile': JSXElements.QuantumTileAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumTileAttributes extends HTMLAttributes {
      'chartTitle'?: string;
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
    interface QuantumToggle {
      'checked': boolean;
      'option': string;
      'text1': string;
      'text2': string;
    }
  }

  interface HTMLQuantumToggleElement extends StencilComponents.QuantumToggle, HTMLStencilElement {}

  var HTMLQuantumToggleElement: {
    prototype: HTMLQuantumToggleElement;
    new (): HTMLQuantumToggleElement;
  };
  interface HTMLElementTagNameMap {
    'quantum-toggle': HTMLQuantumToggleElement;
  }
  interface ElementTagNameMap {
    'quantum-toggle': HTMLQuantumToggleElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'quantum-toggle': JSXElements.QuantumToggleAttributes;
    }
  }
  namespace JSXElements {
    export interface QuantumToggleAttributes extends HTMLAttributes {
      'checked'?: boolean;
      'onTimeSwitched'?: (event: CustomEvent) => void;
      'option'?: string;
      'text1'?: string;
      'text2'?: string;
    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
