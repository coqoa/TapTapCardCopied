function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import BaseAd, { RNAdMobBannerView } from './BaseAd';

class GAMBannerAd extends BaseAd {
  handleOnAppEvent(event) {
    const {
      name,
      info
    } = event.nativeEvent;

    if (this.props.onAppEvent) {
      this.props.onAppEvent(name, info);
    }
  }

  render() {
    return /*#__PURE__*/React.createElement(RNAdMobBannerView, _extends({}, this.props, {
      style: [this.props.style, this.state.style],
      onAdLoaded: this.handleOnAdLoaded.bind(this),
      onAdFailedToLoad: this.handleOnAdFailedToLoad.bind(this),
      onAdOpened: this.handleOnAdOpened.bind(this),
      onAdClosed: this.handleOnAdClosed.bind(this),
      onAppEvent: this.handleOnAppEvent.bind(this),
      onSizeChange: this.handleSizeChange.bind(this),
      requestOptions: this.props.requestOptions || {},
      ref: el => {
        //@ts-expect-error
        this.bannerRef = el;
      }
    }));
  }

}

export default GAMBannerAd;
//# sourceMappingURL=GAMBannerAd.js.map