import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class QuantumScatter {
    unit: string;
    chartTitle: string;
    responsive: boolean;
    showLegend: boolean;
    data: string;
    options: object;
    width: string;
    height: string;
    timeMin: number;
    timeMax: number;
    pointHover: EventEmitter;
    el: HTMLElement;
    redraw(newValue: string, oldValue: string): void;
    drawChart(): void;
    gtsToScatter(gts: any): any[];
    componentDidLoad(): void;
    render(): JSX.Element;
}