import React, { useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';
import AppOpenAdContext from './AppOpenAdContext';
import { AppOpenAd } from './fullscreen';

const AppOpenAdProvider = _ref => {
  let {
    unitId,
    options = {},
    children
  } = _ref;
  const [appOpenAd, setAppOpenAd] = useState(null);
  useDeepCompareEffect(() => {
    if (AppOpenAd.getAd()) {
      AppOpenAd.destroy();
    }

    setAppOpenAd(unitId ? AppOpenAd.createAd(unitId, options) : null);
  }, [unitId, options]);
  return /*#__PURE__*/React.createElement(AppOpenAdContext.Provider, {
    value: {
      unitId,
      options,
      appOpenAd
    }
  }, children);
};

export default AppOpenAdProvider;
//# sourceMappingURL=AppOpenAdProvider.js.map