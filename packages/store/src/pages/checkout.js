import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import withContext from '@store/utils/lib/withContext';
import adTrackContext from '@store/ad-track';

import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import { getJoinedCheckoutPage } from 'selectors/checkout';
import * as Actions from 'ducks/actions';

class Checkout extends React.Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, store } = context;
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial(context));
    }
    return { userAgent, XMeepshopDomain };
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
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      fbPixelId: PropTypes.string,
    }).isRequired,
    fbAppId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: null,
  };

  componentDidMount() {
    const { location, carts, adTrack } = this.props;

    if (location.search === '')
      adTrack.beginCheckout({
        total: carts.priceInfo.total,
      });
  }

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl },
      location: { pathname },
      fbAppId,
      pageAdTrackIDs,
    } = this.props;

    return (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>
        <TrackingCodeHead
          pathname={pathname}
          pageAdTrackIDs={pageAdTrackIDs}
          fbAppId={fbAppId}
        />
        <Container {...this.props} />
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
    location: Utils.uriParser(props),
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
    page: getJoinedCheckoutPage(state, props),
    carts: state.memberReducer.cart,
  };
};

export default connect(mapStateToProps)(withContext(adTrackContext)(Checkout));
