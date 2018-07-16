import React from 'react';
import PropTypes from 'prop-types';
import * as R from 'ramda';
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
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    order: PropTypes.shape({
      id: PropTypes.string.isRequired,
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
      location: { pathname },
      pageAdTrackIDs,
      order,
    } = this.props;
    return (
      <React.Fragment>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <EzpayView order={order} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, prevProps) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    location: Utils.uriParser(prevProps),
    order: R.find(R.propEq('id', prevProps.orderId))(
      Utils.getIn(['memberReducer', 'orders'])(state),
    ),
  };
};

export default connect(mapStateToProps)(Ezpay);
