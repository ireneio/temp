import PropTypes from 'prop-types';
import {
  isUUID,
  isNumeric,
  isURL,
  isHexColor,
  isInt,
  isFloat,
  isEmail,
} from 'validator';

import buildPropTypes from 'utils/buildPropTypes';

import { PAPER_TYPE, ELECYTONIC_TYPE } from './invoice';
import * as ISLOGIN from './isLogin';

/** normal propTypes */

/** test uuid */
export const ID_TYPE = buildPropTypes('id', value => isUUID(value));

/** test fbID */
export const FB_ID_TYPE = buildPropTypes(
  'fb id',
  value => isNumeric(value),
  'number',
);

/** test
 * https://www.meepshop.com/,
 * www.meepshop.com,
 * /path
 */
export const URL_TYPE = buildPropTypes('url', value =>
  isURL(value, { require_host: false }),
);

/** test #hashTag */
export const HASH_TYPE = buildPropTypes('hash', value => /^#/.test(value));

/** test test@meepshop.com */
export const EMAIL_TYPE = buildPropTypes('email', value => isEmail(value));

/** testRandom
 * picsum.photos/600/300,
 * picsum.photos/200/550,
 * picsum.photos/400/600
 */
export const IMAGE_TYPE = buildPropTypes('url', value =>
  isURL(value, { require_host: false }),
);

export const GALLERY_IMAGE_TYPE = PropTypes.shape({
  id: ID_TYPE.isRequired,
  isMain: PropTypes.bool.isRequired,
  src: URL_TYPE,
});

/** testRandom
 * #ffffff,
 * #000000,
 * #99FF99,
 * inherit,
 * initial
 */
export const COLOR_TYPE = buildPropTypes(
  'color',
  value => ['inherit', 'initial'].includes(value) || isHexColor(value),
);

/** testRandom 0, 0.5, 1 */
export const OPACITY_TYPE = buildPropTypes(
  'range',
  value => isFloat(value, { min: 0, max: 1 }),
  'float',
);

/** testRandom
 * 100,
 * 90,
 * 80,
 * 70,
 * 60,
 * 50,
 * 40,
 * 30,
 * 20,
 * 10
 */
export const CONTENT_WIDTH_TYPE = buildPropTypes(
  'content width',
  value => isInt(value, { gt: 0, max: 100 }),
  'number',
);

/** testRandom
 * 999,
 * 150,
 * 100,
 * 50,
 * 10,
 * 0
 */
export const PURCHASE_ITEMS_TYPE = buildPropTypes(
  'purchase items',
  value => isInt(value, { min: 0, max: 999 }),
  'number',
);

/** testRandom
 * 1000,
 * 500,
 * 100,
 * 50,
 * 10,
 * 0
 */
export const POSITIVE_NUMBER_TYPE = buildPropTypes(
  'positive number',
  value => isInt(value, { min: 0 }),
  'number',
);

/** testRandom 0, 0.5, 1 */
export const POSITIVE_FLOAT_TYPE = buildPropTypes(
  'positive float',
  value => isFloat(value, { min: 0 }),
  'number',
);

/** test oneOfLocale */
export const ONE_OF_LOCALE_TYPE = PropTypes.oneOf([
  'zh_TW',
  'en_US',
  'ja_JP',
  'vi_VN',
  'fr_FR',
  'es_ES',
  'th_TH',
  'id_ID',
]);

export const FB_ACCOUNT_TYPE = PropTypes.oneOf(['fanPageId', 'personal']);

export const ALIGNMENT_TYPE = PropTypes.oneOf(['left', 'center', 'right']);

export const PAYMENT_TEMPLATE_TYPE = PropTypes.oneOf([
  'allpay',
  'hitrust',
  'gmo',
  'cathay',
  'chinatrust',
  'paypal',
  'custom',
]);

export const SHIPMENT_TEMPLATE_TYPE = PropTypes.oneOf([
  'ezship',
  'gmo',
  'allpay',
  'blackcat',
  'others',
]);

/**
 * testJSON [{
 *   "en_US": "en_US",
 *   "zh_TW": "zh_TW",
 *   "ja_JP": "ja_JP",
 *   "vi_VN": "vi_VN"
 * }]
 */
export const LOCALE_TYPE = PropTypes.shape(
  [
    'en_US',
    'zh_TW',
    'ja_JP',
    'vi_VN',
    'fr_FR',
    'es_ES',
    'th_TH',
    'id_ID',
  ].reduce(
    (result, locale) => ({
      ...result,
      [locale]: PropTypes.string.isRequired,
    }),
    {},
  ),
);

/** context propTypes */
export const ISLOGIN_TYPE = PropTypes.oneOf(
  Object.keys(ISLOGIN).map(key => ISLOGIN[key]),
);

export const CUSTOM_TRACKING_TYPE = PropTypes.shape({
  status: PropTypes.bool.isRequired,
  eventLabel: PropTypes.string.isRequired,
  eventCategory: PropTypes.shape({
    status: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
});

export const STORE_SETTING_TYPE = PropTypes.shape({
  logoUrl: URL_TYPE,
  mobileLogoUrl: URL_TYPE,
  invoice: PropTypes.shape({
    paper: PAPER_TYPE.reduce(
      (result, key) => ({
        ...result,
        [key]: PropTypes.shape({
          isEnabled: PropTypes.bool.isRequired,
        }).isRequired,
      }),
      {},
    ),
    electronic: PropTypes.shape({
      isEnabled: PropTypes.bool.isRequired,
      type: PropTypes.oneOf(ELECYTONIC_TYPE).isRequired,
    }),
  }).isRequired,
  storeName: PropTypes.string.isRequired,
});

/** TODO remove */
export const CONTEXT_TYPES = {
  /** context variables from props */
  cname: PropTypes.string,
  isLogin: ISLOGIN_TYPE.isRequired,
  storeSetting: STORE_SETTING_TYPE.isRequired,
  colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  locale: ONE_OF_LOCALE_TYPE.isRequired,
  carts: PropTypes.shape({}).isRequired,
  cartLoading: PropTypes.bool.isRequired,
  upsertCart: PropTypes.func.isRequired,

  /** context func from DecoratorsRoot */
  hasStoreAppPlugin: PropTypes.func.isRequired,
  transformCurrency: PropTypes.func.isRequired,
};
