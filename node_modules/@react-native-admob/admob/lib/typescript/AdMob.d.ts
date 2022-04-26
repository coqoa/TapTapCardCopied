import { InitializationStatus, RequestConfiguration } from './types';
/**
 * Initializes Mobile Ads SDK.
 * @deprecated since version 1.2.0, SDK is initialized automatically. Use `getInitializationStatus` instead if you need to get adapters' initialization status.
 * @returns Promise of each mediation adapter's initialization status
 */
declare function initialize(): Promise<InitializationStatus[]>;
/**
 * Get Mobile Ads SDK initialization status.
 * @returns Promise of each mediation adapter's initialization status
 */
declare function getInitializationStatus(): Promise<InitializationStatus[]>;
/**
 * Sets ads request configuration to be applied globally.
 * @param config `RequestConfiguration` object
 */
declare function setRequestConfiguration(config?: RequestConfiguration): void;
/**
 * Checks if the current device is registered as a test device to show test ads.
 * @returns Promise of boolean weather current device is a test device
 */
declare function isTestDevice(): Promise<boolean>;
declare const _default: {
    initialize: typeof initialize;
    getInitializationStatus: typeof getInitializationStatus;
    setRequestConfiguration: typeof setRequestConfiguration;
    isTestDevice: typeof isTestDevice;
};
export default _default;
