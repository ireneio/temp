import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import * as R from 'ramda';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { TrackingCodeHead, Error } from 'components';
import { getJoinedHomePage } from 'selectors';
import * as Actions from 'ducks/actions';
import * as CONST from 'constants';

class TestIndex extends React.Component {
  static getInitialProps = async context => {
    const {
      isServer,
      XMeepshopDomain,
      userAgent,
      cookie,
      store,
      query,
    } = context;
    if (isServer) {
      store.dispatch(
        Actions.serverIndexInitial({ XMeepshopDomain, cookie, query }),
      );
    } else {
      const { storeReducer, pagesReducer } = store.getState();
      const {
        settings: { homePageId },
      } = storeReducer;
      if (
        R.isNil(homePageId) &&
        R.isNil(R.find(R.propEq('pageType', 'home'))(pagesReducer))
      ) {
        store.dispatch(Actions.getPages({ pageType: 'home', query }));
      } else if (
        !R.isNil(homePageId) &&
        R.isNil(R.find(R.propEq('id', homePageId))(pagesReducer))
      ) {
        store.dispatch(Actions.getPages({ id: homePageId, query }));
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
      host: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
    }).isRequired,
    fbAppId: PropTypes.string.isRequired,
    page: PropTypes.shape(CONST.PAGE_TYPE).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    /* Display Error View */
    if (this.props.error) return <Error error={this.props.error} />;

    const {
      storeSetting: { storeName, faviconUrl, locale },
      location: { host, pathname },
      page,
      pageAdTrackIDs,
      fbAppId,
    } = this.props;
    const url = host + pathname;
    const { keywords, description, image } = page.seo || {};

    return (
      <div>
        <Head>
          <title>{storeName}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <link rel="icon" type="image/png" href={`https://${faviconUrl}`} />
          <link rel="apple-touch-icon" href={`https://${faviconUrl}`} />

          {/* <!-- Facebook Open Graph --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://${url}`} />
          <meta property="og:title" content={storeName} />
          <meta
            property="og:image"
            content={`https://${image || faviconUrl}?w=400`}
          />
          <meta property="og:image:width" content="400" />
          <meta property="og:image:height" content="300" />
          <meta property="og:description" content={description} />
          <meta property="og:site_name" content={storeName} />
          <meta property="og:locale" content={locale} />
          {/* <!-- End - Facebook Open Graph --> */}
        </Head>
        <TrackingCodeHead
          pathname={pathname}
          pageAdTrackIDs={pageAdTrackIDs}
          fbAppId={fbAppId}
        />
        {/* <Container {...this.props} > */}
        <div>
          Test Page
          <div style={{ display: 'none' }}>
            {/* eslint-disable */}
            <a href="/_testProducts" />
            {/* eslint-enable */}
          </div>
        </div>
        {/* </Container> */}
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
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
    page: getJoinedHomePage(state, props),
  };
};

export default connect(mapStateToProps)(TestIndex);
