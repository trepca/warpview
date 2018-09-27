/*
 *
 *    Copyright 2016  Cityzen Data
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

import {DataModel} from "../model/dataModel";
import {GTS} from "../model/GTS";
import {Logger} from "./logger";

import Leaflet from 'leaflet';
export class GTSLib {

  /**
   *
   * @param actual
   */
  static cleanArray(actual: any[]) {
    return actual.filter((i) => !!i);
  }

  /**
   * Return a Set
   * @param arr
   * @returns {any[]}
   */
  static unique(arr) {
    let u = {}, a = [];
    for (let i = 0, l = arr.length; i < l; ++i) {
      if (!u.hasOwnProperty(arr[i])) {
        a.push(arr[i]);
        u[arr[i]] = 1;
      }
    }
    return a;
  }

  /**
   * Test if value is an array
   * @param value
   * @returns {any | boolean}
   */
  static isArray(value) {
    return value && typeof value === 'object' && value instanceof Array && typeof value.length === 'number'
      && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
  }

  static isValidResponse(data) {
    let response;
    try {
      response = JSON.parse(data);
    } catch (e) {
      console.error('Response non JSON compliant', data);
      return false;
    }
    if (!GTSLib.isArray(response)) {
      console.error('Response isn\'t an Array', response);
      return false;
    }
    return true;
  }

  static isEmbeddedImage(item) {
    return !(typeof item !== 'string' || !/^data:image/.test(item));
  }

  static isEmbeddedImageObject(item) {
    return !((item === null) || (item.image === null) ||
      (item.caption === null) || !GTSLib.isEmbeddedImage(item.image));
  }

  static isPositionArray(item) {
    if (!item || !item.positions) {
      return false;
    }
    if (GTSLib.isPositionsArrayWithValues(item) || GTSLib.isPositionsArrayWithTwoValues(item)) {
      return true;
    }
    for (let i in item.positions) {
      if (item.positions[i].length < 2 || item.positions[i].length > 3) {
        return false;
      }
      for (let j in item.positions[i]) {
        if (typeof item.positions[i][j] !== 'number') {
          return false;
        }
      }
    }
    return true;
  }

  static isPositionsArrayWithValues(item) {
    if ((item === null) || (item.positions === null)) {
      return false;
    }
    for (let i in item.positions) {
      if (item.positions[i].length !== 3) {
        return false;
      }
      for (let j in item.positions[i]) {
        if (typeof item.positions[i][j] !== 'number') {
          return false;
        }
      }
    }
    return true;
  }

  static isPositionsArrayWithTwoValues(item) {
    if ((item === null) || (item.positions === null)) {
      return false;
    }
    for (let i in item.positions) {
      if (item.positions[i].length !== 4) {
        return false;
      }
      for (let j in item.positions[i]) {
        if (typeof item.positions[i][j] !== 'number') {
          return false;
        }
      }
    }
    return true;
  }

  static metricFromJSON(json) {
    let metric = {
      ts: json[0],
      value: undefined,
      alt: undefined,
      lon: undefined,
      lat: undefined
    };
    switch (json.length) {
      case 2:
        metric.value = json[1];
        break;
      case 3:
        metric.alt = json[1];
        metric.value = json[2];
        break;
      case 4:
        metric.lat = json[1];
        metric.lon = json[2];
        metric.value = json[3];
        break;
      case 5:
        metric.lat = json[1];
        metric.lon = json[2];
        metric.alt = json[3];
        metric.value = json[4];
    }
    return metric;
  }

  static gtsFromJSON(json, id) {
    return {
      gts: {
        c: json.c,
        l: json.l,
        a: json.a,
        v: json.v,
        id: id,
      },
    };
  }

  /**
   *
   * @param jsonList
   * @param prefixId
   * @returns {{content: any[]}}
   */
  static gtsFromJSONList(jsonList, prefixId) {
    let gtsList = [];
    let id;
    (jsonList || []).forEach((item, i) => {
      let gts = item;
      if (item.gts) {
        gts = item.gts;
      }
      if ((prefixId !== undefined) && (prefixId !== '')) {
        id = prefixId + '-' + i;
      } else {
        id = i;
      }
      if (GTSLib.isArray(gts)) {
        gtsList.push(GTSLib.gtsFromJSONList(gts, id));
      }
      if (GTSLib.isGts(gts)) {
        gtsList.push(GTSLib.gtsFromJSON(gts, id));
      }
      if (GTSLib.isEmbeddedImage(gts)) {
        gtsList.push({
          image: gts,
          caption: 'Image',
          id: id,
        });
      }
      if (GTSLib.isEmbeddedImageObject(gts)) {
        gtsList.push({
          image: gts.image,
          caption: gts.caption,
          id: id,
        });
      }
    });
    return {
      content: gtsList || [],
    };
  }

  /**
   *
   * @param arr1
   * @returns {any}
   */
  static flatDeep(arr1: any[]) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(GTSLib.flatDeep(val)) : acc.concat(val), []);
  };

  /**
   *
   * @param a
   * @param r
   * @returns {any}
   */
  static flattenGtsIdArray(a, r) {
    let elem;
    let j;
    if (!r) {
      r = [];
    }
    for (j = 0; j < a.content.length; j++) {
      elem = a.content[j];
      if (elem.content) {
        GTSLib.flattenGtsIdArray(elem, r);
      } else {
        if (elem.gts) {
          r.push(elem.gts);
        }
      }
    }
    return r;
  }

  static serializeGtsMetadata(gts) {
    let serializedLabels = [];
    Object.keys(gts.l).forEach((key) => {
      serializedLabels.push(key + "=" + gts.l[key]);
    });
    let serializedAttributes = [];
    Object.keys(gts.a).forEach((key) => {
      serializedAttributes.push(key + "=" + gts.a[key]);
    });
    return gts.c + '{' + serializedLabels.join(',') + (serializedAttributes.length > 0 ? ',' : '') + serializedAttributes.join(',') + '}';
  }

  static gtsToPath(gts) {
    let path = [];
    // Sort values
    gts.v = gts.v.sort(function (a, b) {
      return a[0] - b[0];
    });
    for (let i = 0; i < gts.v.length; i++) {
      let metric = gts.v[i];
      if (metric.length === 2) {
        // timestamp, value
      }
      if (metric.length === 3) {
        // timestamp, elevation, value
      }
      if (metric.length === 4) {
        // timestamp, lat, lon, value
        path.push({ts: Math.floor(metric[0] / 1000), lat: metric[1], lon: Leaflet.Util.wrapNum(metric[2], [0,360], true), val: metric[3]});
      }
      if (metric.length === 5) {
        // timestamp, lat, lon, elevation, value
        path.push({
          ts: Math.floor(metric[0] / 1000),
          lat: metric[1],
          lon: metric[2],
          elev: metric[3],
          val: metric[4],
        });
      }
    }
    return path;
  }

  static equalMetadata(a, b) {
    if (a.c === undefined || b.c === undefined || a.l === undefined || b.l === undefined ||
      !(a.l instanceof Object) || !(b.l instanceof Object)) {
      console.error('[warp10-gts-tools] equalMetadata - Error in GTS, metadata is not well formed');
      return false;
    }
    if (a.c !== b.c) {
      return false;
    }
    for (let p in a.l) {
      if (!b.l.hasOwnProperty(p)) return false;
      if (a.l[p] !== b.l[p]) return false;
    }
    for (let p in b.l) {
      if (!a.l.hasOwnProperty(p)) return false;
    }
    return true;
  }

  static isGts(item) {
    return !(!item || item === null || item.c === null || item.l === null ||
      item.a === null || item.v === null || !GTSLib.isArray(item.v));
  }

  static isGtsToPlot(gts) {
    if (!GTSLib.isGts(gts) || gts.v.length === 0) {
      return false;
    }
    // We look at the first non-null value, if it's a String or Boolean it's an annotation GTS,
    // if it's a number it's a GTS to plot
    for (let i = 0; i < gts.v.length; i++) {
      if (gts.v[i][gts.v[i].length - 1] !== null) {
        // console.log("[warp10-gts-tools] isGtsToPlot - First value type", gts.v[i][gts.v[i].length - 1] );
        if (typeof (gts.v[i][gts.v[i].length - 1]) === 'number' ||
          // gts.v[i][gts.v[i].length - 1].constructor.name === 'Big' ||
          gts.v[i][gts.v[i].length - 1].constructor.prototype.toFixed !== undefined) {
          return true;
        }
        break;
      }
    }
    return false;
  }

  static isBooleanGts(gts) {
    if (!GTSLib.isGts(gts) || gts.v.length === 0) {
      return false;
    }
    // We look at the first non-null value, if it's a Boolean it's a boolean GTS,
    // if it's a number it's a GTS to plot
    for (let i = 0; i < gts.v.length; i++) {
      if (gts.v[i][gts.v[i].length - 1] !== null) {
        if (typeof (gts.v[i][gts.v[i].length - 1]) !== 'boolean') {
          return true;
        }
        break;
      }
    }
    return false;
  }

  static isGtsToAnnotate(gts) {
    if (!GTSLib.isGts(gts) || gts.v.length === 0) {
      return false;
    }
    // We look at the first non-null value, if it's a String or Boolean it's an annotation GTS,
    // if it's a number it's a GTS to plot
    for (let i = 0; i < gts.v.length; i++) {
      if (gts.v[i][gts.v[i].length - 1] !== null) {
        if (typeof (gts.v[i][gts.v[i].length - 1]) !== 'number' &&
          (!!gts.v[i][gts.v[i].length - 1].constructor &&
            gts.v[i][gts.v[i].length - 1].constructor.name !== 'Big') &&
          gts.v[i][gts.v[i].length - 1].constructor.prototype.toFixed === undefined) {
          return true;
        }
        break;
      }
    }
    return false;
  }

  static gtsSort(gts) {
    if (gts.isSorted) {
      return;
    }
    gts.v = gts.v.sort(function (a, b) {
      return a[0] - b[0];
    });
    gts.isSorted = true;
  }

  static gtsTimeRange(gts) {
    GTSLib.gtsSort(gts);
    if (gts.v.length === 0) {
      return null;
    }
    return [gts.v[0][0], gts.v[gts.v.length - 1][0]];
  }

  /**
   *
   * @param data
   */
  static getData(data: any): DataModel {
    if (typeof data === 'string') {
      return GTSLib.getData(JSON.parse(data as string));
    } else if (data && data.hasOwnProperty('data')) {
      return data as DataModel;
    } else if (GTSLib.isArray(data) && data.length > 0 && data[0].data) {
      return data[0] as DataModel;
    } else if (GTSLib.isArray(data)) {
      return {data: data as GTS[]} as DataModel;
    }
    return new DataModel();
  }
}
