import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
import '../../stencil.core';
export declare class QuantumMultiCharts {
    unit: string;
    type: string;
    chartTitle: string;
    responsive: boolean;
    showLegend: boolean;
    data: string;
    hiddenData: string;
    options: string;
    width: string;
    height: string;
    timeMin: number;
    timeMax: number;
    el: HTMLElement;
    wc: HTMLStencilElement;
    private _options;
    private _chart;
    private _xView;
    private _yView;
    private png;
    private _slider;
    changeScale(newValue: string, oldValue: string): void;
    chartInfosWatcher(event: CustomEvent): void;
    dataParser(): void;
    componentWillLoad(): void;
    xSliderInit(): void;
    componentDidLoad(): void;
    xZoomListener(event: CustomEvent): void;
    xSliderListener(event: CustomEvent): void;
    zoomReset(): void;
    render(): JSX.Element;
}
