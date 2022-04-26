"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FullScreenAd = _interopRequireDefault(require("./FullScreenAd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let _rewardedRequest = 0;

class RewardedAd extends _FullScreenAd.default {
  constructor(requestId, unitId, options) {
    super('Rewarded', requestId, unitId, options);
  }
  /**
   * Creates a new RewardedAd instance.
   * @param unitId The Ad Unit ID for the Rewarded Ad. You can find this on your Google AdMob dashboard.
   * @param options Optional FullScreenAdOptions for this ad.
   */


  static createAd(unitId, options) {
    const requestId = _rewardedRequest++;
    return new RewardedAd(requestId, unitId, options);
  }

}

exports.default = RewardedAd;
//# sourceMappingURL=RewardedAd.js.map