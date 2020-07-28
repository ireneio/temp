import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import MemberSettings from '@store/member-settings';

import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, TrackingCodeHead, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';

class Settings extends Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, store } = context;

    if (isServer) store.dispatch(Actions.serverOthersInitial(context));

    return {
      userAgent,
      XMeepshopDomain,
      namespacesRequired: ['member-settings'],
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
    pageAdTrackIDs: PropTypes.shape({
      gaID: PropTypes.string,
      fbPixelId: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    lockedBirthday: PropTypes.bool.isRequired,
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
      storeSetting: { storeName, faviconUrl },
      location: { pathname },
      pageAdTrackIDs,
      user,
      dispatchAction,
      t,
    } = this.props;

    return isLogin === 'NOTLOGIN' ? (
      <div>未登入</div>
    ) : (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>
        <TrackingCodeHead pathname={pathname} pageAdTrackIDs={pageAdTrackIDs} />
        <Container {...this.props}>
          <MemberHeader title={t('title.settings')}>
            <MemberSettings dispatchAction={dispatchAction} member={user} />
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

  const getSettingsPage = () => ({
    id: 'page-member-settings',
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  });

  const getPage = createSelector(
    [
      getSettingsPage,
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

  const user = Utils.getIn(['memberReducer', 'user'])(state);

  return {
    storeSetting: state.storeReducer.settings,
    pageAdTrackIDs: Utils.getIn(['storeReducer', 'pageAdTrackIDs'])(state),
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    location: Utils.uriParser(props),
    page: getPage(state, props),
    user: user && Selectors.getJoinedUser(state),
    lockedBirthday:
      Utils.getIn(['storeReducer', 'settings', 'lockedBirthday'])(state) ||
      false,
  };
};

export default connect(mapStateToProps, dispatch => ({
  dispatchAction: (actionName, args) => {
    dispatch(Actions[actionName](args));
  },
}))(withTranslation('common')(Settings));
