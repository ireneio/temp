// TODO: remove after support next-i18next'

import React from 'react';

import { contextProvider } from '@meepshop/meep-ui/lib/context';

const { enhancer, removeContextProps } = contextProvider('locale');
/* eslint-disable global-require, import/no-unresolved */
const locales = {};
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
