import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { UserAgent } from 'fbjs';
import { notification } from 'antd';

import { withTranslation } from '@meepshop/locales';
import {
  AdTrack as AdTrackContext,
  Fb as FbContext,
  Currency as CurrencyContext,
  Role as RoleContext,
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
@withContext(RoleContext, role => ({ role }))
class Container extends React.Component {
  static propTypes = {
    /* may chnage */
    isLogin: PropTypes.string.isRequired,
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

  state = {
    isFbLogin: false,
  };

  componentDidMount() {
    // Fix IE layout bug
    if (isBrowser('IE')) {
      const resizeEvent = window.document.createEvent('UIEvents');
      resizeEvent.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(resizeEvent);
    }
  }

  componentDidUpdate() {
    const { isFbLogin } = this.state;
    const { t, getAuth, role } = this.props;

    if (isFbLogin && role === 'SHOPPER') {
      (async () => {
        const member = await Api.updateMemberData();
        const numOfExpiredPoints =
          member?.data?.viewer?.rewardPoint.expiringPoints.total;

        if (numOfExpiredPoints > 0)
          notification.info({
            message: t('expired-points-message'),
            description: t('expired-points-description', {
              point: numOfExpiredPoints,
            }),
          });

        getAuth();
        this.setState({ isFbLogin: false });
      })();
    }
  }

  // eslint-disable-next-line consistent-return
  handleFacebookLogin = async ({ to }) => {
    const { fb, dispatchAction } = this.props;

    dispatchAction('showLoadingStatus');
    this.setState({ isFbLogin: true });
    await fb.login(to || window.storePreviousPageUrl || '/');
    dispatchAction('hideLoadingStatus');
  };

  render() {
    // Debugger
    if (typeof window === 'object') {
      window.meepShopStore.debugger = { 'Container-props': this.props };
    }

    const location = Utils.uriParser(this.props);
    const {
      /* may change */
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
      client,
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
          /* use dispatchAction */
          login={data => login({ ...data, client })}
          logout={() => signout({ client })}
          dispatchAction={dispatchAction}
          /* props(not in context) */
          product={product}
          radiumConfig={{ userAgent: location.userAgent }} // for radium media query
          {...page}
        >
          {!children
            ? null
            : React.cloneElement(children, {
                reduxFbLogin: () => {
                  this.setState({ isFbLogin: true });
                },
              })}
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

const mapDispatchToProps = (dispatch, { client }) => ({
  signout: bindActionCreators(Actions.signout, dispatch),
  login: bindActionCreators(Actions.login, dispatch),
  getAuth: bindActionCreators(Actions.getAuth, dispatch),
  dispatchAction: (actionName, args = {}) => {
    // eslint-disable-next-line no-param-reassign
    args.client = client;
    dispatch(Actions[actionName](args));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
