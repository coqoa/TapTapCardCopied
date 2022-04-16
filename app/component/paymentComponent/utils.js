import {
    QUOTAS,
    METHODS,
    METHODS_FOR_KCP,
    METHODS_FOR_UPLUS,
    METHODS_FOR_INICIS,
    METHODS_FOR_MOBILIANS,
    METHOD_FOR_CARD,
    METHOD_FOR_PHONE,
    METHOD_FOR_VBANK,
    METHOD_FOR_TRANS,
  } from './constants';
  
  function getQuotas(pg) {
    switch (pg) {
      case 'html5_inicis':
      case 'kcp': {
        return QUOTAS.concat([
          {
            value: 2,
            label: '2개월',
          },
          {
            value: 3,
            label: '3개월',
          },
          {
            value: 4,
            label: '4개월',
          },
          {
            value: 5,
            label: '5개월',
          },
          {
            value: 6,
            label: '6개월',
          },
        ]);
      }
      default:
        return QUOTAS;
    }
  }
  
  function getMethods(pg) {
    switch (pg) {
      case 'html5_inicis': {
        return METHODS_FOR_INICIS;
      }
      case 'kcp': {
        return METHODS_FOR_KCP;
      }
      case 'kcp_billing':
      case 'kakaopay':
      case 'kakao':
      case 'paypal':
      case 'payco':
      case 'smilepay':
      case 'chai':
      case 'alipay':
      case 'tosspay': {
        return METHOD_FOR_CARD;
      }
      case 'uplus': {
        return METHODS_FOR_UPLUS;
      }
      case 'danal': {
        return METHOD_FOR_PHONE;
      }
      case 'mobilians': {
        return METHODS_FOR_MOBILIANS;
      }
      case 'settle': {
        return METHOD_FOR_VBANK;
      }
      case 'payple': {
        return METHOD_FOR_TRANS;
      }
      default:
        return METHODS;
    }
  }
  
  function getUserCode(pg, tierCode, type = 'payment') {
    if (tierCode) {
      return 'imp19464697';
    }
    if (type === 'certification') {
      return 'imp10391932';
    }
  
    switch (pg) {
      case 'kakao':
        return 'TC0ONETIME';
      case 'paypal':
        return 'imp19464697';
      case 'mobilians':
        return 'imp19464697';
      case 'naverco':
      case 'naverpay':
        return 'imp19464697';
      case 'smilepay':
        return 'imp19464697';
      case 'chai':
        return 'imp19464697';
      case 'alipay':
        return 'imp19464697';
      case 'payple':
        return 'imp19464697';
      default:
        return 'imp19464697';
    }
  }
  
  export { getQuotas, getMethods, getUserCode };
  