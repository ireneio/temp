import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withTranslation } from '@meepshop/locales';
import { Apps as AppsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import MemberWishlist, { namespacesRequired } from '@store/member-wish-list';

import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';

class Wishlist extends Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, store } = context;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

    return {
      userAgent,
      XMeepshopDomain,
      namespacesRequired,
    };
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
    locale: PropTypes.string.isRequired,
  };

  static defaultProps = { error: null };

  componentDidMount() {
    this.checkPermission();
  }

  componentDidUpdate() {
    this.checkPermission();
  }

  checkPermission = () => {
    const { apps } = this.props;

    if (!apps.wishList.isInstalled) Router.pushRoute('/');
  };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      t,
      apps,
      storeSetting: { storeName, faviconUrl },
    } = this.props;

    if (!apps.wishList.isInstalled) return null;

    return (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>
        <Container {...this.props}>
          <MemberHeader title={t('title.wishlist')}>
            <MemberWishlist />
          </MemberHeader>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);
  if (error) return { error };

  const getWishlistPage = () => ({
    id: 'page-member-wishList',
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  });

  const getPage = createSelector(
    [
      getWishlistPage,
      Selectors.getMenus,
      Selectors.getLogoUrl,
      Selectors.getMobileLogoUrl,
    ],
    Selectors.getJoinedPage,
  );

  return {
    storeSetting: state.storeReducer.settings,
    location: Utils.uriParser(props),
    page: getPage(state, props),
  };
};

export default connect(mapStateToProps, dispatch => ({
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
}))(
  withTranslation('common')(
    withContext(AppsContext, apps => ({ apps }))(Wishlist),
  ),
);
