import '../../stencil.core';
import { DataModel } from "../../model/dataModel";
import { Param } from "../../model/param";
import { GTS } from "../../model/GTS";
export declare class WarpViewPlot {
    data: string | GTS[] | DataModel;
    options: string | Param;
    width: string;
    height: string;
    responsive: boolean;
    showLegend: boolean;
    gtsFilter: string;
    debug: boolean;
    isalone: boolean;
    private _options;
    private _data;
    private _toHide;
    private _timeMin;
    private _timeMax;
    showChart: boolean;
    showMap: boolean;
    chartType: string;
    timeClipValue: string;
    kbdLastKeyPressed: string[];
    private mainPlotDiv;
    private LOG;
    private line;
    private main;
    private chartContainer;
    private chart;
    private annotation;
    private modal;
    private map;
    private timeClip;
    private filterInput;
    private timeClipElement;
    private mouseOutTimer;
    private tzSelector;
    private kbdCounter;
    private gtsPopupModal;
    componentDidLoad(): void;
    getTimeClip(): Promise<[number, number]>;
    private onGtsFilter;
    private onData;
    private onOptions;
    handlelocalkeydown(ev: KeyboardEvent): void;
    handledockeydown(ev: KeyboardEvent): void;
    private preventDefaultKeyList;
    private preventDefaultKeyListInModals;
    private handleKeyDown;
    private pushKbdEvent;
    stateChange(event: CustomEvent): void;
    boundsDidChange(event: CustomEvent): void;
    onResize(event: CustomEvent): void;
    warpViewSelectedGTS(event: CustomEvent): void;
    private handleMouseMove;
    private handleMouseOut;
    private drawCharts;
    private applyFilter;
    componentWillLoad(): void;
    onWarpViewModalClose(): void;
    inputTextKeyboardEvents(e: KeyboardEvent): void;
    tzSelected(e: Event): void;
    render(): JSX.Element;
}
