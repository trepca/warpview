import '../../stencil.core';
import { EventEmitter } from '../../stencil.core';
export declare class QuantumHorizontalZoomSlider {
    width: number;
    maxValue: number;
    minValue: number;
    cursorSize: string;
    config: string;
    el: HTMLElement;
    xSliderValueChanged: EventEmitter;
    xZoom: EventEmitter;
    private _rail;
    private _cursor;
    private _cursorWidth;
    private _cursorMinWidth;
    private _railMin;
    private _railMax;
    private _mouseCursorLeftOffset;
    private _mouseCursorRightOffset;
    changeCursorSize(newValue: string, oldValue: string): void;
    initSize(newValue: number, oldValue: number): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    dimsX(event: any): void;
    xWheel(event: any): void;
    render(): JSX.Element;
}
