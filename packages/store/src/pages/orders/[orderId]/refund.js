import React from 'react';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberOrderApply, {
  namespacesRequired,
} from '@store/member-order-apply';

import { Container } from 'components';
import MemberHeader from 'components/MemberHeader';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class OrderRefund extends React.Component {
  static getInitialProps = async context => {
    const {
      query: { orderId },
    } = context;

    // FIXME: should use get getServerSideProps return notFound
    if (!orderId) throw new Error('[FIXME] orderId is undefined');

    return {
      orderId,
      namespacesRequired,
    };
  };

  render() {
    const { orderId, t } = this.props;

    return (
      <Container {...this.props}>
        <MemberHeader title={t('title.order-refund')} goBackToOrders>
          <MemberOrderApply orderId={orderId} type="refund" />
        </MemberHeader>
      </Container>
    );
  }
}

export default withTranslation('common')(
  withHook(() => ({
    page: useTemplatesMenus({
      id: 'page-member-order-apply',
      container: 'TwoTopsContainer',
      blocks: [],
      fixedtop: Template.fixedtop,
      secondtop: Template.secondtop,
      fixedbottom: Template.fixedbottom,
      sidebar: Template.sidebar,
    }),
  }))(OrderRefund),
);
