"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAppOpenAd;

var _react = require("react");

var _AppOpenAdContext = _interopRequireDefault(require("../ads/AppOpenAdContext"));

var _useFullScreenAd = _interopRequireDefault(require("./useFullScreenAd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * React Hook for AdMob App Open Ad.
 * Must be created inside `AppOpenAdProvider`.
 */
function useAppOpenAd() {
  const appOpenAdContext = (0, _react.useContext)(_AppOpenAdContext.default);

  if (!appOpenAdContext) {
    throw new Error('AppOpenAdProvider is not found. You should wrap your components with AppOpenProvider to use useAppOpenAd hook.');
  }

  return (0, _useFullScreenAd.default)(appOpenAdContext.appOpenAd);
}
//# sourceMappingURL=useAppOpenAd.js.map