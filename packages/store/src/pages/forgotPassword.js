import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import ForgotPasswordView from '@store/forgot-password';

import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import { Router } from 'server/routes';
import { getJoinedForgotPasswordPage } from 'selectors/forgotPassword';
import * as Actions from 'ducks/actions';

class ForgotPassword extends Component {
  static getInitialProps = async context => {
    const {
      isServer,
      store,
      req,
      query: { token },
    } = context;
    const { XMeepshopDomain, userAgent } = Utils.getReqArgs(isServer, req);
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial(context));
    }
    return { token, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    isLogin: PropTypes.string.isRequired,
    storeSetting: PropTypes.shape({
      storeName: PropTypes.string.isRequired,
      faviconUrl: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      fbPixelId: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = { error: null };

  componentDidMount() {
    const { isLogin } = this.props;

    if (isLogin === 'ISUSER') {
      Router.pushRoute('/');
    }
  }

  componentDidUpdate() {
    const { isLogin } = this.props;

    if (isLogin === 'ISUSER') {
      Router.pushRoute('/');
    }
  }

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      isLogin,
      storeSetting: { storeName, faviconUrl },
      location: { pathname },
      pageAdTrackIDs,
      dispatchAction,
      token,
      colors,
      t,
    } = this.props;

    return isLogin === 'ISUSER' ? (
      <div>已登入</div>
    ) : (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <Container {...this.props}>
          <MemberHeader title={t('title.reset-password')} colors={colors}>
            <ForgotPasswordView dispatchAction={dispatchAction} token={token} />
          </MemberHeader>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    storeSetting: state.storeReducer.settings,
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    location: Utils.uriParser(props),
    page: getJoinedForgotPasswordPage(state, props),
    colors: Utils.getIn(['storeReducer', 'colors'])(state),
  };
};

export default connect(mapStateToProps, dispatch => ({
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
}))(withTranslation('common')(ForgotPassword));
