import '../../stencil.core';
import { Param } from "../../model/param";
import { DataModel } from "../../model/dataModel";
export declare class QuantumPolar {
    responsive: boolean;
    showLegend: boolean;
    data: DataModel | any[];
    options: Param;
    width: string;
    height: string;
    el: HTMLElement;
    private LOG;
    private _options;
    private uuid;
    private _chart;
    private resizeTimer;
    onResize(): void;
    private onData;
    private onOptions;
    private parseData;
    private drawChart;
    componentDidLoad(): void;
    render(): JSX.Element;
}
