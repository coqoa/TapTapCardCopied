import { AdHookReturns } from '../types';
/**
 * React Hook for AdMob App Open Ad.
 * Must be created inside `AppOpenAdProvider`.
 */
export default function useAppOpenAd(): Omit<AdHookReturns, 'reward'>;
