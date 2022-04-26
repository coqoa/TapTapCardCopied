import { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import { RewardedAd } from '../ads/fullscreen';
import useFullScreenAd from './useFullScreenAd';
/**
 * React Hook for AdMob Rewarded Ad.
 * @param unitId Rewarded Ad Unit Id
 * @param options `FullScreenAdOptions`
 */

export default function useRewardedAd(unitId) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [rewardedAd, setRewardedAd] = useState(null);
  useDeepCompareEffect(() => {
    setRewardedAd(prevAd => {
      prevAd === null || prevAd === void 0 ? void 0 : prevAd.destroy();
      return unitId ? RewardedAd.createAd(unitId, options) : null;
    });
  }, [unitId, options]);
  return useFullScreenAd(rewardedAd);
}
//# sourceMappingURL=useRewardedAd.js.map