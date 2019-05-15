import i18n from 'i18next';
import { reactI18nextModule, withNamespaces } from 'react-i18next';

i18n.use(reactI18nextModule).init({
  /* eslint-disable global-require, @typescript-eslint/camelcase */
  resources: {
    zh_TW: {
      'date-picker': require('@admin/server/src/static/locales/zh_TW/date-picker.json'),
      common: require('@admin/server/src/static/locales/zh_TW/common.json'),
      dashboard: require('@admin/server/src/static/locales/zh_TW/dashboard.json'),
      orders: require('@admin/server/src/static/locales/zh_TW/orders.json'),
      'orders-ecfit': require('@admin/server/src/static/locales/zh_TW/orders-ecfit.json'),
      'orders-export': require('@admin/server/src/static/locales/zh_TW/orders-export.json'),
    },
    en_US: {
      'date-picker': require('@admin/server/src/static/locales/en_US/date-picker.json'),
      common: require('@admin/server/src/static/locales/en_US/common.json'),
      dashboard: require('@admin/server/src/static/locales/en_US/dashboard.json'),
      orders: require('@admin/server/src/static/locales/en_US/orders.json'),
      'orders-ecfit': require('@admin/server/src/static/locales/en_US/orders-ecfit.json'),
      'orders-export': require('@admin/server/src/static/locales/en_US/orders-export.json'),
    },
    ja_JP: {
      'date-picker': require('@admin/server/src/static/locales/ja_JP/date-picker.json'),
      common: require('@admin/server/src/static/locales/ja_JP/common.json'),
      dashboard: require('@admin/server/src/static/locales/ja_JP/dashboard.json'),
      orders: require('@admin/server/src/static/locales/ja_JP/orders.json'),
      'orders-ecfit': require('@admin/server/src/static/locales/ja_JP/orders-ecfit.json'),
      'orders-export': require('@admin/server/src/static/locales/ja_JP/orders-export.json'),
    },
    /* eslint-enable global-require, @typescript-eslint/camelcase */
  },
  lng: 'zh_TW',
  fallbackLng: 'zh_TW',
  interpolation: {
    escapeValue: false,
  },
});

export default class NextI18Next {
  public withNamespaces = withNamespaces;
}
