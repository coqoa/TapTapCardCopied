import { FullScreenAdOptions, RewardedAdEvent, RewardedAdHandlerType } from '../../types';
import FullScreenAd from './FullScreenAd';
export default class RewardedInterstitialAd extends FullScreenAd<RewardedAdEvent, RewardedAdHandlerType> {
    private constructor();
    /**
     * Creates a new RewardedInterstitialAd instance.
     * @param unitId The Ad Unit ID for the Rewarded Interstitial Ad. You can find this on your Google AdMob dashboard.
     * @param options Optional FullScreenAdOptions for this ad.
     */
    static createAd(unitId: string, options?: FullScreenAdOptions): RewardedInterstitialAd;
}
