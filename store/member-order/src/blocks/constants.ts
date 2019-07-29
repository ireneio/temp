// typescript definition
export interface AllpayType {
  Credit: boolean;
  WebATM: boolean;
  ATM: boolean;
  CVS: boolean;
  BARCODE: boolean;
}

export interface EzpayType {
  Credit: boolean;
  CS: boolean;
  ATM: boolean;
  WebATM: boolean;
  MMK: boolean;
}

// definition
export const PAYMENT_SHOW_MEMO = {
  allpay: {
    Credit: true,
    WebATM: false,
    ATM: true,
    CVS: true,
    BARCODE: true,
  },
  ezpay: {
    Credit: true,
    CS: false,
    ATM: false,
    WebATM: false,
    MMK: true,
  },
};
