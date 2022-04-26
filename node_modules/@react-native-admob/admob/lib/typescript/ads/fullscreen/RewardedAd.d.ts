import { FullScreenAdOptions, RewardedAdEvent, RewardedAdHandlerType } from '../../types';
import FullScreenAd from './FullScreenAd';
export default class RewardedAd extends FullScreenAd<RewardedAdEvent, RewardedAdHandlerType> {
    private constructor();
    /**
     * Creates a new RewardedAd instance.
     * @param unitId The Ad Unit ID for the Rewarded Ad. You can find this on your Google AdMob dashboard.
     * @param options Optional FullScreenAdOptions for this ad.
     */
    static createAd(unitId: string, options?: FullScreenAdOptions): RewardedAd;
}
