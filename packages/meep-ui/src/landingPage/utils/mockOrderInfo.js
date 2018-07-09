import React from 'react';
import PropTypes from 'prop-types';

import { ISLOGIN_TYPE } from 'constants/propTypes';

export default Component =>
  class MockOrderInfo extends React.Component {
    static propTypes = {
      orderInfo: PropTypes.shape({}),
      isLogin: ISLOGIN_TYPE.isRequired,
      isShowCart: PropTypes.bool.isRequired,
    };

    static defaultProps = {
      orderInfo: {},
    };

    state = {
      orderInfo: this.props.orderInfo,
      cacheProps: {
        isLogin: this.props.isLogin,
        isShowCart: this.props.isShowCart,
      },
    };

    static getDerivedStateFromProps(nextProps, preState) {
      // FIXME: use new context api
      const { isLogin, isShowCart } = nextProps;

      if (
        isLogin !== preState.cacheProps.isLogin ||
        isShowCart !== preState.cacheProps.isShowCart
      ) {
        return {
          orderInfo: preState.orderInfo,
          cacheProps: {
            isLogin,
            isShowCart,
          },
        };
      }

      return null;
    }

    updateOrderInfo = (info, emptyInfo) => {
      if (emptyInfo) {
        this.setState({ orderInfo: {} });
        return;
      }

      this.state.orderInfo = { info };
    };

    render() {
      const { orderInfo, ...state } = this.state;

      delete state.cacheProps;

      return (
        <Component
          {...this.props}
          orderInfo={orderInfo}
          updateOrderInfo={this.updateOrderInfo}
        />
      );
    }
  };
