// TODO: remove after support next-i18next'

import React from 'react';

import { contextProvider } from '@meepshop/meep-ui/lib/context';

const { enhancer, removeContextProps } = contextProvider('locale');
/* eslint-disable global-require, import/no-unresolved */
const locales = {
  zh_TW: {
    'gmo-credit-card-form': require('../static/locales/zh_TW/gmo-credit-card-form.json'),
    'member-wish-list': require('../static/locales/zh_TW/member-wish-list.json'),
    'member-settings': require('../static/locales/zh_TW/member-settings.json'),
    'member-recipients': require('../static/locales/zh_TW/member-recipients.json'),
    'thank-you-page': require('../static/locales/zh_TW/thank-you-page.json'),
  },
  en_US: {
    'gmo-credit-card-form': require('../static/locales/en_US/gmo-credit-card-form.json'),
    'member-wish-list': require('../static/locales/en_US/member-wish-list.json'),
    'member-settings': require('../static/locales/en_US/member-settings.json'),
    'member-recipients': require('../static/locales/en_US/member-recipients.json'),
    'thank-you-page': require('../static/locales/en_US/thank-you-page.json'),
  },
  ja_JP: {
    'gmo-credit-card-form': require('../static/locales/ja_JP/gmo-credit-card-form.json'),
    'member-wish-list': require('../static/locales/ja_JP/member-wish-list.json'),
    'member-settings': require('../static/locales/ja_JP/member-settings.json'),
    'member-recipients': require('../static/locales/ja_JP/member-recipients.json'),
    'thank-you-page': require('../static/locales/ja_JP/thank-you-page.json'),
  },
  vi_VN: {
    'gmo-credit-card-form': require('../static/locales/vi_VN/gmo-credit-card-form.json'),
    'member-wish-list': require('../static/locales/vi_VN/member-wish-list.json'),
    'member-settings': require('../static/locales/vi_VN/member-settings.json'),
    'member-recipients': require('../static/locales/vi_VN/member-recipients.json'),
    'thank-you-page': require('../static/locales/vi_VN/thank-you-page.json'),
  },
};
/* eslint-enable global-require, import/no-unresolved */

export const withNamespaces = namespace => Component => {
  const locale = Object.keys(locales).reduce(
    (result, key) => ({
      ...result,
      [key]: locales[key][namespace],
    }),
    {},
  );

  class I18n extends React.PureComponent {
    transform = (keys, prevLocale = locale) => {
      // eslint-disable-next-line react/prop-types
      const { transformLocale } = this.props;
      const [nowKey, ...hasNextKey] = keys.split('.');
      const localeObj = Object.keys(prevLocale).reduce(
        (result, key) => ({
          ...result,
          [key]: prevLocale[key][nowKey],
        }),
        {},
      );

      if (hasNextKey.length !== 0)
        return this.transform(hasNextKey.join('.'), localeObj);

      return transformLocale(localeObj);
    };

    render() {
      // eslint-disable-next-line react/prop-types
      const { locale: language } = this.props;

      return (
        <Component
          {...removeContextProps(this.props)}
          t={this.transform}
          i18n={{ language }}
        />
      );
    }
  }

  return enhancer(I18n);
};
