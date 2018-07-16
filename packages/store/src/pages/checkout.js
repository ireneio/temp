import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import getConfig from 'next/config';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import { getJoinedCheckoutPage } from 'selectors/checkout';
import * as Actions from 'ducks/actions';

const {
  publicRuntimeConfig: { API_HOST },
} = getConfig();

class Checkout extends React.Component {
  static getInitialProps = async context => {
    const {
      isServer,
      XMeepshopDomain,
      userAgent,
      cookie,
      store,
      query: { shipmentTemplate, tradeNo },
    } = context;
    let orderInfo = null;
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial({ XMeepshopDomain, cookie }));
      if (shipmentTemplate && tradeNo) {
        let value = {};
        try {
          const res = await fetch(
            `${API_HOST}/external/${shipmentTemplate}/getInfo/${tradeNo}`,
          );
          /* api server removes form info in 10 secends */
          if (res.status === 200) {
            value = await res.json();
          } else {
            throw new Error('Form information has been removed.');
          }
        } catch (error) {
          console.warn(error);
        }
        if (!R.isEmpty(value)) {
          orderInfo = {
            info: value.info, // The form infomation filled by user before choosing store.
            CVSAddress: value.CVSAddress,
            CVSStoreID: value.CVSStoreID,
            CVSStoreName: value.CVSStoreName,
          };
        }
      }
    }
    return { orderInfo, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
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
      location: { pathname },
      fbAppId,
      pageAdTrackIDs,
    } = this.props;

    return (
      <div>
        <TrackingCodeHead
          pathname={pathname}
          pageAdTrackIDs={pageAdTrackIDs}
          fbAppId={fbAppId}
        />
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
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    location: Utils.uriParser(props),
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
    page: getJoinedCheckoutPage(state, props),
  };
};

export default connect(mapStateToProps)(Checkout);
