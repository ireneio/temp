import PropTypes from 'prop-types';

export const ISUSER = 'ISUSER';
export const NOTLOGIN = 'NOTLOGIN';
export const ISADMIN = 'ISADMIN';

// Currency exchange Rate
export const FXSETUP = {
  settings: {
    from: 'TWD',
  },
  rates: {
    EUR: 0.848022,
    HKD: 7.812797,
    USD: 1,
    TWD: 29.999,
    JPY: 112.15091667,
    VND: 22719.668992,
    KRW: 1089.2,
    MYR: 4.082967,
    CNY: 6.60745,
  },
  base: 'USD',
};

export const PAGE_TYPE = {
  id: PropTypes.string.isRequired,
};
