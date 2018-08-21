import * as LOCALE from 'locales';

export default [
  {
    id: 'order-manager',
    title: LOCALE.ORDER,
    action: 2,
    params: { url: '/orders' },
  },
  {
    id: 'member-info',
    title: LOCALE.SETTINGS,
    action: 2,
    params: { url: '/settings' },
  },
  {
    id: 'recipienta',
    title: LOCALE.RECIPIENTS,
    action: 2,
    params: { url: '/recipients' },
  },
  {
    id: 'change-password',
    title: LOCALE.CHANGE_PASSWORD,
    action: 2,
    params: { url: '/passwordChange' },
  },
  {
    id: 'favorites',
    title: LOCALE.WISHLIST,
    action: 2,
    params: { url: '/wishlist' },
  },
  {
    id: 'points',
    title: LOCALE.REWARD_POINTS,
    action: 2,
    params: { url: '/rewardPoints' },
  },
  {
    id: 'logout',
    title: LOCALE.LOGOUT,
    action: 'logout',
  },
];
