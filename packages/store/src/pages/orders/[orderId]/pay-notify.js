import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberOrderPayNotify, {
  namespacesRequired,
} from '@store/member-order-pay-notify';

import { Container, Error } from 'components';
import MemberHeader from 'components/MemberHeader';
import * as Utils from 'utils';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class OrderPayNotify extends React.Component {
  static getInitialProps = async context => {
    const {
      XMeepshopDomain,
      userAgent,
      query: { orderId },
    } = context;

    // FIXME: should use get getServerSideProps return notFound
    if (!orderId) throw new Error('[FIXME] orderId is undefined');

    return {
      orderId,
      userAgent,
      XMeepshopDomain,
      namespacesRequired,
    };
  };

  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { orderId, t } = this.props;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.pay-notify')} goBackToOrders>
          <MemberOrderPayNotify orderId={orderId} />
        </MemberHeader>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  /* Handle error */
  const error = Utils.getStateError(state);

  if (error) return { error };

  return {};
};

export default connect(mapStateToProps)(
  withTranslation('common')(
    withHook(() => ({
      page: useTemplatesMenus({
        id: 'page-member-order-pay-noti',
        container: 'TwoTopsContainer',
        blocks: [],
        fixedtop: Template.fixedtop,
        secondtop: Template.secondtop,
        fixedbottom: Template.fixedbottom,
        sidebar: Template.sidebar,
      }),
    }))(OrderPayNotify),
  ),
);
