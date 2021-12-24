import React from 'react';

import ThankYouPageView, { namespacesRequired } from '@store/thank-you-page';
import withHook from '@store/utils/lib/withHook';

import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class ThankYouPage extends React.Component {
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

  render() {
    const { orderId } = this.props;

    return <ThankYouPageView orderId={orderId} />;
  }
}

export default withHook(() => ({
  page: useTemplatesMenus({
    id: 'thank-you-page',
    title: {
      zh_TW: '結帳',
    },
    container: 'DefaultContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
    useBottom: false,
  }),
}))(ThankYouPage);
