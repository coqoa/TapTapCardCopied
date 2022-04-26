"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RNAdMobBannerView = void 0;

var _react = require("react");

var _reactNative = require("react-native");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const RNAdMobBannerView = (0, _reactNative.requireNativeComponent)('RNAdMobBannerView');
exports.RNAdMobBannerView = RNAdMobBannerView;

class BaseAd extends _react.Component {
  constructor() {
    super(...arguments);

    _defineProperty(this, "state", {
      style: {
        width: 0,
        height: 0
      }
    });

    _defineProperty(this, "bannerRef", /*#__PURE__*/(0, _react.createRef)());
  }

  loadAd() {
    _reactNative.UIManager.dispatchViewManagerCommand( //@ts-expect-error
    (0, _reactNative.findNodeHandle)(this.bannerRef), 'requestAd', undefined);
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

var _default = BaseAd;
exports.default = _default;
//# sourceMappingURL=BaseAd.js.map