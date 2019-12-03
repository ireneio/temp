import React from 'react';
import PropTypes from 'prop-types';

import { ISLOGIN_TYPE } from 'constants/propTypes';

export default Component =>
  class MockOrderInfo extends React.Component {
    static propTypes = {
      isLogin: ISLOGIN_TYPE.isRequired,
      isShowCart: PropTypes.bool.isRequired,
    };

    state = {
      // eslint-disable-next-line react/destructuring-assignment
      orderInfo: {},
      cacheProps: {
        // eslint-disable-next-line react/destructuring-assignment
        isLogin: this.props.isLogin,
        // eslint-disable-next-line react/destructuring-assignment
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
