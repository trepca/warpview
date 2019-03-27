import '../../stencil.core';
import { DataModel } from "../../model/dataModel";
import { Param } from "../../model/param";
import { GTS } from "../../model/GTS";
import { ChartBounds } from '../../model/chartBounds';
export declare class WarpViewPlot {
    data: string | GTS[] | DataModel;
    options: string | Param;
    width: string;
    height: string;
    responsive: boolean;
    showLegend: boolean;
    gtsFilter: string;
    debug: boolean;
    isAlone: boolean;
    initialChartHeight: string;
    initialMapHeight: string;
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
    private gtsFilterCount;
    private preventDefaultKeyList;
    private preventDefaultKeyListInModals;
    getTimeClip(): Promise<ChartBounds>;
    private onGtsFilter;
    private onData;
    private onOptions;
    handleDocKeydown(ev: KeyboardEvent): void;
    private handleKeyDown;
    private pushKbdEvent;
    stateChange(event: CustomEvent): void;
    boundsDidChange(event: CustomEvent): void;
    warpViewSelectedGTS(event: CustomEvent): void;
    private handleMouseMove;
    private handleMouseOut;
    private drawCharts;
    private applyFilter;
    componentWillLoad(): void;
    componentDidLoad(): void;
    onWarpViewModalClose(): void;
    inputTextKeyboardEvents(e: KeyboardEvent): void;
    tzSelected(): void;
    render(): JSX.Element;
}
