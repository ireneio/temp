export const SHIPMENT_STORE_FIELDS = [
  'CVSStoreID',
  'CVSStoreName',
  'CVSAddress',
];

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

export const ID_NUMBER_CITY_CODE = [
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '34',
  '18',
  '19',
  '20',
  '21',
  '22',
  '35',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '32',
  '30',
  '31',
  '33',
];

export const ID_NUMBER_WEIGHTED = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];

export const INVOICE_SEARCH_LINK =
  'https://www.einvoice.nat.gov.tw/APCONSUMER/BTC603W/';

export const EZSHIP_LINK = 'https://map.ezship.com.tw/ezship_map_web.jsp';
