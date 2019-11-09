import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { TrackingCodeHead, Error } from 'components';
import * as Actions from 'ducks/actions';

import EzpayView from '@store/ezpay';
import ezpayLogo from '@store/ezpay/images/ezpay.png';
import sevenElevenLogo from '@store/ezpay/images/seven-eleven.png';
import familyMartLogo from '@store/ezpay/images/family-mart.png';
import hiLifeLogo from '@store/ezpay/images/hi-life.png';
import oKmartLogo from '@store/ezpay/images/ok-mart.png';

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
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      fbPixelId: PropTypes.string,
    }).isRequired,
    fbAppId: PropTypes.string.isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;
    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl },
      location: {
        pathname,
        query: { orderId },
      },
      pageAdTrackIDs,
      fbAppId,
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

        <EzpayView
          orderId={orderId}
          ezpayLogo={ezpayLogo}
          sevenElevenLogo={sevenElevenLogo}
          familyMartLogo={familyMartLogo}
          hiLifeLogo={hiLifeLogo}
          oKmartLogo={oKmartLogo}
        />
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
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
  };
};

export default connect(mapStateToProps, () => ({}))(Ezpay);
