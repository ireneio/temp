import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { withTranslation } from '@meepshop/locales';
import MemberOrderApply, {
  namespacesRequired,
} from '@store/member-order-apply';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import * as Selectors from 'selectors';
import * as Template from 'template';
import * as Actions from 'ducks/actions';

class OrderRefund extends React.Component {
  static getInitialProps = async context => {
    const {
      XMeepshopDomain,
      userAgent,
      store,
      query: { orderId },
    } = context;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

    return {
      orderId,
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
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const {
      storeSetting: { storeName, faviconUrl },
      orderId,
      t,
    } = this.props;

    return (
      <>
        <Head>
          <title>{storeName}</title>
          <link rel="icon" type="image/png" href={faviconUrl} />
          <link rel="apple-touch-icon" href={faviconUrl} />
        </Head>
        <Container {...this.props}>
          <MemberHeader title={t('title.order-refund')} goBackToOrders>
            <MemberOrderApply orderId={orderId} type="refund" />
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

  const getOrderApplyListPage = () => ({
    id: 'page-member-order-apply',
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  });

  const getPage = createSelector(
    [
      getOrderApplyListPage,
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

export default connect(mapStateToProps)(withTranslation('common')(OrderRefund));
