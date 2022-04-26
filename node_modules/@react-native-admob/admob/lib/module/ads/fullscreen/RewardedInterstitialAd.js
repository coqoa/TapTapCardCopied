import FullScreenAd from './FullScreenAd';
let _rewardedInterstitialRequest = 0;
export default class RewardedInterstitialAd extends FullScreenAd {
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
//# sourceMappingURL=RewardedInterstitialAd.js.map