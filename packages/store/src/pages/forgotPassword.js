import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';
import ForgotPasswordView from '@store/forgot-password';

import * as Utils from 'utils';
import { Container, Error } from 'components';
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
    storeSetting: PropTypes.shape({
      storeName: PropTypes.string.isRequired,
      faviconUrl: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl },
      token,
    } = this.props;

    return (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>
        <Container {...this.props}>
          <ForgotPasswordView token={token} />
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
    location: Utils.uriParser(props),
    page: getJoinedForgotPasswordPage(state, props),
  };
};

export default connect(mapStateToProps)(
  withTranslation('common')(ForgotPassword),
);
