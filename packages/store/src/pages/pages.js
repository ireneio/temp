import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import * as R from 'ramda';
import { connect } from 'react-redux';
import * as Utils from 'utils';
import { Container, TrackingCodeHead, Error } from 'components';
import { getJoinedPageInPagesRoute } from 'selectors/pages';
import * as Actions from 'ducks/actions';
import * as CONST from 'constants';

class Pages extends React.Component {
  static getInitialProps = async context => {
    const {
      isServer,
      XMeepshopDomain,
      userAgent,
      cookie,
      store,
      query,
    } = context;
    const { path, pId } = query;
    if (isServer) {
      store.dispatch(
        Actions.serverPagesInitial({ XMeepshopDomain, cookie, query }),
      );
    } else if (pId) {
      Utils.goTo({ pathname: `/product/${pId}` });
    } else {
      const { pagesReducer } = store.getState();
      if (R.isNil(R.find(R.propEq('path', path))(pagesReducer))) {
        store.dispatch(Actions.getPages({ path, query }));
      }
    }
    return { path, userAgent, XMeepshopDomain };
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
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl, locale },
      location: { host, pathname },
      page,
      pageAdTrackIDs,
      fbAppId,
    } = this.props;
    const url = host + pathname;
    const { addressTitle = '' } = page;
    const { keywords, description, image } = page.seo || {};

    return (
      <React.Fragment>
        <Head>
          <title>{addressTitle || storeName}</title>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <link rel="icon" type="image/png" href={`https://${faviconUrl}`} />
          <link rel="apple-touch-icon" href={`https://${faviconUrl}`} />

          {/* <!-- Facebook Open Graph --> */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content={`https://${url}`} />
          <meta property="og:title" content={addressTitle || storeName} />
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
    storeSetting: Utils.getIn(['storeReducer', 'settings'])(state),
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    location: Utils.uriParser(props),
    fbAppId:
      Utils.getIn(['storeReducer', 'appLogins', 0, 'appId'])(state) || null,
    page: getJoinedPageInPagesRoute(state, props),
  };
};

export default connect(mapStateToProps)(Pages);
