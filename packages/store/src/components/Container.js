import React from 'react';
import PropTypes from 'prop-types';
import * as Api from 'api';
import * as Utils from 'utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAgent } from 'fbjs';
import { notification } from 'antd';

import Layout from '@meepshop/meep-ui/lib/layout';
import { i18n } from '@store/utils/lib/i18n';
import withContext from '@store/utils/lib/withContext';
import withCurrency from '@store/currency';
import adTrackContext from '@store/ad-track';

import { getJoinedUser, getStoreAppList } from 'selectors';
import * as Actions from 'ducks/actions';

import Spinner from './Spinner';

const { isBrowser } = UserAgent;

@withCurrency
class Container extends React.Component {
  static propTypes = {
    /* never change */
    cname: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    storeAppList: PropTypes.arrayOf(PropTypes.object).isRequired,
    storeSetting: PropTypes.shape({
      activityVersion: PropTypes.number.isRequired,
      invoice: PropTypes.object.isRequired,
    }).isRequired,
    pageAdTrackIDs: PropTypes.shape({
      fbPixelId: PropTypes.string.isRequired,
      gaID: PropTypes.string.isRequired,
      webMasterID: PropTypes.string.isRequired,
      gtmID: PropTypes.string.isRequired,
      googleAdsConversionID: PropTypes.string.isRequired,
      googleAdsSignupLabel: PropTypes.string.isRequired,
      googleAdsCheckoutLabel: PropTypes.string.isRequired,
      googleAdsCompleteOrderLabel: PropTypes.string.isRequired,
    }).isRequired,
    /* may chnage */
    isLogin: PropTypes.string.isRequired,
    user: PropTypes.shape({ id: PropTypes.string }),
    location: PropTypes.shape({
      hash: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired,
      userAgent: PropTypes.string.isRequired,
    }).isRequired,
    carts: PropTypes.shape({ activityInfo: PropTypes.array }),
    loading: PropTypes.bool.isRequired,
    loadingTip: PropTypes.string.isRequired,
    /* func to modify data */
    setLocale: PropTypes.func.isRequired,
    setCustomerCurrency: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired,
    addCartItems: PropTypes.func.isRequired,
    updateCartItems: PropTypes.func.isRequired,
    removeCartItems: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    /* props(not in context) */
    locale: PropTypes.string.isRequired,
    storeCurrency: PropTypes.string.isRequired,
    customerCurrency: PropTypes.string,
    fxSetup: PropTypes.shape({
      rate: PropTypes.object,
      base: PropTypes.string,
    }).isRequired,
    backgroundImage: PropTypes.shape({
      files: PropTypes.array.isRequired,
      repeat: PropTypes.bool.isRequired,
      size: PropTypes.bool.isRequired,
      used: PropTypes.bool.isRequired,
    }).isRequired,

    page: PropTypes.shape({ id: PropTypes.string }).isRequired,
    // login page usage ONLY
    getAuth: PropTypes.func.isRequired,
    fbAppId: PropTypes.string,
    userAgent: PropTypes.string.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    customerCurrency: 'zh_TW',
    carts: null,
    user: null,
    fbAppId: null,
    children: null,
  };

  componentDidMount() {
    // Fix IE layout bug
    if (isBrowser('IE')) {
      const resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    }
    // Fix iOS checkout/lp 選完超商後未跳回收件人資料區塊
    if (
      window.location.search.match(/shipmentTemplate=/g) &&
      window.location.search.match(/tradeNo=/g) &&
      window.location.hash === ''
    ) {
      Utils.goTo({ params: { hash: '#choose-shipment-store' } });
    }
    // handle error
    window.addEventListener(
      'unhandledrejection',
      ({ reason: { message, stack } }) => {
        if (message === 'Failed to fetch') return;
        Utils.logToServer({ type: 'unhandledrejection', message, stack });
      },
    );
    // Retention features
    const {
      pageAdTrackIDs,
      storeSetting: { adRetentionMilliseconds, adRetentionMillisecondsEnabled },
    } = this.props;
    if (adRetentionMillisecondsEnabled) {
      setTimeout(() => {
        // FB Pixel
        if (window.fbq && pageAdTrackIDs.fbPixelId) {
          window.fbq('track', 'meepShop_retention');
        }
        // GA
        if (window.gtag && pageAdTrackIDs.gaID) {
          window.gtag('event', 'meepShop_retention', {
            event_category: 'meepShop_retention',
            event_label: 'meepShop_retention',
            non_interaction: true,
          });
        }
      }, adRetentionMilliseconds);
    }
  }

  setLocale = id => {
    const { setLocale } = this.props;

    i18n.changeLanguage(id);
    setLocale(id);
  };

  setCustomerCurrency = id => {
    const { setCustomerCurrency, setCurrency, currency } = this.props;
    if (id === currency) return;

    document.cookie = `currency=${id}; path=/`;
    setCurrency(id);
    setCustomerCurrency(id);
  };

