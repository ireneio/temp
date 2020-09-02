import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Apps as AppsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';
import MemberWishlist from '@store/member-wish-list';

import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';

class Wishlist extends Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, store } = context;

    if (isServer) store.dispatch(Actions.serverOthersInitial(context));

    return {
      userAgent,
      XMeepshopDomain,
      namespacesRequired: ['member-wish-list'],
    };
  };

  static propTypes = {
    error: PropTypes.string,
    isLogin: PropTypes.string.isRequired,
    storeSetting: PropTypes.shape({
      storeName: PropTypes.string.isRequired,
      faviconUrl: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    locale: PropTypes.string.isRequired,
    wishList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = { error: null };

  componentDidMount() {
    this.checkPermission();
  }

  componentDidUpdate() {
    this.checkPermission();
  }

  checkPermission = () => {
    const { apps, isLogin } = this.props;

    if (isLogin === 'NOTLOGIN') Router.pushRoute('/login');

    if (!apps.wishList.isInstalled) Router.pushRoute('/');
  };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      t,
      apps,
      isLogin,
      storeSetting: { storeName, faviconUrl },
      wishList,
      dispatchAction,
    } = this.props;

    if (isLogin === 'NOTLOGIN') return <div>未登入</div>;

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
            <MemberWishlist
              wishListFromRedux={wishList}
              dispatchAction={dispatchAction}
            />
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
      Selectors.getLocaleItemsTemplate,
      Selectors.getCurrencyItemsTemplate,
    ],
    (
      page,
      menus,
      logoUrl,
      mobileLogoUrl,
      localeItemsTemplate,
      currencyItemsTemplate,
    ) =>
      Selectors.getJoinedPage(
        page,
        menus,
        logoUrl,
        mobileLogoUrl,
        localeItemsTemplate,
        currencyItemsTemplate,
      ),
  );

  return {
    storeSetting: state.storeReducer.settings,
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    location: Utils.uriParser(props),
    page: getPage(state, props),
    wishList: Utils.getIn(['memberReducer', 'wishList'])(state),
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
