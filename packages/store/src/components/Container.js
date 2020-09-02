import React from 'react';
import PropTypes from 'prop-types';
import * as Api from 'api';
import * as Utils from 'utils';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAgent } from 'fbjs';
import { notification } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import {
  AdTrack as AdTrackContext,
  Fb as FbContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import Layout from '@meepshop/meep-ui/lib/layout';
import withContext from '@store/utils/lib/withContext';

import { getJoinedUser } from 'selectors';
import * as Actions from 'ducks/actions';

import Spinner from './Spinner';

const { isBrowser } = UserAgent;

@withTranslation('ducks')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(CurrencyContext)
@withContext(FbContext)
class Container extends React.Component {
  static propTypes = {
    /* never change */
    cname: PropTypes.string.isRequired,
    storeSetting: PropTypes.shape({
      invoice: PropTypes.object.isRequired,
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
    loading: PropTypes.bool.isRequired,
    loadingTip: PropTypes.string.isRequired,
    /* func to modify data */
    login: PropTypes.func.isRequired,
    forgetPassword: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
    /* props(not in context) */
    backgroundImage: PropTypes.shape({
      files: PropTypes.array.isRequired,
      repeat: PropTypes.bool.isRequired,
      size: PropTypes.bool.isRequired,
      used: PropTypes.bool.isRequired,
    }).isRequired,

    page: PropTypes.shape({ id: PropTypes.string }).isRequired,
    // login page usage ONLY
    getAuth: PropTypes.func.isRequired,
    userAgent: PropTypes.string.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    user: null,
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
  }

  // eslint-disable-next-line consistent-return
  handleFacebookLogin = ({ from }) => {
    const {
      getAuth,
      userAgent,
      dispatchAction,
      cname,
      fb,
      appId,
      version,
      adTrack,
      t,
    } = this.props;

    if (!appId)
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
      try {
        fb.login(
          async response => {
            if (response.status === 'connected') {
              /* Handle login after FB response */
              const data = await Api.fbLogin(response.authResponse);

              switch (data.status) {
                case 200:
                case 201: {
                  const member = await Api.updateMemberData();
                  const numOfExpiredPoints =
                    member?.data?.viewer?.rewardPoint.expiringPoints.total;

                  if (data.status === 201) adTrack.completeRegistration();

                  if (numOfExpiredPoints > 0)
                    notification.info({
                      message: t('expired-points-message'),
                      description: t('expired-points-description', {
                        point: numOfExpiredPoints,
                      }),
                    });

                  getAuth();

                  if (from === 'cart') Utils.goTo({ pathname: '/checkout' });
                  else if (window.storePreviousPageUrl)
                    Utils.goTo({ pathname: window.storePreviousPageUrl });
                  else Utils.goTo({ pathname: '/' });
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
              notification.error({
                message:
                  'The person is not logged into this app or we are unable to tell.',
              });
              dispatchAction('hideLoadingStatus');
            }
          },
          { scope: 'public_profile,email' },
        );
      } catch ({ message, stack }) {
        // eslint-disable-next-line no-console
        console.error(`Error: ${message}, Stack: ${JSON.stringify(stack)}`);
      }
    } else {
      // in-app browser
      window.location.href = `https://www.facebook.com/${version}/dialog/oauth?client_id=${appId}&redirect_uri=https://${window.meepShopStore.XMeepshopDomain}/fbAuthForLine&scope=email&state=meepShopNextStore${from}`;
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
      storeSetting,
      experiment,
      /* may change */
      isLogin,
      user,
      location,
      loading,
      loadingTip,
      /* func */
      login,
      forgetPassword,
      signout,
      dispatchAction,
      /* props(not in context) */
      backgroundImage,
      page,
      product,
      children,
    } = this.props;

    return (
      <>
        <Spinner loading={loading} loadingTip={loadingTip} />
        <Layout
          /* never change */
          cname={cname}
          storeSetting={storeSetting}
          experiment={experiment}
          /* may change */
          isLogin={isLogin}
          user={user}
          location={location}
          /* func to modify data */
          goTo={Utils.goTo}
          fbLogin={this.handleFacebookLogin}
          getData={Utils.getData}
          getApiUrl={Utils.getApiUrl}
          /* use dispatchAction */
          login={login}
          forgetPassword={forgetPassword}
          logout={signout}
          dispatchAction={dispatchAction}
          /* props(not in context) */
          backgroundImage={backgroundImage} // background-image of page
          product={product}
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
    storeReducer: { settings, experiment },
    memberReducer: { user, isLogin, loading, loadingTip },
    loadingStatus: { loading: isLoading },
  } = state;
  const { cname, backgroundImage } = settings;

  return {
    /* never change */
    cname,
    storeSetting: settings,
    experiment,
    /* may chnage */
    isLogin,
    user: user && getJoinedUser(state),
    loading: isLoading || loading,
    loadingTip,
    /* props(not in context) */
    backgroundImage,
  };
};

const mapDispatchToProps = dispatch => ({
  signout: bindActionCreators(Actions.signout, dispatch),
  login: bindActionCreators(Actions.login, dispatch),
  forgetPassword: bindActionCreators(Actions.forgetPassword, dispatch),
  getAuth: bindActionCreators(Actions.getAuth, dispatch),
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
