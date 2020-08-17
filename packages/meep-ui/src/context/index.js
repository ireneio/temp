/**
 * How to add new context api:
 *
 * 1. add new context in "./context";
 * 2. add value to the array in Context render;
 * 3. add key to contextPropsKey in "./utils/contextProvider.js".
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Apps as AppsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import { USER_TYPE, STORE_SETTING_TYPE, LOCATION_TYPE } from './propTypes';
import {
  StoreSettingContext,
  FuncContext,
  LocationContext,
  UserContext,
} from './context';

export contextProvider from './utils/contextProvider';

@withContext(AppsContext, apps => ({ apps }))
export default class Context extends React.PureComponent {
  /* eslint-disable react/destructuring-assignment */
  func = {
    goTo: this.props.goTo,
    hasStoreAppPlugin: pluginName => {
      const { apps } = this.props;

      return apps[pluginName].isInstalled;
    },
  };
  /* eslint-disable react/destructuring-assignment */

  static propTypes = {
    /** variables | ignore */
    user: USER_TYPE,
    storeSetting: STORE_SETTING_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,

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
