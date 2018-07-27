import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import { getJoinedThankYouPage } from 'selectors/thankYouPage';
import * as Actions from 'ducks/actions';

class ThankYouPage extends React.Component {
  static getInitialProps = async context => {
    const {
      isServer,
      XMeepshopDomain,
      userAgent,
      cookie,
      store,
      query: { orderId },
    } = context;
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial({ XMeepshopDomain, cookie }));
    }
    return { orderId, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    storeSetting: PropTypes.shape({
      storeName: PropTypes.string.isRequired,
      faviconUrl: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      host: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
    }).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl },
      location: { pathname },
      pageAdTrackIDs,
    } = this.props;

    return (
      <div>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={`https://${faviconUrl}`} />
          <link rel="apple-touch-icon" href={`https://${faviconUrl}`} />
        </Head>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <Container {...this.props} />
      </div>
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
    location: Utils.uriParser(props),
    page: getJoinedThankYouPage(state, props),
  };
};

export default connect(mapStateToProps)(ThankYouPage);
