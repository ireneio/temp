import React from 'react';

import withHook from '@store/utils/lib/withHook';

import { Container } from 'components';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Checkout extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent } = context;

    return { userAgent, XMeepshopDomain };
  };

  render() {
    return <Container {...this.props} />;
  }
}

export default withHook(() => ({
  page: useTemplatesMenus({
    id: 'page-checkout',
    title: {
      zh_TW: '結帳',
    },
    container: 'DefaultContainer',
    blocks: [
      {
        id: 'block-checkout',
        width: 100,
        componentWidth: 0,
        padding: 0,
        widgets: [
          {
            widgets: [
              {
                id: 'checkout',
                module: 'checkout',
              },
            ],
          },
        ],
      },
    ],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
    useBottom: false,
  }),
}))(Checkout);
