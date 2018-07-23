import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { Router } from 'server/routes';
import * as Utils from 'utils';
import {
  Container,
  TrackingCodeHead,
  LoadingPageFromLogin,
  Error,
} from 'components';
import LoginView from '@meepshop/meep-ui/lib/login';
import { getJoinedLoginPage } from 'selectors/login';
import * as Actions from 'ducks/actions';

class Login extends Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, cookie, store } = context;
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial({ XMeepshopDomain, cookie }));
    }
    return { userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    isLogin: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
    }).isRequired,
    fbAppId: PropTypes.string,
  };

  static defaultProps = {
    error: null,
    // login page ONLY
    fbAppId: null,
  };

  async componentDidMount() {
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
      fbAppId,
      location: { pathname },
      pageAdTrackIDs,
    } = this.props;

    return isLogin === 'ISUSER' ? (
      <LoadingPageFromLogin />
    ) : (
      <React.Fragment>
        <Head>
          <title>Login page</title>
        </Head>
        <TrackingCodeHead
          pathname={pathname}
          pageAdTrackIDs={pageAdTrackIDs}
          fbAppId={fbAppId}
        />
        <Container {...this.props}>
          <LoginView />
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    location: Utils.uriParser(props),
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
    page: getJoinedLoginPage(state, props),
  };
};

export default connect(mapStateToProps)(Login);
