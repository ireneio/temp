import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, TrackingCodeHead, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import MemberWishlist from '@meepshop/meep-ui/lib/memberWishList';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';
import * as TITLE from 'locales';

class Wishlist extends Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, cookie, store } = context;
    if (isServer) {
      store.dispatch(Actions.serverOthersInitial({ XMeepshopDomain, cookie }));
    }
    return { userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    isLogin: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    locale: PropTypes.string.isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
    }).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    wishList: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static defaultProps = { error: null };

  componentDidMount() {
    const { isLogin } = this.props;

    if (isLogin === 'NOTLOGIN') {
      Router.pushRoute('/login');
    }
  }

  componentDidUpdate() {
    const { isLogin } = this.props;

    if (isLogin === 'NOTLOGIN') {
      Router.pushRoute('/login');
    }
  }

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      isLogin,
      location: { pathname },
      pageAdTrackIDs,
      colors,
      title,
      wishList,
    } = this.props;

    return isLogin === 'NOTLOGIN' ? (
      <div>未登入</div>
    ) : (
      <React.Fragment>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <Container {...this.props}>
          <MemberHeader title={title} colors={colors}>
            <MemberWishlist wishList={wishList} />
          </MemberHeader>
        </Container>
      </React.Fragment>
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

  const locale = Utils.getIn(['storeReducer', 'settings', 'locale'])(state);

  return {
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    location: Utils.uriParser(props),
    page: getPage(state, props),
    colors: Utils.getIn(['storeReducer', 'colors'])(state),
    title: TITLE.WISHLIST[locale],
    wishList: Utils.getIn(['memberReducer', 'wishList'])(state),
  };
};

export default connect(mapStateToProps)(Wishlist);
