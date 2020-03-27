export const SHIPMENT_STORE_FIELDS = [
  'CVSStoreID',
  'CVSStoreName',
  'CVSAddress',
];

export const CONVENIENCE_STORE_FIELDS = ['cvsType', 'cvsCode'];

export const CONVENIENCE_STORE_SHIPMENT_TYPE_ENUM = type => {
  switch (type) {
    case 'allpay':
      return 'ECPAY';
    case 'ezship':
      return 'EZSHIP';
    default:
      return '';
  }
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
