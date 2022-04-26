function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { NativeEventEmitter, NativeModules } from 'react-native';
import AdError from '../../AdError';
const RNAdMobEvent = NativeModules.RNAdMobEvent;
const eventEmitter = new NativeEventEmitter(RNAdMobEvent);
const defaultOptions = {
  loadOnMounted: true,
  showOnLoaded: false,
  loadOnDismissed: false,
  requestOptions: {}
};
export default class FullScreenAd {
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
    this.nativeModule = NativeModules[`RNAdMob${type}Ad`];

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
          handler(new AdError(e.data.message, e.data.code));
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
        return Promise.reject(new AdError(error.userInfo.message, error.userInfo.code));
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
        return Promise.reject(new AdError(error.userInfo.message, error.userInfo.code));
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
//# sourceMappingURL=FullScreenAd.js.map