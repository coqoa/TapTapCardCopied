import React from 'react';
import { AppOpenAdOptions } from '../types';
export interface AppOpenAdProviderProps {
    unitId: string | null;
    options?: AppOpenAdOptions;
    children: React.ReactNode;
}
declare const AppOpenAdProvider: ({ unitId, options, children, }: AppOpenAdProviderProps) => JSX.Element;
export default AppOpenAdProvider;
