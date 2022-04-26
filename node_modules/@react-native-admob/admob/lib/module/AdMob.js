import { NativeModules } from 'react-native';
const RNAdMobAdManager = NativeModules.RNAdMob;
/**
 * Initializes Mobile Ads SDK.
 * @deprecated since version 1.2.0, SDK is initialized automatically. Use `getInitializationStatus` instead if you need to get adapters' initialization status.
 * @returns Promise of each mediation adapter's initialization status
 */

async function initialize() {
  return getInitializationStatus();
}
/**
 * Get Mobile Ads SDK initialization status.
 * @returns Promise of each mediation adapter's initialization status
 */


async function getInitializationStatus() {
  return RNAdMobAdManager.getInitializationStatus();
}
/**
 * Sets ads request configuration to be applied globally.
 * @param config `RequestConfiguration` object
 */


function setRequestConfiguration(config) {
  RNAdMobAdManager.setRequestConfiguration(config || {});
}
/**
 * Checks if the current device is registered as a test device to show test ads.
 * @returns Promise of boolean weather current device is a test device
 */


async function isTestDevice() {
  return RNAdMobAdManager.isTestDevice();
}

export default {
  initialize,
  getInitializationStatus,
  setRequestConfiguration,
  isTestDevice
};
//# sourceMappingURL=AdMob.js.map