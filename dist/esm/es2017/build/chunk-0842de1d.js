import { h } from '../warpview.core.js';

class Logger {
    constructor(className) {
        this.className = className.name;
    }
    static isArray(value) {
        return value && typeof value === 'object' && value instanceof Array && typeof value.length === 'number'
            && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
    }
    log(level, methods, args) {
        let logChain = [];
        logChain.push(`[${this.className}] ${methods.join(' - ')}`);
        logChain = logChain.concat(args);
        switch (level) {
            case LEVEL.DEBUG: {
                console.debug(...logChain);
                break;
            }
            case LEVEL.ERROR: {
                console.error(...logChain);
                break;
            }
            case LEVEL.INFO: {
                console.log(...logChain);
                break;
            }
            case LEVEL.WARN: {
                console.warn(...logChain);
                break;
            }
            default: {
                console.log(...logChain);
            }
        }
    }
    debug(methods, ...args) {
        this.log(LEVEL.DEBUG, methods, args);
    }
    error(methods, ...args) {
        this.log(LEVEL.ERROR, methods, args);
    }
    warn(methods, ...args) {
        this.log(LEVEL.WARN, methods, args);
    }
    info(methods, ...args) {
        this.log(LEVEL.INFO, methods, args);
    }
}
var LEVEL;
(function (LEVEL) {
    LEVEL[LEVEL["DEBUG"] = 0] = "DEBUG";
    LEVEL[LEVEL["ERROR"] = 1] = "ERROR";
    LEVEL[LEVEL["WARN"] = 2] = "WARN";
    LEVEL[LEVEL["INFO"] = 3] = "INFO";
})(LEVEL || (LEVEL = {}));

class ChartLib {
    static guid() {
        let uuid = '', i, random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-";
            }
            uuid += (i == 12 ? 4 : (i == 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    }
    static mergeDeep(...sources) {
        let extended = {};
        let deep = true;
        let i = 0;
        for (; i < arguments.length; i++) {
            const obj = arguments[i];
            ChartLib.merge(obj, extended, deep);
        }
        return extended;
    }
    static merge(obj, extended, deep) {
        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = ChartLib.mergeDeep(extended[prop], obj[prop]);
                }
                else {
                    extended[prop] = obj[prop];
                }
            }
        }
    }
    ;
    static isObject(item) {
        return (item && typeof item === 'object' && !Array.isArray(item));
    }
    static getTooltipCallbacks() {
        return {
            title: (tooltipItem) => {
                return tooltipItem[0].xLabel;
            },
            label: (tooltipItem, data) => {
                let label = data.datasets[tooltipItem.datasetIndex].label || '';
                if (label) {
                    label += ': ';
                }
                label += tooltipItem.yLabel;
                return label;
            }
        };
    }
    static buildImage(w, h, color) {
        const img = new Image(w, h);
        const svg = `<svg width="${w}px" height="${h}px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid">
<rect width="${w}" height="${h}" style="fill:${color};" ></rect>
</svg>`;
        img.src = "data:image/svg+xml;base64," + btoa(svg);
        return img;
    }
}

class DataModel {
}

