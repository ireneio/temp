import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import { getJoinedCheckoutPage } from 'selectors/checkout';
import * as Actions from 'ducks/actions';

class Checkout extends React.Component {
  static getInitialProps = async context => {
    const {
      isServer,
      XMeepshopDomain,
      userAgent,
      store,
      query: { shipmentTemplate, tradeNo },
    } = context;
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial(context));
      if (shipmentTemplate && tradeNo) {
        const orderInfo = await Utils.getOrderInfo(shipmentTemplate, tradeNo);
        return { orderInfo, userAgent, XMeepshopDomain };
      }
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
    orderInfo: PropTypes.shape({
      info: PropTypes.object,
      CVSAddress: PropTypes.string.isRequired,
      CVSStoreID: PropTypes.string.isRequired,
      CVSStoreName: PropTypes.string.isRequired,
    }),
    fbAppId: PropTypes.string.isRequired,
  };

  static defaultProps = {
    error: null,
    orderInfo: null,
  };

  componentDidMount() {
    const { location, pageAdTrackIDs, orderInfo } = this.props;
    if (location.search === '') {
      Utils.execTrackingCode('BeginCheckout', { pageAdTrackIDs });
    }

    // Get store previous page in orderInfo when coming back from choosing store page
    if (orderInfo) {
      window.storePreviousPageUrl = orderInfo.info.storePreviousPageUrl;
    }
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
  };
};

export default connect(mapStateToProps)(Checkout);
