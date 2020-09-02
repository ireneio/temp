import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { Router } from 'server/routes';
import * as Utils from 'utils';
import { Container, LoadingPageFromLogin, Error } from 'components';
import LoginView from '@meepshop/meep-ui/lib/login';
import { getJoinedLoginPage } from 'selectors/login';
import * as Actions from 'ducks/actions';

class Login extends Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, store } = context;
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial(context));
    }
    return { userAgent, XMeepshopDomain };
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

  static defaultProps = {
    error: null,
    // login page ONLY
  };

  componentDidMount() {
    const { isLogin } = this.props;

    if (isLogin === 'ISUSER') Router.pushRoute('/');
  }

  componentDidUpdate(nextProps) {
    const { isLogin } = nextProps;

    if (isLogin === 'ISUSER' && window.storePreviousPageUrl !== '/login')
      Router.pushRoute(window.storePreviousPageUrl || '/');
  }

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      isLogin,
      storeSetting,
      storeSetting: { storeName, faviconUrl },
    } = this.props;

    return isLogin === 'ISUSER' ? (
      <LoadingPageFromLogin />
    ) : (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>
        <Container {...this.props}>
          <LoginView storeSetting={storeSetting} />
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
    page: getJoinedLoginPage(state, props),
  };
};

export default connect(mapStateToProps)(Login);
