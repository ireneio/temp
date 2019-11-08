// Only important functions can be added to the `Context`.
// Use enhancer with those functions.
// TODO remove
/* eslint-disable max-classes-per-file */

import React from 'react';
import PropTypes from 'prop-types';
import { warning } from 'fbjs';
import fx from 'money';

import LOCALE from 'constants/locale';
import {
  COLOR_TYPE,
  ONE_OF_LOCALE_TYPE,
  ONE_OF_CURRENCY_TYPE,
  ISLOGIN_TYPE,
  LOCATION_TYPE,
  USER_TYPE,
  STORE_SETTING_TYPE,
  CONTEXT_TYPES,
} from 'constants/propTypes';

import { STORE_APP_PLUGINS } from './constants';

export const enhancer = Component =>
  class Enhancer extends React.Component {
    static contextTypes = CONTEXT_TYPES;

    render() {
      return <Component {...this.props} {...this.state} {...this.context} />;
    }
  };

// eslint-disable-next-line react/no-multi-comp
export default class DecoratorsRoot extends React.Component {
  static propTypes = {
    /** context variables from props */
    user: USER_TYPE,
    cname: PropTypes.string,
    isLogin: ISLOGIN_TYPE.isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    locale: ONE_OF_LOCALE_TYPE.isRequired,
    customerCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
    location: LOCATION_TYPE.isRequired,
    carts: PropTypes.shape({}).isRequired,
    storeAppList: PropTypes.arrayOf(
      PropTypes.shape({
        isInstalled: PropTypes.bool.isRequired,
        plugin: PropTypes.oneOf(STORE_APP_PLUGINS).isRequired,
      }),
    ).isRequired,

    /** context func from props */
    setLocale: PropTypes.func.isRequired,
    setCustomerCurrency: PropTypes.func.isRequired,
    adTrack: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    getData: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    fbLogin: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
    addCartItems: PropTypes.func.isRequired,
    updateCartItems: PropTypes.func.isRequired,
    removeCartItems: PropTypes.func.isRequired,
    getApiUrl: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,

    /** variables for DecoratorsRoot func */
    storeCurrency: ONE_OF_CURRENCY_TYPE.isRequired,
    fxSetup: PropTypes.shape({
      timestamp: PropTypes.number.isRequired,
      base: ONE_OF_CURRENCY_TYPE.isRequired,
      rates: PropTypes.shape({}).isRequired,
    }).isRequired,

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
  };

  getChildContext() {
    const {
      /** context variables from props */
      user,
      cname,
      isLogin,
      storeSetting,
      colors,
      locale,
      customerCurrency,
      location,
      carts,

      /** context func from props */
      setLocale,
      setCustomerCurrency,
      adTrack,
      goTo,
      getData,
      login,
      fbLogin,
      logout,
      forgetPassword,
      addCartItems,
      updateCartItems,
      removeCartItems,
      getApiUrl,
      dispatchAction,
    } = this.props;
    const { isShowCart } = this.state;

    warning(LOCALE.includes(locale), `${locale} is not supported, now.`);

    return {
      /** context variables from props */
      user,
      cname,
      isLogin,
      storeSetting,
      colors,
      locale,
      customerCurrency,
      location,
      carts,

      /** context func from props */
      setLocale,
      setCustomerCurrency,
      adTrack,
      goTo,
      getData,
      login,
      fbLogin,
      logout,
      forgetPassword,
      addCartItems,
      updateCartItems,
      removeCartItems,
      getApiUrl,
      dispatchAction,

      /** context variable from DecoratorsRoot */
      isShowCart,

      /** context func from DecoratorsRoot */
      hasStoreAppPlugin: this.hasStoreAppPlugin,
      toggleCart: this.toggleCart,
      transformCurrency: this.transformCurrency,
      transformLocale: this.transformLocale,
    };
  }

  hasStoreAppPlugin = pluginName => {
    const { storeAppList } = this.props;

    warning(
      STORE_APP_PLUGINS.includes(pluginName),
      `${pluginName} is not in \`store app list\``,
    );

    return storeAppList.some(
      ({ isInstalled, plugin }) => plugin === pluginName && isInstalled,
    );
  };

  toggleCart = changeCartStatus => () => {
    const { isShowCart } = this.state;

    this.setState({
      isShowCart:
        changeCartStatus !== undefined ? changeCartStatus : !isShowCart,
    });
  };

  transformCurrency = price => {
    const { storeCurrency, customerCurrency } = this.props;

    return (transformPrice => {
      switch (customerCurrency) {
        case 'TWD':
          return `NT$ ${transformPrice.toFixed(0)}`;
        case 'CNY':
          return `RMB￥${transformPrice.toFixed(2)}`;
        case 'USD':
          return `US$ ${transformPrice.toFixed(2)}`;
        case 'JPY':
          return `JPY￥${transformPrice.toFixed(0)}`;
        case 'EUR':
          return `€ ${transformPrice.toFixed(2)}`;
        case 'VND':
          return `₫ ${transformPrice.toFixed(0)}`;
        case 'KRW':
          return `₩ ${transformPrice.toFixed(0)}`;
        case 'HKD':
          return `HK$ ${transformPrice.toFixed(1)}`;
        case 'MYR':
          return `RM ${transformPrice.toFixed(2)}`;
        /**
         * ignore reason:
         * other currency will not pass propTypes
         */
        /* istanbul ignore next */
        default:
          return price;
      }
    })(
      fx(parseFloat(price))
        .from(storeCurrency)
        .to(customerCurrency),
    ).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  transformLocale = (strings, ...locales) => {
    /** transform locale object */
    if (!(strings instanceof Array)) {
      const { TODO_LOCALE, ...textObj } = strings || {};
      const { locale } = this.props;

      if (TODO_LOCALE) {
        warning(
          textObj[locale],
          `${locale} is not defined in ${JSON.stringify(textObj)}.`,
        );
      }

      /** TODO: can not transform from data */
      if (!TODO_LOCALE) return textObj.zh_TW;

      return textObj[locale] || /* istanbul ignore next */ textObj.zh_TW; // for production
    }

    /** transform locale template */
    return strings.reduce(
      (result, string, index) =>
        `${result}${string}${
          !locales[index] || !(locales[index] instanceof Object)
            ? locales[index] || ''
            : this.transformLocale(locales[index])
        }`,
      '',
    );
  };

  render() {
    const { children } = this.props;

    return children;
  }
}
