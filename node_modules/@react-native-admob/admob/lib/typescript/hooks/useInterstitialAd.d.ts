import { AdHookReturns, FullScreenAdOptions } from '../types';
/**
 * React Hook for AdMob Interstitial Ad.
 * @param unitId Interstitial Ad Unit Id
 * @param options `FullScreenAdOptions`
 */
export default function useInterstitialAd(unitId: string | null, options?: FullScreenAdOptions): Omit<AdHookReturns, 'reward'>;
