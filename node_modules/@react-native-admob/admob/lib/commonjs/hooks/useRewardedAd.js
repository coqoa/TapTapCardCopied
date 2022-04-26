"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useRewardedAd;

var _react = require("react");

var _useDeepCompareEffect = _interopRequireDefault(require("use-deep-compare-effect"));

var _fullscreen = require("../ads/fullscreen");

var _useFullScreenAd = _interopRequireDefault(require("./useFullScreenAd"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * React Hook for AdMob Rewarded Ad.
 * @param unitId Rewarded Ad Unit Id
 * @param options `FullScreenAdOptions`
 */
function useRewardedAd(unitId) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const [rewardedAd, setRewardedAd] = (0, _react.useState)(null);
  (0, _useDeepCompareEffect.default)(() => {
    setRewardedAd(prevAd => {
      prevAd === null || prevAd === void 0 ? void 0 : prevAd.destroy();
      return unitId ? _fullscreen.RewardedAd.createAd(unitId, options) : null;
    });
  }, [unitId, options]);
  return (0, _useFullScreenAd.default)(rewardedAd);
}
//# sourceMappingURL=useRewardedAd.js.map