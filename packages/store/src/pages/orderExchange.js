import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberOrderApply, {
  namespacesRequired,
} from '@store/member-order-apply';

import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import * as Utils from 'utils';
import * as Template from 'template';
import * as Actions from 'ducks/actions';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class OrderExchange extends Component {
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
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { orderId, t } = this.props;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.order-exchange')} goBackToOrders>
          <MemberOrderApply orderId={orderId} type="exchange" />
        </MemberHeader>
      </Container>
    );
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);

  if (error) return { error };

  return {
    location: Utils.uriParser(props),
    page: {
      id: 'page-member-order-apply',
      container: 'TwoTopsContainer',
      blocks: [],
      fixedtop: Template.fixedtop,
      secondtop: Template.secondtop,
      fixedbottom: Template.fixedbottom,
      sidebar: Template.sidebar,
    },
  };
};

export default connect(mapStateToProps)(
  withTranslation('common')(
    withHook(({ page }) => ({
      page: useTemplatesMenus(page),
    }))(OrderExchange),
  ),
);
