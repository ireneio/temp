// import
import { languages } from '@meepshop/utils/lib/i18n';

// definition
// TODO: should use enum or union type
export const ACION_TYPES = [
  'EMPTY',
  'PAGE_URL',
  'CUSTOM_URL',
  'PRODUCTS_URL',
  'NOT_USED',
  'CART',
  'LOCALE',
  'CURRENCY',
  'MEMBER',
  'SEARCH_BAR',
  ...languages,
  'TWD',
  'USD',
  'CNY',
  'JPY',
  'EUR',
  'VND',
  'KRW',
  'HKD',
  'MYR',
  'ORDERS',
  'SETTINGS',
  'RECIPIENTS',
  'PASSWORD_CHANGE',
  'WISHLIST',
  'REWARD_POINTS',
  'LOGOUT',
];
