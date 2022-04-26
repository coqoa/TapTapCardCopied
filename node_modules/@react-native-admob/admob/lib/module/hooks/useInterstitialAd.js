import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { InterstitialAd } from '../ads/fullscreen';
import useFullScreenAd from './useFullScreenAd';
/**
 * React Hook for AdMob Interstitial Ad.
 * @param unitId Interstitial Ad Unit Id
 * @param options `FullScreenAdOptions`
 */

export default function useInterstitialAd(unitId) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [interstitialAd, setInterstitialAd] = useState(null);
  useDeepCompareEffect(() => {
    setInterstitialAd(prevAd => {
      prevAd === null || prevAd === void 0 ? void 0 : prevAd.destroy();
      return unitId ? InterstitialAd.createAd(unitId, options) : null;
    });
  }, [unitId, options]);
  return useFullScreenAd(interstitialAd);
}
//# sourceMappingURL=useInterstitialAd.js.map