  // eslint-disable-next-line consistent-return
  handleFacebookLogin = ({ from }) => {
    const {
      fbAppId,
      getAuth,
      userAgent,
      dispatchAction,
      cname,
      adTrack,
    } = this.props;

    if (!fbAppId)
      return notification.error({
        message: '尚未設定 Facebook APP ID',
      });

    dispatchAction('showLoadingStatus');

    if (
      !userAgent.match(/Line/gm) &&
      !userAgent.match(/Instagram/gm) &&
      !userAgent.match(/FBAN/gm) && // FIXME: T3144
      !userAgent.match(/FBAV/gm) &&
      cname !== 'imint' && // FIXME: T2945
      cname !== 'truda-moda' // FIXME: hotfix T2939 (原因不明，可能為FB SDK bug
    ) {
      // Not in-app browser
      if (window.FB) {
        try {
          window.FB.login(
            async response => {
              if (response.status === 'connected') {
                /* Handle login after FB response */
                const data = await Api.fbLogin(response.authResponse);

                switch (data.status) {
                  case 200: {
                    getAuth();
                    if (from === 'cart') {
                      Utils.goTo({ pathname: '/checkout' });
                    } else if (window.storePreviousPageUrl) {
                      Utils.goTo({ pathname: window.storePreviousPageUrl });
                    } else {
                      Utils.goTo({ pathname: '/' });
                    }
                    break;
                  }
                  case 201: {
                    adTrack.completeRegistration();
                    getAuth();

                    if (from === 'cart') {
                      Utils.goTo({ pathname: 'checkout' });
                    } else if (window.storePreviousPageUrl) {
                      Utils.goTo({ pathname: window.storePreviousPageUrl });
                    } else {
                      Utils.goTo({ pathname: '/' });
                    }
                    break;
                  }
                  case 2010: {
                    notification.error({ message: 'FB Access token 失效' });
                    break;
                  }
                  case 2011: {
                    notification.error({ message: 'FB無法取得email' });
                    break;
                  }
                  case 2003: {
                    notification.error({ message: '無法取得meepShop token' });
                    break;
                  }
                  case 9999: {
                    notification.error({ message: '未知的錯誤' });
                    break;
                  }
                  default:
                    break;
                } /* Handle login after FB response - End */
                dispatchAction('hideLoadingStatus');
              } else {
                /* eslint-disable no-alert */
                alert(
                  'The person is not logged into this app or we are unable to tell. ',
                ); /* eslint-enable no-alert */
                dispatchAction('hideLoadingStatus');
              }
            },
            { scope: 'public_profile,email' },
          );
        } catch ({ message, stack }) {
          // eslint-disable-next-line no-console
          console.error(`Error: ${message}, Stack: ${JSON.stringify(stack)}`);
        }
      }
    } else {
      // in-app browser
      window.location.href = `https://www.facebook.com/v3.3/dialog/oauth?client_id=${fbAppId}&redirect_uri=https://${window.meepShopStore.XMeepshopDomain}/fbAuthForLine&scope=email&state=meepShopNextStore${from}`;
    }
  };

  render() {
    // Debugger
    if (typeof window === 'object') {
      window.meepShopStore.debugger = { 'Container-props': this.props };
    }

    const {
      /* never change */
      cname,
      colors,
      storeAppList,
      storeSetting,
      /* may change */
      isLogin,
      user,
      location,
      carts,
      loading,
      loadingTip,
      /* func */
      login,
      forgetPassword,
      signout,
      addCartItems,
      updateCartItems,
      removeCartItems,
      dispatchAction,
      /* props(not in context) */
      locale,
      storeCurrency,
      customerCurrency,
      fxSetup,
      backgroundImage,
      page,
      children,
    } = this.props;

    return (
      <>
        <Spinner loading={loading} loadingTip={loadingTip} />
        <Layout
          /* never change */
          cname={cname}
          colors={colors}
          storeCurrency={storeCurrency}
          storeAppList={storeAppList}
          storeSetting={storeSetting}
          /* may change */
          isLogin={isLogin}
          user={user}
          location={location}
          carts={carts}
          locale={locale}
          customerCurrency={customerCurrency}
          /* func to modify data */
          goTo={Utils.goTo}
          fbLogin={this.handleFacebookLogin}
          getData={Utils.getData}
          getApiUrl={Utils.getApiUrl}
          setLocale={this.setLocale}
          setCustomerCurrency={this.setCustomerCurrency}
          /* use dispatchAction */
          login={login}
          forgetPassword={forgetPassword}
          addCartItems={addCartItems}
          updateCartItems={updateCartItems}
          removeCartItems={removeCartItems}
          logout={signout}
          dispatchAction={dispatchAction}
          /* props(not in context) */
          fxSetup={fxSetup} // currnecy rate
          backgroundImage={backgroundImage} // background-image of page
          radiumConfig={{ userAgent: location.userAgent }} // for radium media query
          {...page}
        >
          {children}
        </Layout>
      </>
    );
  }
}

const mapStateToProps = state => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  const {
    storeReducer: { colors, settings, pageAdTrackIDs },
    memberReducer: { user, isLogin, cart, loading, loadingTip },
    loadingStatus: { loading: isLoading },
  } = state;
  const {
    cname,
    locale,
    storeCurrency,
    customerCurrency,
    fxSetup,
    backgroundImage,
  } = settings;
  return {
    /* never change */
    cname,
    colors,
    storeAppList: getStoreAppList(state),
    storeSetting: settings,
    pageAdTrackIDs,
    /* may chnage */
    isLogin,
    user: user && getJoinedUser(state),
    carts: cart,
    loading: isLoading || loading,
    loadingTip,
    /* props(not in context) */
    locale,
    storeCurrency,
    customerCurrency,
    fxSetup,
    backgroundImage,
  };
};

const mapDispatchToProps = dispatch => ({
  setLocale: bindActionCreators(Actions.setLocale, dispatch),
  setCustomerCurrency: bindActionCreators(Actions.setCurrency, dispatch),
  signout: bindActionCreators(Actions.signout, dispatch),
  login: bindActionCreators(Actions.login, dispatch),
  forgetPassword: bindActionCreators(Actions.forgetPassword, dispatch),
  addCartItems: bindActionCreators(Actions.addCartItems, dispatch),
  updateCartItems: bindActionCreators(Actions.updateCartItems, dispatch),
  removeCartItems: bindActionCreators(Actions.removeCartItems, dispatch),
  getAuth: bindActionCreators(Actions.getAuth, dispatch),
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(adTrackContext)(Container));
