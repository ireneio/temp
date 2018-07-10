import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, TrackingCodeHead, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import MemberOrderPayNotification from '@meepshop/meep-ui/lib/memberOrderPayNotification';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';
import * as TITLE from 'locales';

class PayNotify extends Component {
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
    }
    return { orderId, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    isLogin: PropTypes.string.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
    }).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    orderDetails: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = { error: null };

  componentDidMount() {
    if (this.props.isLogin === 'NOTLOGIN') {
      Router.pushRoute('/login');
    }
  }

  componentDidUpdate() {
    if (this.props.isLogin === 'NOTLOGIN') {
      Router.pushRoute('/login');
    }
  }

  render() {
    /* Display Error View */
    if (this.props.error) return <Error error={this.props.error} />;

    const {
      isLogin,
      location: { pathname },
      pageAdTrackIDs,
      colors,
      title,
      orderDetails,
    } = this.props;

    return isLogin === 'NOTLOGIN' ? (
      <div>未登入</div>
    ) : (
      <React.Fragment>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <Container {...this.props}>
          <MemberHeader title={title} goBackToOrders colors={colors}>
            <MemberOrderPayNotification orderDetails={orderDetails} />
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

  const getOrderId = (_, _props) => _props.orderId;
  const getOrders = _state => Utils.getIn(['memberReducer', 'orders'])(_state);
  const getOrderDetails = createSelector(
    [getOrderId, getOrders],
    (orderId, orders) => orders.find(order => order.id === orderId),
  );

  const getPayNotifyPage = () => ({
    id: 'page-member-order-pay-noti',
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  });

  const getPage = createSelector(
    [
      getPayNotifyPage,
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
    title: TITLE.PAY_NOTIFY[locale],
    orderDetails: getOrderDetails(state, props),
  };
};

export default connect(mapStateToProps)(PayNotify);
