import { FullScreenAdOptions } from '../../types';
import FullScreenAd from './FullScreenAd';
export default class InterstitialAd extends FullScreenAd {
    private constructor();
    /**
     * Creates a new InterstitialAd instance.
     * @param unitId The Ad Unit ID for the Interstitial Ad. You can find this on your Google AdMob dashboard.
     * @param options Optional FullScreenAdOptions for this ad.
     */
    static createAd(unitId: string, options?: FullScreenAdOptions): InterstitialAd;
}
