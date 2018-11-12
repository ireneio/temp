import * as LOCALE from 'locales';

export default [
  {
    id: 'order-manager',
    title: LOCALE.ORDER,
    action: 2,
    params: { url: '/orders' },
    pages: [],
  },
  {
    id: 'member-info',
    title: LOCALE.SETTINGS,
    action: 2,
    params: { url: '/settings' },
    pages: [],
  },
  {
    id: 'recipienta',
    title: LOCALE.RECIPIENTS,
    action: 2,
    params: { url: '/recipients' },
    pages: [],
  },
  {
    id: 'change-password',
    title: LOCALE.CHANGE_PASSWORD,
    action: 2,
    params: { url: '/passwordChange' },
    pages: [],
  },
  {
    id: 'favorites',
    title: LOCALE.WISHLIST,
    action: 2,
    params: { url: '/wishlist' },
    pages: [],
  },
  {
    id: 'points',
    title: LOCALE.REWARD_POINTS,
    action: 2,
    params: { url: '/rewardPoints' },
    pages: [],
  },
  {
    id: 'logout',
    title: LOCALE.LOGOUT,
    action: 'logout',
    pages: [],
  },
];
