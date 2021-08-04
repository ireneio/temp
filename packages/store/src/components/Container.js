import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAgent } from 'fbjs';
import { notification } from 'antd';

import { withTranslation } from '@meepshop/locales';
import logger from '@meepshop/utils/lib/logger';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import {
  AdTrack as AdTrackContext,
  Fb as FbContext,
  Currency as CurrencyContext,
} from '@meepshop/context';
import Layout from '@meepshop/meep-ui/lib/layout';
import withContext from '@store/utils/lib/withContext';

import * as Api from 'api';
import * as Utils from 'utils';
import * as Actions from 'ducks/actions';

import Spinner from './Spinner';

const { isBrowser } = UserAgent;

@withTranslation('ducks')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(CurrencyContext)
@withContext(FbContext)
class Container extends React.Component {
  static propTypes = {
    /* may chnage */
    isLogin: PropTypes.string.isRequired,
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
    signout: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,

    page: PropTypes.shape({ id: PropTypes.string }).isRequired,
    // login page usage ONLY
    getAuth: PropTypes.func.isRequired,
    userAgent: PropTypes.string.isRequired,
    children: PropTypes.element,
  };

  static defaultProps = {
    children: null,
  };

  componentDidMount() {
    // Fix IE layout bug
    if (isBrowser('IE')) {
      const resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
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
  handleFacebookLogin = ({ to }) => {
    const {
      getAuth,
      userAgent,
      dispatchAction,
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

    if (
      !userAgent.match(/Line/gm) &&
      !userAgent.match(/Instagram/gm) &&
      !userAgent.match(/FBAN/gm) && // FIXME: T3144
      !userAgent.match(/FBAV/gm)
    ) {
      // Not in-app browser
      try {
        dispatchAction('showLoadingStatus');

        fb.login(
          async response => {
            if (response.status === 'connected') {
              /* Handle login after FB response */
              const { data } = await initApollo({ name: 'store' }).mutate({
                mutation: gql`
                  mutation fbLogin($input: FbLoginInput!) {
                    fbLogin(input: $input) @client {
                      status
                    }
                  }
                `,
                variables: {
                  input: { accessToken: response.authResponse.accessToken },
                },
              });

              switch (data.fbLogin.status) {
                case 'OK':
                case 'FIRST_LOGIN': {
                  const member = await Api.updateMemberData();
                  const numOfExpiredPoints =
                    member?.data?.viewer?.rewardPoint.expiringPoints.total;

                  if (data.fbLogin.status === 'FIRST_LOGIN')
                    adTrack.completeRegistration();

                  if (numOfExpiredPoints > 0)
                    notification.info({
                      message: t('expired-points-message'),
                      description: t('expired-points-description', {
                        point: numOfExpiredPoints,
                      }),
                    });

                  getAuth();

                  if (to) Utils.goTo({ pathname: to });
                  else if (window.storePreviousPageUrl)
                    Utils.goTo({ pathname: window.storePreviousPageUrl });
                  else Utils.goTo({ pathname: '/' });
                  break;
                }

                case 'EXPIRED_ACCESS_TOKEN':
                  notification.error({ message: 'FB Access token 失效' });
                  break;

                case 'CANNOT_GET_EMAIL':
                  notification.error({ message: 'FB無法取得email' });
                  break;

                case 'INVALID_TOKEN':
                  notification.error({ message: '無法取得meepShop token' });
                  break;

                default:
                  notification.error({ message: '未知的錯誤' });
                  break;
              }
              /* Handle login after FB response - End */
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
        logger.error(`Error: ${message}, Stack: ${JSON.stringify(stack)}`);
      }
    } else {
      // in-app browser
      window.location.href = `https://www.facebook.com/${version}/dialog/oauth?client_id=${appId}&redirect_uri=https://${window.meepShopStore.XMeepshopDomain}/fbAuthForLine&scope=email&state=${to}`;
    }
  };

  render() {
    // Debugger
    if (typeof window === 'object') {
      window.meepShopStore.debugger = { 'Container-props': this.props };
    }

    const {
      /* may change */
      location,
      loading,
      loadingTip,
      /* func */
      login,
      signout,
      dispatchAction,
      /* props(not in context) */
      page,
      product,
      children,
    } = this.props;

    return (
      <>
        <Spinner loading={loading} loadingTip={loadingTip} />
        <Layout
          /* may change */
          location={location}
          /* func to modify data */
          goTo={Utils.goTo}
          fbLogin={this.handleFacebookLogin}
          getData={Utils.getData}
          /* use dispatchAction */
          login={login}
          logout={signout}
          dispatchAction={dispatchAction}
          /* props(not in context) */
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
    memberReducer: { loading, loadingTip },
    loadingStatus: { loading: isLoading },
  } = state;

  return {
    /* may chnage */
    loading: isLoading || loading,
    loadingTip,
  };
};

const mapDispatchToProps = dispatch => ({
  signout: bindActionCreators(Actions.signout, dispatch),
  login: bindActionCreators(Actions.login, dispatch),
  getAuth: bindActionCreators(Actions.getAuth, dispatch),
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
