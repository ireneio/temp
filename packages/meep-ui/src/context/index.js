/**
 * How to add new context api:
 *
 * 1. add new context in "./context";
 * 2. add value to the array in Context render;
 * 3. add key to contextPropsKey in "./utils/contextProvider.js".
 */

import React from 'react';
import PropTypes from 'prop-types';

import { ONE_OF_LOCALE_TYPE } from 'constants/propTypes';

import { STORE_SETTING_TYPE, LOCATION_TYPE } from './propTypes';
import {
  StoreSettingContext,
  FuncContext,
  LocationContext,
  LocaleContext,
} from './context';
import transformLocale from './utils/transformLocale';

export contextProvider from './utils/contextProvider';

export default class Context extends React.PureComponent {
  /* eslint-disable react/destructuring-assignment */
  func = {
    goTo: this.props.goTo,
  };

  locale = {
    locale: this.props.locale,
    transformLocale: transformLocale(this.props.locale),
  };
  /* eslint-disable react/destructuring-assignment */

  static propTypes = {
    /** variables | ignore */
    storeSetting: STORE_SETTING_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,

    /** locale | ignore */
    locale: ONE_OF_LOCALE_TYPE.isRequired,

    /** func | ignore */
    goTo: PropTypes.func.isRequired,

    children: PropTypes.node.isRequired,
  };

  render() {
    const { storeSetting, location, children } = this.props;

    return [
      {
        ContextProvider: StoreSettingContext.Provider,
        value: { storeSetting },
      },
      {
        ContextProvider: FuncContext.Provider,
        value: this.func,
      },
      {
        ContextProvider: LocationContext.Provider,
        value: { location },
      },
      {
        ContextProvider: LocaleContext.Provider,
        value: this.locale,
      },
    ].reduce(
      (childComponent, { ContextProvider, value }) => (
        <ContextProvider value={value}>{childComponent}</ContextProvider>
      ),
      children,
    );
  }
}
