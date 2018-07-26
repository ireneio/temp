import PropTypes from 'prop-types';
import isUUID from 'validator/lib/isUUID';
import isURL from 'validator/lib/isURL';
import isHexColor from 'validator/lib/isHexColor';
import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import isEmail from 'validator/lib/isEmail';

import * as COUNTRY_LOCALE from 'locale/country';
import buildPropTypes from 'utils/buildPropTypes';

import LOCALE from './locale';
import CURRENCY from './currency';
import INVOICE from './invoice';
import * as ISLOGIN from './isLogin';

/**
 * normal propTypes
 *
 * Do not use "buildPropTypes('id', validator)",
 * because "validator" maybe have options.
 */
export const ID_TYPE = buildPropTypes('id', value => isUUID(value));
export const FB_ID_TYPE = buildPropTypes('fb id', value =>
  /[0-9_]+/.test(value),
);
export const URL_TYPE = buildPropTypes('url', value =>
  isURL(value, { require_host: false }),
);
export const EMAIL_TYPE = buildPropTypes('email', value => isEmail(value));
export const COLOR_TYPE = buildPropTypes(
  'color',
  value => ['inherit', 'initial'].includes(value) || isHexColor(value),
);
export const OPACITY_TYPE = buildPropTypes('range', value =>
  isFloat(value, { min: 0, max: 1 }),
);
export const CONTENT_WIDTH_TYPE = buildPropTypes('content width', value =>
  isInt(value, { min: 0, max: 100 }),
);
export const PURCHASE_ITEMS_TYPE = buildPropTypes('purchase items', value =>
  isInt(value, { min: 0, max: 999 }),
);
export const POSITIVE_NUMBER_TYPE = buildPropTypes('positive number', value =>
  isFloat(value, { min: 0 }),
);
export const ONE_OF_LOCALE_TYPE = PropTypes.oneOf(LOCALE);
export const ONE_OF_CURRENCY_TYPE = PropTypes.oneOf(CURRENCY);

export const FB_ACCOUNT_TYPE = PropTypes.oneOf(['fanPageId', 'personal']);

export const ALIGNMENT_TYPE = PropTypes.oneOf(['left', 'center', 'right']);

export const PAYMENT_TEMPLATE_TYPE = PropTypes.oneOf([
  'allpay',
  'gmo',
  'hitrust',
  'ezpay',
  'custom',
]);

export const SHIPMENT_TEMPLATE_TYPE = PropTypes.oneOf([
  'ezship',
  'gd',
  'gmo',
  'allpay',
  'blackcat',
  'others',
]);

export const COUNTRY_TYPE = PropTypes.oneOf(
  Object.keys(COUNTRY_LOCALE).map(key => COUNTRY_LOCALE[key].zh_TW),
);

/** context propTypes */
export const LOCALE_TYPE = PropTypes.shape(
  LOCALE.reduce(
    (result, locale) => ({
      ...result,
      [locale]: PropTypes.string.isRequired,
    }),
    {},
  ),
);

export const ISLOGIN_TYPE = PropTypes.oneOf(
  Object.keys(ISLOGIN).map(key => ISLOGIN[key]),
);

export const LOCATION_TYPE = PropTypes.shape({
  href: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
});

export const USER_TYPE = PropTypes.shape({
  name: PropTypes.string,
  email: EMAIL_TYPE.isRequired,
  mobile: PropTypes.string,
  groupName: PropTypes.string.isRequired,
  recipientData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      mobile: PropTypes.string.isRequired,
      address: PropTypes.shape({
        yahooCode: PropTypes.shape({
          country: PropTypes.string.isRequired,
          city: PropTypes.string,
          county: PropTypes.string,
          street: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  ),
});

export const STORE_SETTING_TYPE = PropTypes.shape({
  activityVersion: PropTypes.oneOf([2]),
  logoUrl: URL_TYPE,
  mobileLogoUrl: URL_TYPE,
  invoice: PropTypes.shape(
    INVOICE.reduce(
      (result, key) => ({
        ...result,
        [key]: PropTypes.shape({
          status: PropTypes.bool.isRequired,
        }).isRequired,
      }),
      {},
    ),
  ).isRequired,
  storeName: PropTypes.string.isRequired,
});

export const CONTEXT_TYPES = {
  /** context variables from props */
  user: USER_TYPE,
  cname: PropTypes.string,
  isLogin: ISLOGIN_TYPE.isRequired,
  storeSetting: STORE_SETTING_TYPE.isRequired,
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  locale: ONE_OF_LOCALE_TYPE.isRequired,
  customerCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
  location: LOCATION_TYPE.isRequired,

  /** context func from props */
  setLocale: PropTypes.func.isRequired,
  setCustomerCurrency: PropTypes.func.isRequired,
  adTrack: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  fbLogin: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  forgetPassword: PropTypes.func.isRequired,
  addCartItems: PropTypes.func.isRequired,
  updateCartItems: PropTypes.func.isRequired,
  removeCartItems: PropTypes.func.isRequired,
  getApiUrl: PropTypes.func.isRequired,
  dispatchAction: PropTypes.func.isRequired,

  /** context variables from DecoratorsRoot */
  isShowCart: PropTypes.bool.isRequired,

  /** context func from DecoratorsRoot */
  hasStoreAppPlugin: PropTypes.func.isRequired,
  toggleCart: PropTypes.func.isRequired,
  transformLocale: PropTypes.func.isRequired,
  transformCurrency: PropTypes.func.isRequired,
};
