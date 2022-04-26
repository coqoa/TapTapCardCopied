import { AppOpenAdOptions, FullScreenAdEvent, FullScreenAdHandlerType, RequestOptions } from '../../types';
import FullScreenAd from './FullScreenAd';
export default class AppOpenAd extends FullScreenAd {
    private constructor();
    private static sharedInstance;
    private static checkInstance;
    /**
     * Creates a AppOpenAd instance. Ad is loaded automatically after created and after dismissed.
     * @param unitId The Ad Unit ID for the App Open Ad. You can find this on your Google AdMob dashboard.
     * @param options Optional AppOpenAdOptions object.
     */
    static createAd(unitId: string, options?: AppOpenAdOptions): AppOpenAd;
    /**
     * Returns loaded App Open Ad instance.
     */
    static getAd(): AppOpenAd | null;
    /**
     * Loads a new App Open ad.
     * @param requestOptions Optional RequestOptions used to load the ad.
     */
    static load(requestOptions?: RequestOptions): Promise<void>;
    /**
     * Shows loaded App Open Ad.
     */
    static show(): Promise<void>;
    /**
     * Destroys the App Open Ad.
     */
    static destroy(): void;
    /**
     * Sets RequestOptions for this Ad instance.
     * @param requestOptions RequestOptions used to load the ad.
     */
    static setRequestOptions(requestOptions?: RequestOptions): void;
    /**
     * Adds an event handler for an ad event.
     * @param event Event name
     * @param handler Event handler
     */
    static addEventListener(event: FullScreenAdEvent, handler: FullScreenAdHandlerType): {
        remove: () => void;
    };
    /**
     * Removes all registered event handlers for this ad.
     */
    static removeAllListeners(): void;
}
