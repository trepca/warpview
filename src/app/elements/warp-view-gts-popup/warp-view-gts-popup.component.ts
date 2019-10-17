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

import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {DataModel} from '../../model/dataModel';
import {Logger} from '../../utils/logger';
import {GTSLib} from '../../utils/gts.lib';
import {WarpViewModalComponent} from '../warp-view-modal/warp-view-modal.component';

/**
 *
 */
@Component({
  selector: 'warpview-gts-popup',
  templateUrl: './warp-view-gts-popup.component.html',
  styleUrls: ['./warp-view-gts-popup.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WarpViewGtsPopupComponent implements AfterViewInit {
  @ViewChild('modal') modal: WarpViewModalComponent;

  @Input() set gtsList(gtsList: DataModel) {
    this._gtsList = gtsList;
    this.prepareData();
  }

  get gtslist(): DataModel {
    return this._gtsList;
  }

  @Input() set debug(debug: boolean) {
    this._debug = debug;
    this.LOG.setDebug(debug);
  }

  get debug() {
    return this._debug;
  }

  @Input() set data(data: DataModel) {
    this.LOG.debug(['data'], data);
    if (data) {
      this._data = data;
    }
  }

  get data(): DataModel {
    return this._data;
  }


  @Input() set hiddenData(hiddenData: number[]) {
    this._hiddenData = hiddenData;
    this.prepareData();
  }

  get hiddenData(): number[] {
    return this._hiddenData;
  }

  @Input() maxToShow: number = 5;

  @Input() set kbdLastKeyPressed(kbdLastKeyPressed: string[]) {
    this._kbdLastKeyPressed = kbdLastKeyPressed;
    if (kbdLastKeyPressed[0] === 's' && !this.modalOpenned) {
      this.showPopup();
    } else if (this.modalOpenned) {
      switch (kbdLastKeyPressed[0]) {
        case'ArrowUp':
        case'j':
          this.current = Math.max(0, this.current - 1);
          this.prepareData();
          break;
        case 'ArrowDown':
        case 'k':
          this.current = Math.min(this._gts.length - 1, this.current + 1);
          this.prepareData();
          break;
        case ' ':
          this.warpViewSelectedGTS.emit({
            gts: this._gts[this.current],
            selected: this.hiddenData.indexOf(this._gts[this.current].id) > -1
          });
          break;
        default:
          return;
      }
    }
  }

  get kbdLastKeyPressed(): string[] {
    return this._kbdLastKeyPressed;
  }

  @Output() warpViewSelectedGTS = new EventEmitter<any>();
  @Output() warpViewModalOpen = new EventEmitter<any>();
  @Output() warpViewModalClose = new EventEmitter<any>();

  current: number = 0;
  _gts: any[] = [];

  private _kbdLastKeyPressed: string[] = [];
  private _hiddenData: number[] = [];
  private _debug = false;
  private _gtsList: DataModel;
  private _data: DataModel;
  private displayed: any[] = [];
  private modalOpenned: boolean = false;
  private LOG: Logger;

  /**
   *
   */
  constructor() {
    this.LOG = new Logger(WarpViewGtsPopupComponent, this.debug);
  }

  /**
   *
   */
  ngAfterViewInit(): void {
    this.prepareData();
  }

  /**
   *
   */
  onWarpViewModalOpen() {
    this.modalOpenned = true;
    this.warpViewModalOpen.emit({});
  }

  /**
   *
   */
  onWarpViewModalClose() {
    this.modalOpenned = false;
    this.warpViewModalClose.emit({});
  }

  /**
   *
   * @returns {Promise<boolean>}
   */
  public isOpened(): Promise<boolean> {
    return this.modal.isOpened();
  }

  /**
   *
   */
  private showPopup() {
    this.current = 0;
    this.prepareData();
    this.modal.open();
  }

  /**
   *
   */
  private prepareData() {
    if (this.gtsList && this.gtsList.data) {
      this._gts = GTSLib.flatDeep([this.gtsList.data]);
      this.displayed = this._gts.slice(
        Math.max(0, Math.min(this.current - this.maxToShow, this._gts.length - 2 * this.maxToShow)),
        Math.min(this._gts.length, this.current + this.maxToShow + Math.abs(Math.min(this.current - this.maxToShow, 0)))
      ) as any[];
      this.LOG.debug(['prepareData'], this.displayed);
    }
  }

  /**
   *
   * @param gts
   * @returns {boolean}
   */
  private isHidden(gts) {
    return !this.displayed.find(g => gts.id === g.id);
  }

}