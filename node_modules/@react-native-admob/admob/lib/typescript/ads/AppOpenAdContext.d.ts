import * as React from 'react';
import { AppOpenAdOptions } from '../types';
import { AppOpenAd } from './fullscreen';
interface AppOpenAdContextState {
    unitId: string | null;
    options?: AppOpenAdOptions;
    appOpenAd: AppOpenAd | null;
}
/**
 * Context which holds the App Open Ad.
 */
declare const AppOpenAdContext: React.Context<AppOpenAdContextState | undefined>;
export default AppOpenAdContext;
