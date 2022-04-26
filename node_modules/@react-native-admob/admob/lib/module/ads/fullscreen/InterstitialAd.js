import FullScreenAd from './FullScreenAd';
let _interstitialRequest = 0;
export default class InterstitialAd extends FullScreenAd {
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
//# sourceMappingURL=InterstitialAd.js.map