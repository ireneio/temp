import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
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
    const { XMeepshopDomain, userAgent, cookie = null } = Utils.getReqArgs(
      isServer,
      req,
    );
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial({ XMeepshopDomain, cookie }));
    }
    return { token, userAgent, XMeepshopDomain };
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
    fbAppId: PropTypes.string.isRequired,
  };

  static defaultProps = { error: null };

  componentDidMount() {
    if (this.props.isLogin === 'ISUSER') {
      Router.pushRoute('/');
    }
  }

  componentDidUpdate() {
    if (this.props.isLogin === 'ISUSER') {
      Router.pushRoute('/');
    }
  }

  render() {
    /* Display Error View */
    if (this.props.error) return <Error error={this.props.error} />;

    const {
      isLogin,
      location: { pathname },
      fbAppId,
      pageAdTrackIDs,
    } = this.props;

    return isLogin === 'ISUSER' ? (
      <div>已登入</div>
    ) : (
      <React.Fragment>
        <TrackingCodeHead
          pathname={pathname}
          pageAdTrackIDs={pageAdTrackIDs}
          fbAppId={fbAppId}
        />
        <Container {...this.props} />
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
    page: getJoinedForgotPasswordPage(state, props),
  };
};

export default connect(mapStateToProps)(ForgotPassword);
