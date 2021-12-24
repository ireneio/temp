import React, { Component } from 'react';

import LoginView from '@meepshop/meep-ui/lib/login';
import withHook from '@store/utils/lib/withHook';

import { Container } from 'components';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Login extends Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent } = context;

    return { userAgent, XMeepshopDomain };
  };

  render() {
    return (
      <Container {...this.props}>
        <LoginView />
      </Container>
    );
  }
}

export default withHook(() => ({
  page: useTemplatesMenus({
    id: 'page-login',
    title: {
      zh_TW: '登入',
    },
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  }),
}))(Login);
