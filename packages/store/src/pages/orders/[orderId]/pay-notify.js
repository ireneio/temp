import React from 'react';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import MemberOrderPayNotify, {
  namespacesRequired,
} from '@store/member-order-pay-notify';

import { Container } from 'components';
import MemberHeader from 'components/MemberHeader';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class OrderPayNotify extends React.Component {
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
        <MemberHeader title={t('title.pay-notify')} goBackToOrders>
          <MemberOrderPayNotify orderId={orderId} />
        </MemberHeader>
      </Container>
    );
  }
}

export default withTranslation('common')(
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
);
