"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FullScreenAd = _interopRequireDefault(require("./FullScreenAd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _rewardedInterstitialRequest = 0;

class RewardedInterstitialAd extends _FullScreenAd.default {
  constructor(requestId, unitId, options) {
    super('RewardedInterstitial', requestId, unitId, options);
  }
  /**
   * Creates a new RewardedInterstitialAd instance.
   * @param unitId The Ad Unit ID for the Rewarded Interstitial Ad. You can find this on your Google AdMob dashboard.
   * @param options Optional FullScreenAdOptions for this ad.
   */


  static createAd(unitId, options) {
    const requestId = _rewardedInterstitialRequest++;
    return new RewardedInterstitialAd(requestId, unitId, options);
  }

}

exports.default = RewardedInterstitialAd;
//# sourceMappingURL=RewardedInterstitialAd.js.map