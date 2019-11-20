// TODO: remove after remove transformLocale
/* eslint-disable camelcase */
import zh_TW from 'public/locales/zh_TW/common.json';
import en_US from 'public/locales/en_US/common.json';
import ja_JP from 'public/locales/ja_JP/common.json';
import vi_VN from 'public/locales/vi_VN/common.json';
/* eslint-enable camelcase */

export default [
  {
    id: 'order-manager',
    title: {
      TODO_LOCALE: true,
      zh_TW: zh_TW.title.order,
      en_US: en_US.title.order,
      ja_JP: ja_JP.title.order,
      vi_VN: vi_VN.title.order,
    },
    action: 2,
    params: { url: '/orders' },
    pages: [],
  },
  {
    id: 'member-info',
    title: {
      TODO_LOCALE: true,
      zh_TW: zh_TW.title.settings,
      en_US: en_US.title.settings,
      ja_JP: ja_JP.title.settings,
      vi_VN: vi_VN.title.settings,
    },
    action: 2,
    params: { url: '/settings' },
    pages: [],
  },
  {
    id: 'recipienta',
    title: {
      TODO_LOCALE: true,
      zh_TW: zh_TW.title.recipients,
      en_US: en_US.title.recipients,
      ja_JP: ja_JP.title.recipients,
      vi_VN: vi_VN.title.recipients,
    },
    action: 2,
    params: { url: '/recipients' },
    pages: [],
  },
  {
    id: 'change-password',
    title: {
      TODO_LOCALE: true,
      zh_TW: zh_TW.title['change-password'],
      en_US: en_US.title['change-password'],
      ja_JP: ja_JP.title['change-password'],
      vi_VN: vi_VN.title['change-password'],
    },
    action: 2,
    params: { url: '/passwordChange' },
    pages: [],
  },
  {
    id: 'favorites',
    title: {
      TODO_LOCALE: true,
      zh_TW: zh_TW.title.wishlist,
      en_US: en_US.title.wishlist,
      ja_JP: ja_JP.title.wishlist,
      vi_VN: vi_VN.title.wishlist,
    },
    action: 2,
    params: { url: '/wishlist' },
    pages: [],
  },
  {
    id: 'points',
    title: {
      TODO_LOCALE: true,
      zh_TW: zh_TW.title['reward-points'],
      en_US: en_US.title['reward-points'],
      ja_JP: ja_JP.title['reward-points'],
      vi_VN: vi_VN.title['reward-points'],
    },
    action: 2,
    params: { url: '/rewardPoints' },
    pages: [],
  },
  {
    id: 'logout',
    title: {
      TODO_LOCALE: true,
      zh_TW: zh_TW.title.logout,
      en_US: en_US.title.logout,
      ja_JP: ja_JP.title.logout,
      vi_VN: vi_VN.title.logout,
    },
    action: 'logout',
    pages: [],
  },
];
