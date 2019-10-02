// typescript import
import {
  InMemoryCache,
  ApolloClient,
  NormalizedCacheObject,
} from 'apollo-boost';

// typescript definition
export interface ContextType {
  cache: InMemoryCache;
  client: ApolloClient<NormalizedCacheObject>;
}

// definition
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

// TODO: should remove
export const COUNTRIES = [
  /* eslint-disable @typescript-eslint/camelcase */
  {
    zh_TW: '台灣',
    en_US: 'Taiwan',
    ja_JP: '台湾',
    vi_VN: 'Đài Loan',
  },
  {
    zh_TW: '日本',
    en_US: 'Japan',
    ja_JP: '日本',
    vi_VN: 'Nhật Bản',
  },
  {
    zh_TW: '韓國',
    en_US: 'Korea',
    ja_JP: '大韓民国',
    vi_VN: 'Hàn Quốc',
  },
  {
    zh_TW: '中國',
    en_US: 'China',
    ja_JP: '中華人民共和国',
    vi_VN: 'Trung Quốc',
  },
  {
    zh_TW: '香港',
    en_US: 'Hong Kong',
    ja_JP: '香港',
    vi_VN: 'Hồng Kong',
  },
  {
    zh_TW: '馬來西亞',
    en_US: 'Malaysia',
    ja_JP: 'マレーシア',
    vi_VN: 'Ma lai xi a',
  },
  {
    zh_TW: '越南',
    en_US: 'Vietnam',
    ja_JP: 'ベトナム',
    vi_VN: 'Việt Nam',
  },
  {
    zh_TW: '泰國',
    en_US: 'Thailand',
    ja_JP: 'タイ',
    vi_VN: 'Thái Lan',
  },
  {
    zh_TW: '菲律賓',
    en_US: 'Philippines',
    ja_JP: 'フィリピン',
    vi_VN: 'Philipin',
  },
  {
    zh_TW: '新加坡',
    en_US: 'Singapore',
    ja_JP: 'シンガポール',
    vi_VN: 'Singapo',
  },
  {
    zh_TW: '印度尼西亞',
    en_US: 'Indonesia',
    ja_JP: 'インドネシア',
    vi_VN: 'Indonesia',
  },
  {
    zh_TW: '德國',
    en_US: 'Germany',
    ja_JP: 'ドイツ',
    vi_VN: 'Đức',
  },
  {
    zh_TW: '英國',
    en_US: 'United Kingdom',
    ja_JP: 'イギリス',
    vi_VN: 'Anh',
  },
  {
    zh_TW: '澳洲',
    en_US: 'Australia',
    ja_JP: 'オーストラリア',
    vi_VN: 'Úc',
  },
  {
    zh_TW: '俄羅斯',
    en_US: 'Russia',
    ja_JP: 'ロシア',
    vi_VN: 'Nga',
  },
  {
    zh_TW: '法國',
    en_US: 'France',
    ja_JP: 'フランス',
    vi_VN: 'Pháp',
  },
  {
    zh_TW: '美國',
    en_US: 'U.S.A.',
    ja_JP: 'アメリカ',
    vi_VN: 'Hoa Kỳ',
  },
  {
    zh_TW: '奧地利',
    en_US: 'Austria',
    ja_JP: 'オーストリア',
    vi_VN: 'Áo',
  },
  {
    zh_TW: '義大利',
    en_US: 'Italy',
    ja_JP: 'イタリア',
    vi_VN: 'Ý Đại Lợi',
  },
  {
    zh_TW: '其他',
    en_US: 'Other',
    ja_JP: 'その他',
    vi_VN: 'Nước khác',
  },
  /* eslint-enable @typescript-eslint/camelcase */
].map(country => ({
  __typename: 'Country',
  id: country.en_US,
  name: {
    ...country,
    __typename: 'Locale',
  },
  cities: [],
}));
