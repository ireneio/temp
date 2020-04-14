export const SHIPMENT_STORE_FIELDS = [
  'CVSStoreID',
  'CVSStoreName',
  'CVSAddress',
];

export const CONVENIENCE_STORE_FIELDS = ['cvsType', 'cvsCode'];

export const ECPAY_SHIPMENT_TYPE_ENUM = type => {
  if (/C2C/.test(type)) return 'ECPAY_C2C';
  return 'ECPAY_B2C';
};

export const ECPAY_CONVENIENCE_STORE_TYPE_ENUM = type => {
  if (/UNIMART/.test(type)) return ['UNIMART'];
  if (/FAMI/.test(type)) return ['FAMI'];
  if (/HILIFE/.test(type)) return ['HILIFE'];

  return [];
};

export const EZSHIP_CONVENIENCE_STORE_TYPE_ENUM = ['FAMI', 'HILIFE', 'OK'];

export const INVOICE_SEARCH_LINK =
  'https://www.einvoice.nat.gov.tw/APCONSUMER/BTC603W/';
