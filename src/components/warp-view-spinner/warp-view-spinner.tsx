/*
 *  Copyright 2018  SenX S.A.S.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

import {Component, Prop} from "@stencil/core";

/**
 * Spinner component
 */
@Component({
  tag: 'warp-view-spinner',
  styleUrl: 'warp-view-spinner.scss',
  shadow: true
})
export class WarpViewSpinner {

  @Prop() message: string ='Loading and parsing data...';

  render() {
    return <div class="wrapper">
      <div class=" lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h2>{this.message}</h2>
    </div>;
  }
}