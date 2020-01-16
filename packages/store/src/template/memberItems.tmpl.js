// TODO: remove after remove transformLocale
/* eslint-disable camelcase */
import zh_TW from 'public/locales/zh_TW/common.json';
import en_US from 'public/locales/en_US/common.json';
import ja_JP from 'public/locales/ja_JP/common.json';
import vi_VN from 'public/locales/vi_VN/common.json';
import fr_FR from 'public/locales/fr_FR/common.json';
import es_ES from 'public/locales/es_ES/common.json';
import th_TH from 'public/locales/th_TH/common.json';
import id_ID from 'public/locales/id_ID/common.json';
/* eslint-enable camelcase */

const LOCALE = {
  zh_TW,
  en_US,
  ja_JP,
  vi_VN,
  fr_FR,
  es_ES,
  th_TH,
  id_ID,
};

const getLocale = name =>
  Object.keys(LOCALE).reduce(
    (result, key) => ({
      ...result,
      [key]: LOCALE[key].title[name],
    }),
    {},
  );

export default [
  {
    id: 'order-manager',
    title: {
      ...getLocale('order'),
      TODO_LOCALE: true,
    },
    action: 2,
    params: { url: '/orders' },
    pages: [],
  },
  {
    id: 'member-info',
    title: {
      ...getLocale('settings'),
      TODO_LOCALE: true,
    },
    action: 2,
    params: { url: '/settings' },
    pages: [],
  },
  {
    id: 'recipienta',
    title: {
      ...getLocale('recipients'),
      TODO_LOCALE: true,
    },
    action: 2,
    params: { url: '/recipients' },
    pages: [],
  },
  {
    id: 'change-password',
    title: {
      ...getLocale('change-password'),
      TODO_LOCALE: true,
    },
    action: 2,
    params: { url: '/passwordChange' },
    pages: [],
  },
  {
    id: 'favorites',
    title: {
      ...getLocale('wishlist'),
      TODO_LOCALE: true,
    },
    action: 2,
    params: { url: '/wishlist' },
    pages: [],
  },
  {
    id: 'points',
    title: {
      ...getLocale('reward-points'),
      TODO_LOCALE: true,
    },
    action: 2,
    params: { url: '/rewardPoints' },
    pages: [],
  },
  {
    id: 'logout',
    title: {
      ...getLocale('logout'),
      TODO_LOCALE: true,
    },
    action: 'logout',
    pages: [],
  },
];
