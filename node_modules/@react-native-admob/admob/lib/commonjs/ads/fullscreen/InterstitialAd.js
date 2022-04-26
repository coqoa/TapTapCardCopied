"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FullScreenAd = _interopRequireDefault(require("./FullScreenAd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _interstitialRequest = 0;

class InterstitialAd extends _FullScreenAd.default {
  constructor(requestId, unitId, options) {
    super('Interstitial', requestId, unitId, options);
  }
  /**
   * Creates a new InterstitialAd instance.
   * @param unitId The Ad Unit ID for the Interstitial Ad. You can find this on your Google AdMob dashboard.
   * @param options Optional FullScreenAdOptions for this ad.
   */


  static createAd(unitId, options) {
    const requestId = _interstitialRequest++;
    return new InterstitialAd(requestId, unitId, options);
  }

}

exports.default = InterstitialAd;
//# sourceMappingURL=InterstitialAd.js.map