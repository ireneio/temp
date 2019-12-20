/**
 * How to add new context api:
 *
 * 1. add new context in "./context";
 * 2. add value to the array in Context render;
 * 3. add key to contextPropsKey in "./utils/contextProvider.js".
 */

import React from 'react';
import PropTypes from 'prop-types';

import { USER_TYPE, STORE_SETTING_TYPE, LOCATION_TYPE } from './propTypes';
import { STORE_APP_PLUGINS } from './constant';
import {
  StoreSettingContext,
  FuncContext,
  LocationContext,
  UserContext,
} from './context';

export contextProvider from './utils/contextProvider';

export default class Context extends React.PureComponent {
  /* eslint-disable react/destructuring-assignment */
  func = {
    goTo: this.props.goTo,
    hasStoreAppPlugin: pluginName => {
      const { storeAppList } = this.props;

      return storeAppList.some(
        ({ isInstalled, plugin }) => plugin === pluginName && isInstalled,
      );
    },
  };
  /* eslint-disable react/destructuring-assignment */

  static propTypes = {
    /** variables | ignore */
    user: USER_TYPE,
    storeSetting: STORE_SETTING_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    storeAppList: PropTypes.arrayOf(
      PropTypes.shape({
        isInstalled: PropTypes.bool.isRequired,
        plugin: PropTypes.oneOf(STORE_APP_PLUGINS).isRequired,
      }),
    ).isRequired,

    /** func | ignore */
    goTo: PropTypes.func.isRequired,

    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    user: null,
  };

  render() {
    const { user, storeSetting, location, children } = this.props;

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
        ContextProvider: UserContext.Provider,
        value: { user },
      },
    ].reduce(
      (childComponent, { ContextProvider, value }) => (
        <ContextProvider value={value}>{childComponent}</ContextProvider>
      ),
      children,
    );
  }
}
