import React from 'react';

/* eslint-disable global-require */
const locales = {
  common: require('@admin/server/src/static/locales/zh_TW/common.json'),
  dashboard: require('@admin/server/src/static/locales/zh_TW/dashboard.json'),
};
/* eslint-enable global-require */

export default class NextI18Next {
  public withNamespaces = (namespaceName: string) => (
    Component: React.ComponentType<T>,
  ) => (props: T) => (
    <Component {...props} t={(key: string) => locales[namespaceName][key]} />
  );
}
