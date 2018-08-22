import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import * as R from 'ramda';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { TrackingCodeHead, Error } from 'components';
import EzpayView from 'components/EzpayView';
import * as Actions from 'ducks/actions';

class Ezpay extends React.Component {
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
    } else {
      const {
        memberReducer: { orders },
      } = store.getState();
      const order = R.find(R.propEq('id', orderId))(orders);
      if (R.isNil(order)) {
        store.dispatch(Actions.getOrder({ orderId }));
      }
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
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    order: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      fbPixelId: PropTypes.string,
    }).isRequired,
    fbAppId: PropTypes.string.isRequired,
    orderId: PropTypes.string.isRequired,
    getOrder: PropTypes.func.isRequired,
  };

  static defaultProps = { error: null, order: null };

  state = { count: 0 }; // retry getOrder: throw error over 5 times

  componentDidMount() {
    const { orderId, order, getOrder } = this.props;
    if (!order) {
      this.timmer = setInterval(async () => {
        const { count } = this.state;
        const isOrderExsits = await this.checkOrderExsits(orderId);
        if (isOrderExsits) {
          getOrder({ orderId });
          return clearInterval(this.timmer);
        }
        if (!isOrderExsits && count > 4) return clearInterval(this.timmer);
        return this.setState({ count: count + 1 });
      }, 1000);
    }
  }

  checkOrderExsits = async orderId => {
    const { data } = await Utils.getData(
      `
    query getOrderInEzpayPage($orderId: [String]) {
      getOrderList(search: {
        filter: {
          and: [{
            type: "ids"
            ids: $orderId
          }]
        }
      }) {
        total
      }
    }
    `,
      { orderId },
    );
    if (data?.getOrderList.total === 1) return true;
    return false;
  };

  render() {
    const { error } = this.props;
    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl },
      location: { pathname },
      pageAdTrackIDs,
      order,
      fbAppId,
    } = this.props;

    const { count } = this.state;
    if (!order && count === 5) console.log('Ezpay cannot get order data.');

    return (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={`https://${faviconUrl}`} />
          <link rel="apple-touch-icon" href={`https://${faviconUrl}`} />
        </Head>
        <TrackingCodeHead
          pathname={pathname}
          pageAdTrackIDs={pageAdTrackIDs}
          fbAppId={fbAppId}
        />
        {order ? (
          <EzpayView order={order} />
        ) : (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            Loading...
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state, prevProps) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    storeSetting: state.storeReducer.settings,
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    location: Utils.uriParser(prevProps),
    order: R.find(R.propEq('id', prevProps.orderId))(
      Utils.getIn(['memberReducer', 'orders'])(state),
    ),
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
  };
};

const mapDispatchToProps = dispatch => ({
  getOrder: bindActionCreators(Actions.getOrder, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ezpay);
