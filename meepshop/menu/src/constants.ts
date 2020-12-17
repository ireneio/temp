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
  'WISH_LIST',
  'REWARD_POINTS',
  'LOGOUT',
];

export const DEFAULT_COLOR_WITH_PATTERN = [
  [1, 2, 4, 2, null, 4, 2, null],
  [1, 2, 1, 2, 2, 1, 2, 2],
  [1, 2, null, 2, 2, null, 2, 2],
  [1, 2, 4, 2, 4, 1, 2, 1],
] as const;

export const BUILTIN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
  },
  leftTop: {
    points: ['tl', 'bl'],
  },
  rightTop: {
    points: ['tl', 'bl'],
  },
};
