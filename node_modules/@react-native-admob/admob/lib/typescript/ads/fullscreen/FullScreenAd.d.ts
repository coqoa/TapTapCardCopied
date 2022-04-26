import { AdType, AppOpenAdOptions, FullScreenAdEvent, FullScreenAdHandlerType, FullScreenAdOptions, RequestOptions, RewardedAdEvent, RewardedAdHandlerType } from '../../types';
export default class FullScreenAd<E extends RewardedAdEvent = FullScreenAdEvent, H extends RewardedAdHandlerType = FullScreenAdHandlerType> {
    readonly type: AdType;
    readonly requestId: number;
    readonly unitId: string;
    readonly options: FullScreenAdOptions | AppOpenAdOptions;
    private listeners;
    private nativeModule;
    protected constructor(type: AdType, requestId: number, unitId: string, options?: FullScreenAdOptions | AppOpenAdOptions);
    /**
     * Sets RequestOptions for this Ad instance.
     * @param requestOptions RequestOptions used to load the ad.
     */
    setRequestOptions(requestOptions?: RequestOptions): void;
    /**
     * Adds an event handler for an ad event.
     * @param event Event name
     * @param handler Event handler
     */
    addEventListener(event: E, handler: H): {
        remove: () => void;
    };
    /**
     * Removes all registered event handlers for this ad.
     */
    removeAllListeners(): void;
    /**
     * Loads a new Ad.
     * @param requestOptions Optional RequestOptions used to load the ad.
     */
    load(requestOptions?: RequestOptions): Promise<void>;
    /**
     * Shows loaded Ad.
     */
    show(): Promise<void>;
    /**
     * Destroys the Ad.
     */
    destroy(): void;
}
