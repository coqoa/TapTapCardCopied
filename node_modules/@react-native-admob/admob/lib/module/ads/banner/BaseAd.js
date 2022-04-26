function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { Component, createRef } from 'react';
import { findNodeHandle, requireNativeComponent, UIManager } from 'react-native';
export const RNAdMobBannerView = requireNativeComponent('RNAdMobBannerView');

class BaseAd extends Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      style: {
        width: 0,
        height: 0
      }
    });

    _defineProperty(this, "bannerRef", /*#__PURE__*/createRef());
  }

  loadAd() {
    UIManager.dispatchViewManagerCommand( //@ts-expect-error
    findNodeHandle(this.bannerRef), 'requestAd', undefined);
  }

  handleSizeChange(event) {
    const {
      height,
      width
    } = event.nativeEvent;
    this.setState({
      style: {
        width,
        height
      }
    });

    if (this.props.onSizeChange) {
      this.props.onSizeChange({
        width,
        height
      });
    }
  }

  handleOnAdLoaded() {
    if (this.props.onAdLoaded) {
      this.props.onAdLoaded();
    }
  }

  handleOnAdFailedToLoad(event) {
    if (this.props.onAdFailedToLoad) {
      this.props.onAdFailedToLoad(event.nativeEvent);
    }
  }

  handleOnAdOpened() {
    if (this.props.onAdOpened) {
      this.props.onAdOpened();
    }
  }

  handleOnAdClosed() {
    if (this.props.onAdClosed) {
      this.props.onAdClosed();
    }
  }

}

export default BaseAd;
//# sourceMappingURL=BaseAd.js.map