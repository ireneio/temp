import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LoginView from '@meepshop/meep-ui/lib/login';
import withHook from '@store/utils/lib/withHook';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Login extends Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent } = context;

    return { userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = {
    error: null,
  };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    return (
      <Container {...this.props}>
        <LoginView />
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
  withHook(() => ({
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
  }))(Login),
);
