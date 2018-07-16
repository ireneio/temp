import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, TrackingCodeHead, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import MemberOrderQA from '@meepshop/meep-ui/lib/memberOrderQA';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';
import * as TITLE from 'locales';

class OrderQA extends Component {
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
    orderQA: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      orderDetails,
      orderQA,
    } = this.props;

    return isLogin === 'NOTLOGIN' ? (
      <div>未登入</div>
    ) : (
      <React.Fragment>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <Container {...this.props}>
          <MemberHeader title={title} goBackToOrders colors={colors}>
            <MemberOrderQA orderDetails={orderDetails} orderQA={orderQA} />
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
  const getOrderQAList = _state =>
    Utils.getIn(['memberReducer', 'orderQAList'])(_state);
  const getOrderQA = createSelector(
    [getOrderId, getOrderQAList],
    (orderId, orderQAList) =>
      orderQAList.reduce((qaList, qa) => {
        if (qa.orderId === orderId) return qaList.concat([qa]);
        return qaList;
      }, []),
  );

  const getOrderQAPage = () => ({
    id: 'page-member-order-qa',
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  });

  const getPage = createSelector(
    [
      getOrderQAPage,
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
    title: TITLE.ORDER_QA[locale],
    orderDetails: getOrderDetails(state, props),
    orderQA: getOrderQA(state, props),
  };
};

export default connect(mapStateToProps)(OrderQA);
