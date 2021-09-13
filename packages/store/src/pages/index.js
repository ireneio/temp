import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import { getJoinedHomePage } from 'selectors';
import * as Actions from 'ducks/actions';
import * as CONST from 'constants';

class Index extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, store, query } = context;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverIndexInitial(context));
    else {
      const { pagesReducer } = store.getState();

      if (!pagesReducer.some(({ pageType }) => pageType === 'home'))
        store.dispatch(Actions.getPages({ pageType: 'HOME', query }));
    }

    return { userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    location: PropTypes.shape({
      host: PropTypes.string.isRequired,
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    page: PropTypes.shape(CONST.PAGE_TYPE).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error, experimentPage } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { page: reduxPage } = this.props;
    const page = experimentPage || reduxPage;
    const { keywords, description, image } = page.seo || {};

    return (
      <>
        <Head>
          {!description ? null : (
            <meta key="description" name="description" content={description} />
          )}

          <meta key="keywords" name="keywords" content={keywords} />

          {!image ? null : (
            <meta key="og:image" property="og:image" content={image} />
          )}

          {!description ? null : (
            <meta
              key="og:description"
              property="og:description"
              content={description}
            />
          )}
        </Head>

        <Container {...this.props} page={page} />

        {/* eslint-disable */}
        <a href="/sitemaps/v1" />
        {/* eslint-enable */}
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  return {
    location: Utils.uriParser(props),
    page: getJoinedHomePage(state, props),
  };
};

export default connect(mapStateToProps)(withTranslation('common')(Index));
