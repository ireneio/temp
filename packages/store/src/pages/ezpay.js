import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Error } from 'components';
import * as Actions from 'ducks/actions';

import EzpayView from '@store/ezpay';

class Ezpay extends React.Component {
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
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;
    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl },
      location: {
        query: { orderId },
      },
    } = this.props;

    return (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>

        <EzpayView orderId={orderId} />
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
    location: Utils.uriParser(prevProps),
  };
};

export default connect(mapStateToProps, () => ({}))(Ezpay);
