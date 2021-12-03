import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ThankYouPageView, { namespacesRequired } from '@store/thank-you-page';
import withHook from '@store/utils/lib/withHook';

import { Error } from 'components';
import * as Utils from 'utils';
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

  static propTypes = {
    error: PropTypes.string,
  };

  static defaultProps = { error: null };

  render() {
    const { error, orderId } = this.props;
    /* Display Error View */
    if (error) return <Error error={error} />;

    return <ThankYouPageView orderId={orderId} />;
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
  }))(ThankYouPage),
);
