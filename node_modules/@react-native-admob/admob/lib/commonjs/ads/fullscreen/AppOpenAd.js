"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FullScreenAd = _interopRequireDefault(require("./FullScreenAd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const defaultOptions = {
  showOnColdStart: false,
  showOnAppForeground: true,
  loadOnDismissed: true,
  requestOptions: {}
};
let _appOpenRequest = 0;

class AppOpenAd extends _FullScreenAd.default {
  constructor(requestId, unitId, options) {
    super('AppOpen', requestId, unitId, options);
  }

  static checkInstance() {
    if (!this.sharedInstance) {
      throw new Error('AppOpenAd is not created.');
    }
  }
  /**
   * Creates a AppOpenAd instance. Ad is loaded automatically after created and after dismissed.
   * @param unitId The Ad Unit ID for the App Open Ad. You can find this on your Google AdMob dashboard.
   * @param options Optional AppOpenAdOptions object.
   */


  static createAd(unitId, options) {
    var _this$sharedInstance;

    const _options = { ...defaultOptions,
      ...options
    };
    (_this$sharedInstance = this.sharedInstance) === null || _this$sharedInstance === void 0 ? void 0 : _this$sharedInstance.destroy();
    const requestId = _appOpenRequest++;
    this.sharedInstance = new AppOpenAd(requestId, unitId, _options);
    return this.sharedInstance;
  }
  /**
   * Returns loaded App Open Ad instance.
   */


  static getAd() {
    return this.sharedInstance;
  }
  /**
   * Loads a new App Open ad.
   * @param requestOptions Optional RequestOptions used to load the ad.
   */


  static load(requestOptions) {
    this.checkInstance();
    return this.sharedInstance.load(requestOptions);
  }
  /**
   * Shows loaded App Open Ad.
   */


  static show() {
    this.checkInstance();
    return this.sharedInstance.show();
  }
  /**
   * Destroys the App Open Ad.
   */


  static destroy() {
    this.checkInstance();
    this.sharedInstance.destroy();
    this.sharedInstance = null;
  }
  /**
   * Sets RequestOptions for this Ad instance.
   * @param requestOptions RequestOptions used to load the ad.
   */


  static setRequestOptions(requestOptions) {
    this.checkInstance();
    return this.sharedInstance.setRequestOptions(requestOptions);
  }
  /**
   * Adds an event handler for an ad event.
   * @param event Event name
   * @param handler Event handler
   */


  static addEventListener(event, handler) {
    this.checkInstance();
    return this.sharedInstance.addEventListener(event, handler);
  }
  /**
   * Removes all registered event handlers for this ad.
   */


  static removeAllListeners() {
    this.checkInstance();
    return this.sharedInstance.removeAllListeners();
  }

}

exports.default = AppOpenAd;

_defineProperty(AppOpenAd, "sharedInstance", null);
//# sourceMappingURL=AppOpenAd.js.map