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

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import {HandleError, HttpErrorHandler} from './http-error-handler.service';
import {Logger} from '../utils/logger';

/**
 *
 */
@Injectable({providedIn: 'root'})
export class Warp10Service {

  private LOG: Logger;
  private readonly handleError: HandleError;

  /**
   *
   * @param {HttpClient} http
   * @param {HttpErrorHandler} httpErrorHandler
   */
  constructor(
    private http: HttpClient,
    private httpErrorHandler: HttpErrorHandler) {
    this.LOG = new Logger(Warp10Service, true);
    this.handleError = httpErrorHandler.createHandleError('Warp10Service');
  }

  /**
   *
   * @param {string} warpScript
   * @param {string} url
   * @return {Observable<[]>}
   */
  exec(warpScript: string, url: string): Observable<any[]> {
    this.LOG.debug(['exec', 'warpScript'], url, warpScript);
    return this.http.post<any[]>(url + '/exec', warpScript)
      .pipe(
        tap(r => this.LOG.debug(['exec', 'result'], r)),
        catchError(this.handleError<any[]>('exec', []))
      );
  }
}