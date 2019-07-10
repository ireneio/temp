import i18n from 'i18next';
import { reactI18nextModule, withNamespaces } from 'react-i18next';

const parentModuleFilename = module.parent
  ? module.parent.filename
  : process.env.STORYBOOK_NEXT_I18NEXT_PARENT_MODULE_FILENAME;
/* eslint-disable global-require, @typescript-eslint/camelcase */
const resources = /admin\/utils/.test(parentModuleFilename)
  ? {
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
    }
  : {
      zh_TW: {
        'gmo-credit-card-form': require('@meepshop/store/src/static/locales/zh_TW/gmo-credit-card-form.json'),
        'member-settings': require('@meepshop/store/src/static/locales/zh_TW/member-settings.json'),
        'thank-you-page': require('@meepshop/store/src/static/locales/zh_TW/thank-you-page.json'),
      },
      en_US: {
        'gmo-credit-card-form': require('@meepshop/store/src/static/locales/en_US/gmo-credit-card-form.json'),
        'member-settings': require('@meepshop/store/src/static/locales/en_US/member-settings.json'),
        'thank-you-page': require('@meepshop/store/src/static/locales/en_US/thank-you-page.json'),
      },
      ja_JP: {
        'gmo-credit-card-form': require('@meepshop/store/src/static/locales/ja_JP/gmo-credit-card-form.json'),
        'member-settings': require('@meepshop/store/src/static/locales/ja_JP/member-settings.json'),
        'thank-you-page': require('@meepshop/store/src/static/locales/ja_JP/thank-you-page.json'),
      },
      vi_VN: {
        'gmo-credit-card-form': require('@meepshop/store/src/static/locales/vi_VN/gmo-credit-card-form.json'),
        'member-settings': require('@meepshop/store/src/static/locales/vi_VN/member-settings.json'),
        'thank-you-page': require('@meepshop/store/src/static/locales/vi_VN/thank-you-page.json'),
      },
    };
/* eslint-enable global-require, @typescript-eslint/camelcase */

i18n.use(reactI18nextModule).init({
  resources,
  lng: 'zh_TW',
  fallbackLng: 'zh_TW',
  interpolation: {
    escapeValue: false,
  },
});

export default class NextI18Next {
  public withNamespaces = withNamespaces;
}
