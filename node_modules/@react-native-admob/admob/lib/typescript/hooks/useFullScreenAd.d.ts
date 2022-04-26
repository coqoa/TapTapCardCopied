import { AppOpenAd, InterstitialAd, RewardedAd, RewardedInterstitialAd } from '../ads/fullscreen';
import { AdHookReturns } from '../types';
export default function useFullScreenAd<T extends InterstitialAd | RewardedAd | RewardedInterstitialAd | AppOpenAd | null>(ad: T): AdHookReturns;
