import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import MemberRewardPoints from '@store/member-reward-points';

import * as Utils from 'utils';
import * as Selectors from 'selectors';
import * as Template from 'template';
import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import { Router } from 'server/routes';
import * as Actions from 'ducks/actions';

class RewardPoints extends Component {
  static getInitialProps = async context => {
    const { isServer, XMeepshopDomain, userAgent, store } = context;

    if (isServer) store.dispatch(Actions.serverOthersInitial(context));

    return {
      userAgent,
      XMeepshopDomain,
      namespacesRequired: ['member-reward-points'],
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
        <Container {...this.props}>
          <MemberHeader title={t('title.reward-points')}>
            <MemberRewardPoints />
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

  return {
    storeSetting: state.storeReducer.settings,
    isLogin: Utils.getIn(['memberReducer', 'isLogin'])(state),
    location: Utils.uriParser(props),
    page: getPage(state, props),
  };
};

export default connect(mapStateToProps)(
  withTranslation('common')(RewardPoints),
);
