import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, TrackingCodeHead, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import MemberPoints from '@meepshop/meep-ui/lib/memberPoints';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';
import * as TITLE from 'locales';

class RewardPoints extends Component {
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
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      facebookID: PropTypes.string,
    }).isRequired,
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    userPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
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
      userPoints,
    } = this.props;

    return isLogin === 'NOTLOGIN' ? (
      <div>未登入</div>
    ) : (
      <React.Fragment>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <Container {...this.props}>
          <MemberHeader title={title} colors={colors}>
            <MemberPoints userPoints={userPoints} />
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

  const getRewardPointsPage = () => ({
    id: 'page-member-points',
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  });

  const getPage = createSelector(
    [
      getRewardPointsPage,
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
    title: TITLE.REWARD_POINTS[locale],
    userPoints: Utils.getIn(['memberReducer', 'userPoints'])(state),
  };
};

export default connect(mapStateToProps)(RewardPoints);
