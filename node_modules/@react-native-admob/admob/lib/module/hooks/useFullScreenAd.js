import { useCallback, useEffect, useReducer } from 'react';
const initialState = {
  adLoaded: false,
  adPresented: false,
  adDismissed: false,
  adLoadError: undefined,
  adPresentError: undefined,
  reward: undefined
};
export default function useFullScreenAd(ad) {
  const [state, setState] = useReducer((prevState, newState) => ({ ...prevState,
    ...newState
  }), initialState);
  const adShowing = state.adPresented && !state.adDismissed;
  const load = useCallback(requestOptions => {
    if (ad) {
      setState(initialState);
      ad.load(requestOptions).catch(() => {});
    }
  }, [ad]);
  const show = useCallback(() => {
    if (ad) {
      ad.show().catch(() => {});
    }
  }, [ad]);
  useEffect(() => {
    setState(initialState);

    if (!ad) {
      return;
    }

    const listeners = [ad.addEventListener('adLoaded', () => setState({
      adLoaded: true
    })), ad.addEventListener('adFailedToLoad', error => setState({
      adLoadError: error
    })), ad.addEventListener('adPresented', () => setState({
      adPresented: true
    })), ad.addEventListener('adFailedToPresent', error => setState({
      adPresentError: error
    })), ad.addEventListener('adDismissed', () => {
      setState({
        adDismissed: true
      });

      if (ad.options.loadOnDismissed) {
        setState(initialState);
      }
    }), ad.type === 'Rewarded' || ad.type === 'RewardedInterstitial' ? ad.addEventListener('rewarded', reward => setState({
      reward
    })) : undefined];
    return () => {
      listeners.forEach(listener => listener === null || listener === void 0 ? void 0 : listener.remove());
    };
  }, [ad]);
  return { ...state,
    adShowing,
    load,
    show
  };
}
//# sourceMappingURL=useFullScreenAd.js.map