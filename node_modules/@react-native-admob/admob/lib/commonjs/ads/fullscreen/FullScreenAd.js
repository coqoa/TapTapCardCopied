"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactNative = require("react-native");

var _AdError = _interopRequireDefault(require("../../AdError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const RNAdMobEvent = _reactNative.NativeModules.RNAdMobEvent;
const eventEmitter = new _reactNative.NativeEventEmitter(RNAdMobEvent);
const defaultOptions = {
  loadOnMounted: true,
  showOnLoaded: false,
  loadOnDismissed: false,
  requestOptions: {}
};

class FullScreenAd {
  constructor(type, requestId, unitId, options) {
    _defineProperty(this, "type", void 0);

    _defineProperty(this, "requestId", void 0);

    _defineProperty(this, "unitId", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "listeners", void 0);

    _defineProperty(this, "nativeModule", void 0);

    this.type = type;
    this.requestId = requestId;
    this.unitId = unitId;
    this.listeners = [];
    this.options = type === 'AppOpen' ? options : { ...defaultOptions,
      ...options
    };
    this.nativeModule = _reactNative.NativeModules[`RNAdMob${type}Ad`];

    if (type === 'AppOpen' || this.options.loadOnMounted) {
      this.load().catch(() => {});
    }
  }
  /**
   * Sets RequestOptions for this Ad instance.
   * @param requestOptions RequestOptions used to load the ad.
   */


  setRequestOptions() {
    let requestOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    this.options.requestOptions = requestOptions;
  }
  /**
   * Adds an event handler for an ad event.
   * @param event Event name
   * @param handler Event handler
   */


  addEventListener(event, handler) {
    const eventHandler = e => {
      if (e.type === this.type && e.requestId === this.requestId) {
        if (event === 'adFailedToLoad' || event === 'adFailedToPresent') {
          // @ts-ignore
          handler(new _AdError.default(e.data.message, e.data.code));
        } else {
          handler(e.data);
        }
      }
    };

    const listener = eventEmitter.addListener(event, eventHandler);
    this.listeners.push(listener);
    return {
      remove: () => {
        listener.remove();
        const index = this.listeners.indexOf(listener);

        if (index > -1) {
          this.listeners.splice(index, 1);
        }
      }
    };
  }
  /**
   * Removes all registered event handlers for this ad.
   */


  removeAllListeners() {
    this.listeners.forEach(listener => listener.remove());
    this.listeners = [];
  }
  /**
   * Loads a new Ad.
   * @param requestOptions Optional RequestOptions used to load the ad.
   */


  async load() {
    let requestOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    const options = { ...this.options,
      ...{
        requestOptions
      }
    };

    try {
      return this.nativeModule.requestAd(this.requestId, this.unitId, options);
    } catch (error) {
      if (error.code === 'adFailedToLoad') {
        return Promise.reject(new _AdError.default(error.userInfo.message, error.userInfo.code));
      } else {
        return Promise.reject(error);
      }
    }
  }
  /**
   * Shows loaded Ad.
   */


  async show() {
    try {
      return this.nativeModule.presentAd(this.requestId);
    } catch (error) {
      if (error.code === 'adFailedToPresent') {
        return Promise.reject(new _AdError.default(error.userInfo.message, error.userInfo.code));
      } else {
        return Promise.reject(error);
      }
    }
  }
  /**
   * Destroys the Ad.
   */


  destroy() {
    this.removeAllListeners();
    this.nativeModule.destroyAd(this.requestId);
  }

}

exports.default = FullScreenAd;
//# sourceMappingURL=FullScreenAd.js.map