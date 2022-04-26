import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { RewardedInterstitialAd } from '../ads/fullscreen';
import useFullScreenAd from './useFullScreenAd';
/**
 * React Hook for AdMob Rewarded Interstitial Ad.
 * @param unitId Rewarded Interstitial Ad Unit Id
 * @param options `FullScreenAdOptions`
 */

export default function useRewardedInterstitialAd(unitId) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [rewardedInterstitialAd, setRewardedInterstitialAd] = useState(null);
  useDeepCompareEffect(() => {
    setRewardedInterstitialAd(prevAd => {
      prevAd === null || prevAd === void 0 ? void 0 : prevAd.destroy();
      return unitId ? RewardedInterstitialAd.createAd(unitId, options) : null;
    });
  }, [unitId, options]);
  return useFullScreenAd(rewardedInterstitialAd);
}
//# sourceMappingURL=useRewardedInterstitialAd.js.map