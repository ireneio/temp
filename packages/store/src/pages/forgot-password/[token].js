import React, { Component } from 'react';

import withHook from '@store/utils/lib/withHook';
import ForgotPasswordView from '@store/forgot-password';

import { Container } from 'components';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class ForgotPassword extends Component {
  static getInitialProps = async context => {
    const {
      query: { token },
    } = context;

    // FIXME: should use get getServerSideProps return notFound
    if (!token) throw new Error('[FIXME] token is undefined');

    return { token };
  };

  render() {
    const { token } = this.props;

    return (
      <Container {...this.props}>
        <ForgotPasswordView token={token} />
      </Container>
    );
  }
}

export default withHook(() => ({
  page: useTemplatesMenus({
    id: 'page-forgot-password',
    title: {
      zh_TW: '重置密碼',
    },
    container: 'TwoTopsContainer',
    blocks: [],
    fixedtop: Template.fixedtop,
    secondtop: Template.secondtop,
    fixedbottom: Template.fixedbottom,
    sidebar: Template.sidebar,
  }),
}))(ForgotPassword);
