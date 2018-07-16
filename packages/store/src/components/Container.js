import React from 'react';
import PropTypes from 'prop-types';
import * as Api from 'api';
import * as Utils from 'utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isBrowser } from 'fbjs/lib/UserAgent';
import Layout from '@meepshop/meep-ui/lib/layout';
import { Spinner } from 'components';
import { getJoinedUser, getStoreAppList } from 'selectors';
import * as Actions from 'ducks/actions';

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
      facebookID: PropTypes.string.isRequired,
      gaID: PropTypes.string.isRequired,
      webMasterID: PropTypes.string.isRequired,
      gtmID: PropTypes.string.isRequired,
      conversionID: PropTypes.string.isRequired,
      adwordsSignup: PropTypes.string.isRequired,
      adwordsCheckout: PropTypes.string.isRequired,
      adwordsCompletedOrder: PropTypes.string.isRequired,
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
  }

  setLocale = id => {
    document.cookie = `locale=${id}`;
    this.props.setLocale(id);
  };

  setCustomerCurrency = id => {
    document.cookie = `currency=${id}`;
    this.props.setCustomerCurrency(id);
  };

  handleAdTracking = (eventName, options, callback) => {
    Utils.execTrackingCode(eventName, {
      ...options,
      pageAdTrackIDs: this.props.pageAdTrackIDs,
    });
    if (callback) {
      callback();
    }
  };

  handleFacebookLogin = ({ from }) => {
    const { pageAdTrackIDs, getAuth, userAgent } = this.props;

    if (!userAgent.match(/Line/gm) && !userAgent.match(/Instagram/gm)) {
      // Not Line in-app browser
      if (window.FB) {
        try {
          window.FB.login(
            async response => {
              if (response.status === 'connected') {
                console.log('Logged into your app and Facebook.');
                /* Handle login after FB response */
                const data = await Api.fbLogin(response.authResponse);
                if (data.status === 200) {
                  if (data.status === 201) {
                    Utils.execTrackingCode('CompleteRegistration', {
                      pageAdTrackIDs,
                    });
                  }
                  getAuth();
                  if (from === 'cart') {
                    Utils.goTo({ pathname: 'checkout' });
                  } else if (window.storePreviousPageUrl) {
                    Utils.goTo({ pathname: window.storePreviousPageUrl });
                  } else {
                    Utils.goTo({ pathname: '/' });
                  }
                } else {
                  throw new Error(data.msg);
                }
                /* Handle login after FB response - End */
              } else {
                alert(
                  'The person is not logged into this app or we are unable to tell. ',
                ); // eslint-disable-line
                throw new Error(
                  'The person is not logged into this app or we are unable to tell. ',
                );
              }
            },
            { scope: 'public_profile,email' },
          );
        } catch (error) {
          console.error(error);
        }
      } else if (this.props.fbAppId) {
        alert('未設定FB app ID'); // eslint-disable-line
      }
    } else {
      // Line in-app browser
      window.location.href = `https://www.facebook.com/v3.0/dialog/oauth?client_id=${
        this.props.fbAppId
      }&redirect_uri=https://${
        window.meepShopStore.XMeepshopDomain
      }/fbAuthForLine&scope=email&state=meepShopNextStore${from}`;
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
      <React.Fragment>
        <Spinner locale={locale} loading={loading} loadingTip={loadingTip} />
        <Layout
          /* never change */
          cname={cname}
          colors={colors}
          storeCurrency={storeCurrency}
          storeAppList={storeAppList}
          storeSetting={storeSetting}
          /* may chnage */
          isLogin={isLogin}
          user={user}
          location={location}
          carts={carts}
          locale={locale}
          customerCurrency={customerCurrency}
          /* func to modify data */
          goTo={Utils.goTo}
          adTrack={this.handleAdTracking}
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
      </React.Fragment>
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
    loading,
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
)(Container);
