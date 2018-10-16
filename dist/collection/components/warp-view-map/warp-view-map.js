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
import Leaflet from 'leaflet';
import 'leaflet.heat';
import 'leaflet.markercluster';
import { ColorLib } from "../../utils/color-lib";
import { ChartLib } from "../../utils/chart-lib";
import { Logger } from "../../utils/logger";
import { MapLib } from "../../utils/map-lib";
import { GTSLib } from "../../utils/gts.lib";
import moment from "moment";
export class WarpViewMap {
    constructor() {
        this.responsive = false;
        this.heatData = [];
        this.options = {};
        this.hiddenData = [];
        this._options = {
            dotsLimit: 1000,
            heatControls: false,
            mapType: 'DEFAULT'
        };
        this.mapTypes = {
            DEFAULT: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            TOPO: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
            ESRI: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
            SATELLITE: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            OCEANS: 'https://server.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
            GRAY: 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
            GRAYSCALE: 'https://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}',
            WATERCOLOR: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
        };
        this.uuid = 'map-' + ChartLib.guid().split('-').join('');
        this.LOG = new Logger(WarpViewMap);
        this.polylinesBeforeCurrentValue = [];
        this.polylinesAfterCurrentValue = [];
        this.currentValuesMarkers = [];
        this.annotationsMarkers = [];
        this.positionArraysMarkers = [];
        this._iconAnchor = [20, 52];
        this._popupAnchor = [0, -50];
    }
    onResize() {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => {
            this.LOG.debug(['onResize'], this.el.parentElement.clientWidth);
            this.drawMap();
        }, 250);
    }
    onHideData(newValue, oldValue) {
        if (oldValue.length !== newValue.length) {
            this.LOG.debug(['hiddenData'], newValue);
            this.drawMap();
        }
    }
    onData(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.LOG.debug(['data'], newValue);
            this.drawMap();
        }
    }
    onOptions(newValue, oldValue) {
        if (oldValue !== newValue) {
            this.LOG.debug(['options'], newValue);
            this.drawMap();
        }
    }
    heatRadiusDidChange(event) {
        this._heatLayer.setOptions({ radius: event.detail.valueAsNumber });
        this.LOG.debug(['heatRadiusDidChange'], event.detail.valueAsNumber);
    }
    heatBlurDidChange(event) {
        this._heatLayer.setOptions({ blur: event.detail.valueAsNumber });
        this.LOG.debug(['heatBlurDidChange'], event.detail.valueAsNumber);
    }
    heatOpacityDidChange(event) {
        let minOpacity = event.detail.valueAsNumber / 100;
        this._heatLayer.setOptions({ minOpacity: minOpacity });
        this.LOG.debug(['heatOpacityDidChange'], event.detail.valueAsNumber);
    }
    drawMap() {
        this.LOG.debug(['drawMap'], this.data);
        this._options = ChartLib.mergeDeep(this._options, this.options);
        if (!this.data) {
            return;
        }
        if (this._map) {
            this._map.invalidateSize(true);
        }
        let dataList;
        let params;
        if (this.data.data) {
            dataList = this.data.data;
            params = this.data.params;
        }
        else {
            dataList = this.data;
            params = [];
        }
        this.LOG.debug(['drawMap'], dataList);
        if (!dataList) {
            return;
        }
        this.displayMap({ gts: GTSLib.flatDeep(dataList), params: params });
    }
    icon(color, marker = '') {
        let c = "+" + color.slice(1);
        let m = marker !== '' ? '-' + marker : '';
        return Leaflet.icon({
            iconUrl: 'https://api.mapbox.com/v3/marker/pin-s' + m + c + '@2x.png',
            iconAnchor: this._iconAnchor,
            popupAnchor: this._popupAnchor
        });
    }
    displayMap(data) {
        this.LOG.debug(['drawMap'], [this.data, this._options]);
        this.pathData = MapLib.toLeafletMapPaths(data);
        this.annotationsData = MapLib.annotationsToLeafletPositions(data);
        this.positionData = MapLib.toLeafletMapPositionArray(data);
        if (!this.data) {
            return;
        }
        if (this._map) {
            this._map.remove();
        }
        let ctx = this.el.shadowRoot.querySelector('#' + this.uuid);
        const height = (this.responsive ? this.el.parentElement.clientHeight : WarpViewMap.DEFAULT_HEIGHT) - 30;
        const width = (this.responsive ? this.el.parentElement.clientWidth : WarpViewMap.DEFAULT_WIDTH) - 5;
        ctx.style.width = width + 'px';
        ctx.style.height = height + 'px';
        this._map = Leaflet.map(ctx)
            .setView([this._options.startLat || 0, this._options.startLong || 0], this._options.startZoom || 2);
        Leaflet.tileLayer(this.mapTypes[this._options.mapType || 'DEFAULT'], {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this._map);
        this.pathData.forEach(d => {
            let plottedGts = this.updateGtsPath(d);
            if (plottedGts) {
                this.polylinesBeforeCurrentValue.push(plottedGts.beforeCurrentValue);
                this.polylinesAfterCurrentValue.push(plottedGts.afterCurrentValue);
                this.currentValuesMarkers.push(plottedGts.currentValue);
            }
        });
        this.annotationsData.forEach(d => {
            this.annotationsMarkers = this.annotationsMarkers.concat(this.updateAnnotation(d));
        });
        // Create the positions arrays
        this.positionData.forEach(d => {
            this.positionArraysMarkers = this.positionArraysMarkers.concat(this.updatePositionArray(d));
        });
        (this.tiles || []).forEach((t) => {
            Leaflet.tileLayer(t).addTo(this._map);
        });
        this.LOG.debug(['displayMap'], [this.positionArraysMarkers]);
        this.positionArraysMarkers.forEach(m => {
            m.addTo(this._map);
        });
        if (this.pathData.length > 0 || this.positionData.length > 0 || this.annotationsData.length > 0) {
            // Fit map to curves
            let bounds = MapLib.getBoundsArray(this.pathData, this.positionData, this.annotationsData);
            window.setTimeout(() => {
                this._options.startZoom = this._options.startZoom || 2;
                // Without the timeout tiles doesn't show, see https://github.com/Leaflet/Leaflet/issues/694
                this._map.invalidateSize();
                //   this.resize();
                if (bounds.length > 1) {
                    this._map.fitBounds(Leaflet.latLngBounds(bounds[0], bounds[1]), {
                        padding: [20, 20],
                        animate: false,
                        duration: 0
                    });
                    this._map.setZoom(Math.max(this._options.startZoom, this._map.getZoom()), {
                        animate: false,
                        duration: 0
                    });
                }
                else {
                    this._map.setView({
                        lat: this._options.startLat || 0,
                        lng: this._options.startLong || 0
                    }, this._options.startZoom);
                }
            }, 1000);
        }
        else {
        }
        if (this.heatData && this.heatData.length > 0) {
            this._heatLayer = Leaflet.heatLayer(this.heatData, {
                radius: this._options.heatRadius,
                blur: this._options.heatBlur,
                minOpacity: this._options.heatOpacity
            });
            this._heatLayer.addTo(this._map);
        }
    }
    updateGtsPath(gts) {
        if (this.hiddenData.filter((i) => i === gts.key).length === 0) {
            let beforeCurrentValue = Leaflet.polyline(MapLib.pathDataToLeaflet(gts.path, { to: 0 }), {
                color: gts.color,
                opacity: 1,
            }).addTo(this._map);
            let afterCurrentValue = Leaflet.polyline(MapLib.pathDataToLeaflet(gts.path, { from: 0 }), {
                color: gts.color,
                opacity: 0.5,
            }).addTo(this._map);
            let currentValue;
            // Let's verify we have a path... No path, no marker
            if (gts.path[0] !== undefined) {
                let date;
                if (this._options.timeMode && this._options.timeMode === 'timestamp') {
                    date = parseInt(gts.path[0].ts);
                }
                else {
                    date = moment(Math.floor(parseInt(gts.path[0].ts) / 1000)).utc(true).format("YYYY/MM/DD hh:mm:ss.SSSS");
                }
                currentValue = Leaflet.circleMarker([gts.path[0].lat, gts.path[0].lon], { radius: 5, color: '#fff', fillColor: gts.color, fillOpacity: 1 })
                    .bindPopup(`<p>${date}</p><p><b>${gts.key}</b>: ${gts.path[0].val.toString()}</p>`).addTo(this._map);
            }
            else {
                currentValue = Leaflet.circleMarker([0, 0]).addTo(this._map);
            }
            return {
                beforeCurrentValue: beforeCurrentValue,
                afterCurrentValue: afterCurrentValue,
                currentValue: currentValue,
            };
        }
        else {
            return undefined;
        }
    }
    updateAnnotation(gts) {
        let positions = [];
        let icon;
        this.LOG.debug(['updateAnnotation'], gts);
        if (this.hiddenData.filter((i) => i === gts.key).length === 0) {
            switch (gts.render) {
                case 'marker':
                    icon = this.icon(gts.color, gts.marker);
                    for (let j = 0; j < gts.path.length; j++) {
                        let date;
                        if (this._options.timeMode && this._options.timeMode === 'timestamp') {
                            date = parseInt(gts.path[j].ts);
                        }
                        else {
                            date = moment(Math.floor(parseInt(gts.path[j].ts) / 1000)).utc(true).format("YYYY/MM/DD hh:mm:ss.SSSS");
                        }
                        let marker = Leaflet.marker(gts.path[j], { icon: icon, opacity: 1 })
                            .bindPopup(`<p>${date}</p><p><b>${gts.key}</b>: ${gts.path[j].val.toString()}</p>`);
                        positions.push(marker);
                    }
                    break;
                case 'dots':
                default:
                    for (let j = 0; j < gts.path.length; j++) {
                        let marker = Leaflet.circleMarker(gts.path[j], {
                            radius: gts.baseRadius,
                            color: gts.color,
                            fillColor: gts.color,
                            fillOpacity: 1
                        });
                        let date;
                        if (this._options.timeMode && this._options.timeMode === 'timestamp') {
                            date = parseInt(gts.path[j].ts);
                        }
                        else {
                            date = moment(Math.floor(parseInt(gts.path[j].ts) / 1000)).utc(true).format("YYYY/MM/DD hh:mm:ss.SSSS");
                        }
                        marker.bindPopup(`<p>${date}</p><p><b>${gts.key}</b>: ${gts.path[j].val.toString()}</p>`);
                        positions.push(marker);
                    }
                    break;
            }
        }
        return positions;
    }
    updatePositionArray(positionData) {
        let positions = [];
        let polyline;
        let icon;
        let result;
        let inStep;
        this.LOG.debug(['updatePositionArray'], positionData);
        switch (positionData.render) {
            case 'path':
                polyline = Leaflet.polyline(positionData.positions, { color: positionData.color, opacity: 1 });
                positions.push(polyline);
                break;
            case 'marker':
                icon = this.icon(positionData.color, positionData.key);
                for (let j = 0; j < positionData.positions.length; j++) {
                    if (this.hiddenData.filter((i) => i === positionData.key).length === 0) {
                        let marker = Leaflet.marker({ lat: positionData.positions[j][0], lng: positionData.positions[j][1] }, {
                            icon: icon,
                            opacity: 1,
                        });
                        marker.bindPopup(`<p><b>${positionData.key}</b>: ${positionData.positions[j][2] || ''}</p>`);
                        positions.push(marker);
                    }
                }
                break;
            case 'coloredWeightedDots':
                this.LOG.debug(['updatePositionArray', 'coloredWeightedDots'], positionData);
                result = [];
                inStep = [];
                for (let j = 0; j < positionData.numColorSteps; j++) {
                    result[j] = 0;
                    inStep[j] = 0;
                }
                for (let j = 0; j < positionData.positions.length; j++) {
                    if (this.hiddenData.filter((i) => i === positionData.key).length === 0) {
                        this.LOG.debug(['updatePositionArray', 'coloredWeightedDots', 'radius'], positionData.baseRadius * positionData.positions[j][4]);
                        let marker = Leaflet.circleMarker({ lat: positionData.positions[j][0], lng: positionData.positions[j][1] }, {
                            radius: positionData.baseRadius * (parseInt(positionData.positions[j][4]) + 1),
                            color: positionData.borderColor,
                            fillColor: ColorLib.rgb2hex(positionData.colorGradient[positionData.positions[j][5]].r, positionData.colorGradient[positionData.positions[j][5]].g, positionData.colorGradient[positionData.positions[j][5]].b),
                            fillOpacity: 1,
                        });
                        this.LOG.debug(['updatePositionArray', 'coloredWeightedDots'], marker);
                        marker.bindPopup(`<p><b>${positionData.key}</b>: ${positionData.positions[j][2] || ''}</p>`);
                        positions.push(marker);
                    }
                }
                break;
            case 'weightedDots':
                for (let j = 0; j < positionData.positions.length; j++) {
                    if (this.hiddenData.filter((i) => i === positionData.key).length === 0) {
                        let marker = Leaflet.circleMarker({ lat: positionData.positions[j][0], lng: positionData.positions[j][1] }, {
                            radius: positionData.baseRadius * (parseInt(positionData.positions[j][4]) + 1),
                            color: positionData.borderColor,
                            fillColor: positionData.color, fillOpacity: 1,
                        });
                        marker.bindPopup(`<p><b>${positionData.key}</b>: ${positionData.positions[j][2] || ''}</p>`);
                        positions.push(marker);
                    }
                }
                break;
            case 'dots':
            default:
                for (let j = 0; j < positionData.positions.length; j++) {
                    if (this.hiddenData.filter((i) => i === positionData.key).length === 0) {
                        let marker = Leaflet.circleMarker({ lat: positionData.positions[j][0], lng: positionData.positions[j][1] }, {
                            radius: positionData.baseRadius,
                            color: positionData.borderColor,
                            fillColor: positionData.color,
                            fillOpacity: 1,
                        });
                        marker.bindPopup(`<p><b>${positionData.key}</b>: ${positionData.positions[j][2] || ''}</p>`);
                        positions.push(marker);
                    }
                }
                break;
        }
        return positions;
    }
    resize() {
        let ctx = this.el.shadowRoot.querySelector('#' + this.uuid);
        const height = (this.responsive ? this.el.parentElement.clientHeight : WarpViewMap.DEFAULT_HEIGHT) - 30;
        const width = (this.responsive ? this.el.parentElement.clientWidth : WarpViewMap.DEFAULT_WIDTH) - 5;
        ctx.style.width = width + 'px';
        ctx.style.height = height + 'px';
    }
    componentDidLoad() {
        this.drawMap();
    }
    render() {
        return (h("div", { class: "wrapper" },
            h("div", { class: "map-container" },
                h("div", { id: this.uuid, style: { width: this.width, height: this.height } })),
            !!this._options.heatControls ? h("warp-view-heatmap-sliders", null) : ""));
    }
    static get is() { return "warp-view-map"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "data": {
            "type": "Any",
            "attr": "data",
            "watchCallbacks": ["onData"]
        },
        "el": {
            "elementRef": true
        },
        "heatData": {
            "type": "Any",
            "attr": "heat-data"
        },
        "height": {
            "type": String,
            "attr": "height"
        },
        "hiddenData": {
            "type": "Any",
            "attr": "hidden-data",
            "watchCallbacks": ["onHideData"]
        },
        "options": {
            "type": "Any",
            "attr": "options",
            "watchCallbacks": ["onOptions"]
        },
        "resize": {
            "method": true
        },
        "responsive": {
            "type": Boolean,
            "attr": "responsive"
        },
        "width": {
            "type": String,
            "attr": "width"
        }
    }; }
    static get listeners() { return [{
            "name": "window:resize",
            "method": "onResize",
            "passive": true
        }, {
            "name": "heatRadiusDidChange",
            "method": "heatRadiusDidChange"
        }, {
            "name": "heatBlurDidChange",
            "method": "heatBlurDidChange"
        }, {
            "name": "heatOpacityDidChange",
            "method": "heatOpacityDidChange"
        }]; }
    static get style() { return "/**style-placeholder:warp-view-map:**/"; }
}
WarpViewMap.DEFAULT_HEIGHT = 600;
WarpViewMap.DEFAULT_WIDTH = 800;