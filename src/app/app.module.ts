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

import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {WarpViewElementsModule} from './elements/warp-view-elements.module';
import {GettingStartedComponent} from './demo/getting-started/getting-started.component';
import {MenuComponent} from './demo/menu/menu.component';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {MainDemoComponent} from './demo/main-demo/main-demo.component';
import {SettingsService} from './services/settings.service';
import {SmallTestsComponent} from './demo/small-tests/small-tests.component';
import {AngularResizedEventModule} from 'angular-resize-event';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    GettingStartedComponent,
    MenuComponent,
    MainDemoComponent,
    SmallTestsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    WarpViewElementsModule,
    AngularResizedEventModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [SettingsService],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule {
}

