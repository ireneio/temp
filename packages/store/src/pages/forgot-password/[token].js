import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withTranslation } from '@meepshop/locales';
import withHook from '@store/utils/lib/withHook';
import ForgotPasswordView from '@store/forgot-password';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import * as Template from 'template';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class ForgotPassword extends Component {
  static getInitialProps = async context => {
    const {
      req,
      query: { token },
    } = context;

    // FIXME: should use get getServerSideProps return notFound
    if (!token) throw new Error('[FIXME] token is undefined');

    const { XMeepshopDomain, userAgent } = Utils.getReqArgs(req);

    return { token, userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = { error: null };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    const { token } = this.props;

    return (
      <Container {...this.props}>
        <ForgotPasswordView token={token} />
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
    }))(ForgotPassword),
  ),
);
