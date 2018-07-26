import '../../stencil.core';
import { EventEmitter } from "../../stencil.core";
export declare class QuantumTreeView {
    gtsList: any;
    branch: boolean;
    selected: EventEmitter;
    /**
     *
     * @param node
     * @returns {number}
     */
    getIndex(node: any): number;
    /**
     *
     * @param {CustomEvent} event
     */
    onSelected(event: CustomEvent): void;
    /**
     *
     */
    componentWillLoad(): void;
    /**
     *
     * @returns {any}
     */
    render(): JSX.Element;
}