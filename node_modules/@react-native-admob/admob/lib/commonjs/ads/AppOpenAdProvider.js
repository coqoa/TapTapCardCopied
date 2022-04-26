"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useDeepCompareEffect = _interopRequireDefault(require("use-deep-compare-effect"));

var _AppOpenAdContext = _interopRequireDefault(require("./AppOpenAdContext"));

var _fullscreen = require("./fullscreen");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const AppOpenAdProvider = _ref => {
  let {
    unitId,
    options = {},
    children
  } = _ref;
  const [appOpenAd, setAppOpenAd] = (0, _react.useState)(null);
  (0, _useDeepCompareEffect.default)(() => {
    if (_fullscreen.AppOpenAd.getAd()) {
      _fullscreen.AppOpenAd.destroy();
    }

    setAppOpenAd(unitId ? _fullscreen.AppOpenAd.createAd(unitId, options) : null);
  }, [unitId, options]);
  return /*#__PURE__*/_react.default.createElement(_AppOpenAdContext.default.Provider, {
    value: {
      unitId,
      options,
      appOpenAd
    }
  }, children);
};

var _default = AppOpenAdProvider;
exports.default = _default;
//# sourceMappingURL=AppOpenAdProvider.js.map