import {Component, Prop, Element, EventEmitter, Event, Watch} from '@stencil/core';
import {GTSLib} from "../../gts.lib";
import Draggabilly from "draggabilly";

@Component({
  tag: 'quantum-horizontal-zoom-slider',
  styleUrl: 'quantum-horizontal-zoom-slider.scss',
  shadow: true
})

export class QuantumHorizontalZoomSlider {

  @Prop() width: number;
  @Prop() maxValue: number;
  @Prop() minValue: number;
  @Prop() cursorSize: string = "{}";
  @Prop() config: string = '{}';

  @Element() el: HTMLElement;

  @Event() xSliderValueChanged: EventEmitter;
  @Event() xZoom: EventEmitter;

/*
  private _config = {
    rail: {
      class: ''
    },
    cursor: {
      class: ''
    }
  };
  */
  private _rail: HTMLElement;
  private _cursor: HTMLElement;
  private _cursorWidth;
  private _cursorMinWidth = 30;
  private _railMin;
  private _railMax;
  private _mouseCursorLeftOffset;
  private _mouseCursorRightOffset;

  @Watch("cursorSize")
  changeCursorSize(newValue: string, oldValue: string) {
    if (oldValue !== newValue) {
      let object = JSON.parse(newValue);
      if (object.cursorOffset + object.cursorSize <= 100) {
        this._cursor.style.left = (object.cursorOffset * 100).toString() + "%";
        if (object.cursorSize * this._rail.getBoundingClientRect().width < this._cursorMinWidth) {
          this._cursor.style.width = this._cursorMinWidth.toString() + "px";
        } else {
          this._cursor.style.width = (object.cursorSize * 100).toString() + "%";
        }
      }
    }
  }

  @Watch("width")
  initSize(newValue: number, oldValue: number) {
    if (oldValue !== newValue) {
      this._rail.style.width = (0.94 * newValue).toString() + "px";
    }
  }

  componentWillLoad() {
    //this._config = GTSLib.mergeDeep(this._config, JSON.parse(this.config));
  }

  componentDidLoad() {
    this._rail = this.el.shadowRoot.querySelector("#rail") as HTMLElement;
    this._cursor = this.el.shadowRoot.querySelector("#cursor") as HTMLElement;
    let drag = new Draggabilly(this._cursor, {
      axis: "x",
      containment: this._rail
    });
    drag.on("dragStart", (event, pointer) => {
      this.dimsX(event);
    });
    drag.on("dragMove", (event: any, pointer, moveVector) => {
      if ((event.pageX - this._mouseCursorLeftOffset) >= this._railMin + 1 && (event.pageX + this._mouseCursorRightOffset) <= this._railMax - 1) {
        let v = event.pageX - this._rail.offsetLeft - this._mouseCursorLeftOffset;
        v = Math.max(0, v);
        let value =
          (v / (this._railMax - this._railMin - this._cursorWidth)) *
            (this.maxValue - this.minValue) +
          this.minValue;
        window.setTimeout(() =>
          this.xSliderValueChanged.emit({ sliderValue: value })
        );
      }
    });
  }

  dimsX(event) {
    let railDims = this._rail.getBoundingClientRect() as DOMRect;
    let cursorDims = this._cursor.getBoundingClientRect() as DOMRect;
    this._railMin = this._rail.offsetLeft;
    this._railMax = railDims.width + this._rail.offsetLeft;
    this._cursorWidth = cursorDims.width;
    this._mouseCursorLeftOffset = event.pageX - this._cursor.offsetLeft - this._rail.offsetLeft;
    this._mouseCursorRightOffset = cursorDims.width - this._mouseCursorLeftOffset;
  }

  xWheel(event) {
    event.preventDefault();
    let railDims = this._rail.getBoundingClientRect() as DOMRect;

    let coef = (event.pageX - this._rail.offsetLeft) / railDims.width;
    this.xZoom.emit({zoomValue: {coef: coef, zoomType: event.deltaY * -1}});
  }

  render() {
    return (
      <div id="rail" onWheel={(event) => this.xWheel(event)}>
        <div id="cursor"/>
      </div>
    );
  }
}
