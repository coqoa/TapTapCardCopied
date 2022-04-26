import { Component } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { BannerAdProps, GAMBannerAdProps } from '../../types';
interface BannerAdState {
    style: StyleProp<ViewStyle>;
}
export declare const RNAdMobBannerView: import("react-native").HostComponent<GAMBannerAdProps>;
declare abstract class BaseAd<T extends BannerAdProps | GAMBannerAdProps> extends Component<T> {
    state: BannerAdState;
    bannerRef: import("react").RefObject<unknown>;
    loadAd(): void;
    protected handleSizeChange(event: any): void;
    protected handleOnAdLoaded(): void;
    protected handleOnAdFailedToLoad(event: any): void;
    protected handleOnAdOpened(): void;
    protected handleOnAdClosed(): void;
}
export default BaseAd;
