/// <reference types="react" />
import { GAMBannerAdProps } from '../../types';
import BaseAd from './BaseAd';
declare class GAMBannerAd extends BaseAd<GAMBannerAdProps> {
    protected handleOnAppEvent(event: any): void;
    render(): JSX.Element;
}
export default GAMBannerAd;
