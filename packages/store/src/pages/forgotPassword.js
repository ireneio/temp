import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import ForgotPasswordView from '@store/forgot-password';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import { Router } from 'server/routes';
import { getJoinedForgotPasswordPage } from 'selectors/forgotPassword';
import * as Actions from 'ducks/actions';

class ForgotPassword extends Component {
  static getInitialProps = async context => {
    const {
      store,
      req,
      query: { token },
    } = context;
    const { XMeepshopDomain, userAgent } = Utils.getReqArgs(req);

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

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
      dispatchAction,
      token,
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
        <Container {...this.props}>
          <MemberHeader title={t('title.reset-password')}>
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
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    location: Utils.uriParser(props),
    page: getJoinedForgotPasswordPage(state, props),
  };
};

export default connect(mapStateToProps, dispatch => ({
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
}))(withTranslation('common')(ForgotPassword));
