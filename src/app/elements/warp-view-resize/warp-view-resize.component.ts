/*
 * Copyright 2019 SenX S.A.S.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Logger} from '../../utils/logger';

/**
 *
 */
@Component({
  selector: 'warpview-resize',
  templateUrl: './warp-view-resize.component.html',
  styleUrls: ['./warp-view-resize.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WarpViewResizeComponent implements AfterViewInit {
  @ViewChild('handleDiv') handleDiv: ElementRef;
  /**
   * Minimum height in pixel. default 10px.
   */
  @Input() minHeight: string = '10';

  /**
   * If set, force the initial height to the given value in px.
   */
  @Input() initialHeight: string = null;

  @Input() set debug(debug: boolean) {
    this._debug = debug;
    this.LOG.setDebug(debug);
  }

  get debug() {
    return this._debug;
  }

  @Output() resize = new EventEmitter();

  private dragging = false;
  private firstDraw = true;
  private moveListener: EventListener;
  private clickUpListener: EventListener;
  private LOG: Logger;
  private _debug = false;

  /**
   *
   */
  constructor(private el: ElementRef) {
    this.LOG = new Logger(WarpViewResizeComponent, this.debug);
  }

  /**
   *
   */
  ngAfterViewInit(): void {
    if (this.firstDraw && this.initialHeight) {
      this.el.nativeElement.style.height = parseInt(this.initialHeight) + 'px';
    }
    //the click event on the handlebar attach mousemove and mouseup events to document.
    this.handleDiv.nativeElement.addEventListener('mousedown', (ev: MouseEvent) => {
      if (0 == ev.button) { //keep left click only
        this.moveListener = this.handleDraggingMove.bind(this);
        this.clickUpListener = this.handleDraggingEnd.bind(this);
        document.addEventListener('mousemove', this.moveListener, false);
        document.addEventListener('mouseup', this.clickUpListener, false);
      }
    });
  }

  /**
   *
   * @param {CustomEvent} event
   */
  @HostListener('resizeMyParent', ['$event'])
  onResize(event: CustomEvent) {
    event.stopPropagation();
    if (event.detail.h) {
      this.el.nativeElement.style.height = event.detail.h + 'px';
    }
  }

  /**
   *
   */
  private handleDraggingEnd() {
    this.dragging = false;
    //the mouseup detach mousemove and mouseup events from document.
    if (this.moveListener) {
      document.removeEventListener('mousemove', this.moveListener, false);
      this.moveListener = null;
    }
    if (this.clickUpListener) {
      document.removeEventListener('mouseup', this.clickUpListener, false);
      this.clickUpListener = null;
    }
  }

  /**
   *
   * @param {MouseEvent} ev
   */
  private handleDraggingMove(ev: MouseEvent) {
    ev.preventDefault();
    this.LOG.debug(['handleDraggingMove'], ev);
    //compute Y of the parent div top relative to page
    let yTopParent = this.handleDiv.nativeElement.parentElement.getBoundingClientRect().top
      - document.body.getBoundingClientRect().top;
    //compute new parent height
    let h = ev.pageY - yTopParent + this.handleDiv.nativeElement.getBoundingClientRect().height / 2;
    if (h < parseInt(this.minHeight)) {
      h = parseInt(this.minHeight);
    }
    //apply new height
    this.handleDiv.nativeElement.parentElement.style.height = h + 'px';
    this.LOG.debug(['handleDraggingMove'], h);
    this.resize.emit(h);
  }
}