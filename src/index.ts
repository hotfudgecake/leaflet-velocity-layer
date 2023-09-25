import * as L from 'leaflet';
import { type VelocityOptions } from './types';

const VelocityLayer: (new (options: VelocityOptions) => L.VelocityLayer) &
  typeof L.Class = L.Layer.extend({
  options: {
    displayValues: true,
    displayOptions: {
      velocityType: 'Velocity',
      position: 'bottomleft',
      emptyString: 'No velocity data',
      angleConvention: 'bearingCCW',
      speedUnit: 'm/s',
    },
    maxVelocity: 10, // used to align color scale
    colorScale: null,
    onAdd: null,
    onRemove: null,
    data: null,
    paneName: 'overlayPane',
  },

  _getOptions(): VelocityOptions {
    return this.options;
  },

  _getCanvas(): HTMLCanvasElement | undefined {
    return this._canvas;
  },

  initialize: function (options: VelocityOptions) {
    L.Util.setOptions(this, options);
  },

  _initCanvas() {
    this._canvas = L.DomUtil.create('canvas', 'leaflet-velocity');

    if (this._getOptions().opacity !== undefined) {
      this._updateOpacity();
    }
  },

  onAdd(map: L.Map) {
    this._map = map;

    const mapSize = this._map.getSize();

    if (this._canvas === undefined) this._initCanvas();

    this._canvas.width = mapSize.x;
    this._canvas.height = mapSize.y;

    const pane = this.getPane(this._getOptions().paneName);

    if (pane !== undefined) {
      this.getPane(this._getOptions().paneName).appendChild(this._getCanvas());
    }
  },

  _updateOpacity() {
    if (
      this._getCanvas() !== undefined &&
      this._getOptions().opacity !== undefined
    ) {
      this._getCanvas().style.opacity = this._getOptions().opacity;
    }
  },

  /* @section Extension methods
   * @uninheritable
   *
   * Every layer should extend from `L.Layer` and (re-)implement the following methods.
   *
   * @method onAdd(map: Map): this
   * Should contain code that creates DOM elements for the layer, adds them to `map panes` where they should belong and puts listeners on relevant map events. Called on [`map.addLayer(layer)`](#map-addlayer).
   *
   * @method onRemove(map: Map): this
   * Should contain all clean up code that removes the layer's elements from the DOM and removes listeners previously added in [`onAdd`](#layer-onadd). Called on [`map.removeLayer(layer)`](#map-removelayer).
   *
   * @method getEvents(): Object
   * This optional method should return an object like `{ viewreset: this._reset }` for [`addEventListener`](#evented-addeventlistener). The event handlers in this object will be automatically added and removed from the map with your layer.
   *
   * @method getAttribution(): String
   * This optional method should return a string containing HTML to be shown on the `Attribution control` whenever the layer is visible.
   *
   * @method beforeAdd(map: Map): this
   * Optional method. Called on [`map.addLayer(layer)`](#map-addlayer), before the layer is added to the map, before events are initialized, without waiting until the map is in a usable state. Use for early initialization only.
   */

  onRemove(map: L.Map) {},

  getEvents() {
    const events = {
      viewprereset: this._invalidateAll,
      viewreset: this._resetView,
      zoom: this._resetView,
      moveend: this._onMoveEnd,
    };

    return events;
  },

  _getValueAtLatLng() {},

  _update() {},
});

/* eslint-disable @typescript-eslint/no-explicit-any */
if (typeof window === 'object') {
  (window as any).VelocityLayer = VelocityLayer;
}
if (typeof self !== 'undefined') {
  (self as any).VelocityLayer = VelocityLayer;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

// const velocityLayer = function (options: VelocityOptions): L.VelocityLayer {
//   return new L.VelocityLayer(options);
// };

// L.velocityLayer = function (options: VelocityOptions): L.VelocityLayer {
//   return new L.VelocityLayer(options);
// };

export default VelocityLayer;
