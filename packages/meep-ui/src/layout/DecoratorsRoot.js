// Only important functions can be added to the `Context`.
// Use enhancer with those functions.
// TODO remove
/* eslint-disable max-classes-per-file */

import React from 'react';
import PropTypes from 'prop-types';

import { apps as appsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import generateConverter from '@store/currency/lib/utils/generateConverter';

import {
  COLOR_TYPE,
  ONE_OF_CURRENCY_TYPE,
  ISLOGIN_TYPE,
  LOCATION_TYPE,
  USER_TYPE,
  STORE_SETTING_TYPE,
  CONTEXT_TYPES,
} from 'constants/propTypes';

export const enhancer = Component =>
  class Enhancer extends React.Component {
    static contextTypes = CONTEXT_TYPES;

    render() {
      return <Component {...this.props} {...this.state} {...this.context} />;
    }
  };

@withContext(appsContext, apps => ({ apps }))
// eslint-disable-next-line react/no-multi-comp
export default class DecoratorsRoot extends React.Component {
  static propTypes = {
    /** context variables from props */
    user: USER_TYPE,
    cname: PropTypes.string,
    isLogin: ISLOGIN_TYPE.isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
    customerCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    carts: PropTypes.shape({}).isRequired,

    /** context func from props */
    setCustomerCurrency: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
    getApiUrl: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,

    /** render */
    children: PropTypes.node.isRequired,
  };

  static childContextTypes = CONTEXT_TYPES;

  static defaultProps = {
    user: null,
    cname: null,
  };

  state = {
    isShowCart: false,
    isCartUpdating: false,
  };

  getChildContext() {
    const {
      /** context variables from props */
      user,
      cname,
      isLogin,
      storeSetting,
      colors,
      storeCurrency,
      customerCurrency,
      location,
      carts,

      /** context func from props */
      setCustomerCurrency,
      goTo,
      getData,
      login,
      fbLogin,
      logout,
      forgetPassword,
      getApiUrl,
      dispatchAction,
    } = this.props;
    const { isShowCart, isCartUpdating } = this.state;

    return {
      /** context variables from props */
      user,
      cname,
      isLogin,
      storeSetting,
      colors,
      customerCurrency,
      location,
      carts,

      /** context func from props */
      setCustomerCurrency,
      goTo,
      getData,
      login,
      fbLogin,
      logout,
      forgetPassword,
      getApiUrl,
      dispatchAction,

      /** context variable from DecoratorsRoot */
      isShowCart,
      isCartUpdating,

      /** context func from DecoratorsRoot */
      hasStoreAppPlugin: this.hasStoreAppPlugin,
      toggleCart: this.toggleCart,
      updateCart: this.updateCart,
      transformCurrency: generateConverter(storeCurrency, customerCurrency),
    };
  }

  hasStoreAppPlugin = pluginName => {
    const { apps } = this.props;

    return apps[pluginName].isInstalled;
  };

  toggleCart = changeCartStatus => () => {
    const { isShowCart } = this.state;

    this.setState({
      isShowCart:
        changeCartStatus !== undefined ? changeCartStatus : !isShowCart,
    });
  };

  updateCart = isCartUpdating => {
    this.setState({
      isCartUpdating,
    });
  };

  render() {
    const { children } = this.props;

    return children;
  }
}
