import PropTypes from 'prop-types';
import { ID_TYPE, LOCALE_TYPE } from 'constants/propTypes';

export const mobileWidth = '(max-width: 768px)';

export const paymentShowMemo = {
  allpay: {
    Credit: 1,
    WebATM: 0,
    ATM: 1,
    CVS: 1,
    BARCODE: 1,
  },
  ezpay: {
    Credit: 1,
    CS: 0,
    ATM: 0,
    WebATM: 0,
    MMK: 1,
  },
  hitrust: 1,
  gmo: {
    Credit: 1,
    KIOSK: 0,
    ATM: 0,
  },
  custom: 0,
};

export const USER_TYPE = PropTypes.shape({
  email: PropTypes.string.isRequired,
  mobile: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});

export const ACTIVITY_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    id: ID_TYPE.isRequired,
    discountPrice: PropTypes.number.isRequired,
    plugin: PropTypes.string.isRequired,
    title: LOCALE_TYPE.isRequired,
  }),
);

export const PRICE_TYPE = PropTypes.shape({
  productPrice: PropTypes.number.isRequired,
  shipmentFee: PropTypes.number.isRequired,
  paymentFee: PropTypes.number.isRequired,
  adjust: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
});

export const INVOICE_TYPE = PropTypes.arrayOf(
  PropTypes.shape({
    type: PropTypes.oneOf(['PAPER', 'MANUL_ELECTRONIC', 'ECPAY_ELECTRONIC'])
      .isRequired,
    method: PropTypes.oneOf(['DUPLICATE', 'TRIPLICATE', 'CARRIER', 'DONATION'])
      .isRequired,
    carrier: PropTypes.shape({
      type: PropTypes.oneOf([
        'MEMBERSHIP',
        'MOBILE_BARCODE',
        'CITIZEN_DIGITAL_CERTIFICATE',
      ]),
      code: PropTypes.string,
    }),
    code: PropTypes.string,
    issuedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.oneOf([
      'WAITING',
      'ISSUED',
      'DELAYING',
      'INVALID',
      'FAILED',
      'CANCELED',
    ]),
    title: PropTypes.string,
    ban: PropTypes.string,
    address: PropTypes.string,
    loveCode: PropTypes.string,
  }),
);
