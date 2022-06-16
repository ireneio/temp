import React from 'react';

import LoginView from '@store/login';
import withHook from '@store/utils/lib/withHook';

import { Container } from 'components';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

const Login = React.memo(props => (
  <Container {...props}>
    <LoginView />
  </Container>
));

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
