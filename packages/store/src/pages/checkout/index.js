import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import withHook from '@store/utils/lib/withHook';

import * as Utils from 'utils';
import { Container, Error } from 'components';
import * as Template from 'template';
import * as Actions from 'ducks/actions';
import useTemplatesMenus from 'hooks/useTemplatesMenus';

class Checkout extends React.Component {
  static getInitialProps = async context => {
    const { XMeepshopDomain, userAgent, store } = context;

    if (typeof window === 'undefined')
      store.dispatch(Actions.serverOthersInitial(context));

    return { userAgent, XMeepshopDomain };
  };

  static propTypes = {
    error: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    error: null,
  };

  render() {
    const { error } = this.props;

    /* Display Error View */
    if (error) return <Error error={error} />;

    return <Container {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  /* Handle error */
  const error = Utils.getStateError(state);

  if (error) return { error };

  return {
    location: Utils.uriParser(props),
    page: {
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
                  orderInfo: props.orderInfo, // 超商門市
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
    },
  };
};

export default connect(mapStateToProps)(
  withHook(({ page }) => ({
    page: useTemplatesMenus(page),
  }))(Checkout),
);
