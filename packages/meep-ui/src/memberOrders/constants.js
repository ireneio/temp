export const PAYMENT_CAN_PAID_LATER = {
  allpay: {
    Credit: true,
    WebATM: true,
    ATM: false,
    CVS: false,
    BARCODE: false,
  },
  ezpay: {
    Credit: false,
    CS: false,
    ATM: false,
    WEBATM: false,
    MMK: false,
  },
  hitrust: true,
  gmo: false,
  custom: false,
};

export const MAX_ITEMS = 10;