class GTSLib {
    static cleanArray(actual) {
        return actual.filter((i) => !!i);
    }
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
    static isArray(value) {
        return value && typeof value === 'object' && value instanceof Array && typeof value.length === 'number'
            && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
    }
    static isValidResponse(data) {
        let response;
        try {
            response = JSON.parse(data);
        }
        catch (e) {
            this.LOG.error(['isValidResponse'], 'Response non JSON compliant', data);
            return false;
        }
        if (!GTSLib.isArray(response)) {
            this.LOG.error(['isValidResponse'], 'Response isn\'t an Array', response);
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
            }
            else {
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
    static flatDeep(arr1) {
        if (!GTSLib.isArray(arr1)) {
            arr1 = [arr1];
        }
        return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(GTSLib.flatDeep(val)) : acc.concat(val), []);
    }
    ;
    static flattenGtsIdArray(a, r) {
        const res = [];
        if (GTSLib.isGts(a)) {
            a = [a];
        }
        a.forEach(d => {
            if (GTSLib.isArray(d)) {
                const walk = GTSLib.flattenGtsIdArray(d, r);
                res.push(walk.res);
                r = walk.r;
            }
            else if (d.v) {
                d.id = r;
                res.push(d);
                r++;
            }
        });
        return { res: res, r: r };
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
        for (let i = 0; i < gts.v.length; i++) {
            let metric = gts.v[i];
            if (metric.length === 2) ;
            if (metric.length === 3) ;
            if (metric.length === 4) {
                path.push({ ts: Math.floor(metric[0] / 1000), lat: metric[1], lon: metric[2], val: metric[3] });
            }
            if (metric.length === 5) {
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
            this.LOG.error(['equalMetadata'], 'Error in GTS, metadata is not well formed');
            return false;
        }
        if (a.c !== b.c) {
            return false;
        }
        for (let p in a.l) {
            if (!b.l.hasOwnProperty(p) || a.l[p] !== b.l[p])
                return false;
        }
        for (let p in b.l) {
            if (!a.l.hasOwnProperty(p))
                return false;
        }
        return true;
    }
    static isGts(item) {
        return !(!item || item.c === null || item.l === null ||
            item.a === null || item.v === null || !GTSLib.isArray(item.v));
    }
    static isGtsToPlot(gts) {
        if (!GTSLib.isGts(gts) || gts.v.length === 0) {
            return false;
        }
        for (let i = 0; i < gts.v.length; i++) {
            if (gts.v[i][gts.v[i].length - 1] !== null) {
                if (typeof (gts.v[i][gts.v[i].length - 1]) === 'number' ||
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
    static getData(data) {
        if (typeof data === 'string') {
            return GTSLib.getData(JSON.parse(data));
        }
        else if (data && data.hasOwnProperty('data')) {
            return data;
        }
        else if (GTSLib.isArray(data) && data.length > 0 && data[0].data) {
            return data[0];
        }
        else if (GTSLib.isArray(data)) {
            return { data: data };
        }
        return new DataModel();
    }
    static getDivider(timeUnit) {
        let timestampdivider = 1000;
        if (timeUnit === 'ms') {
            timestampdivider = 1;
        }
        if (timeUnit === 'ns') {
            timestampdivider = 1000000;
        }
        return timestampdivider;
    }
}
GTSLib.LOG = new Logger(GTSLib);
GTSLib.formatLabel = (data) => {
    const serializedGTS = data.split('{');
    let display = `<span class="gtsInfo"><span class='gts-classname'>${serializedGTS[0]}</span>`;
    if (serializedGTS.length > 1) {
        display += `<span class='gts-separator'>{</span>`;
        const labels = serializedGTS[1].substr(0, serializedGTS[1].length - 1).split(',');
        if (labels.length > 0) {
            labels.forEach((l, i) => {
                const label = l.split('=');
                if (l.length > 1) {
                    display += `<span><span class='gts-labelname'>${label[0]}</span><span class='gts-separator'>=</span><span class='gts-labelvalue'>${label[1]}</span>`;
                    if (i !== labels.length - 1) {
                        display += `<span>, </span>`;
                    }
                }
            });
        }
        display += `<span class='gts-separator'>}</span>`;
    }
    if (serializedGTS.length > 2) {
        display += `<span class='gts-separator'>{</span>`;
        const labels = serializedGTS[2].substr(0, serializedGTS[2].length - 1).split(',');
        if (labels.length > 0) {
            labels.forEach((l, i) => {
                const label = l.split('=');
                if (l.length > 1) {
                    display += `<span><span class='gts-attrname'>${label[0]}</span><span class='gts-separator'>=</span><span class='gts-attrvalue'>${label[1]}</span>`;
                    if (i !== labels.length - 1) {
                        display += `<span>, </span>`;
                    }
                }
            });
        }
        display += `<span class='gts-separator'>}</span>`;
    }
    display += '</span>';
    return display;
};

class Param {
    constructor() {
        this.showDots = false;
        this.timeUnit = 'us';
    }
}

export { Logger as a, ChartLib as b, GTSLib as c, Param as d, DataModel as e };