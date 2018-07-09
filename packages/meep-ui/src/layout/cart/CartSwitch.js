import React from 'react';
import PropTypes from 'prop-types';

import ProductList from './ProductList';
import Login from './Login';
import ForgetPassword from './ForgetPassword';

const CartSwitch = ({ nowCart, goToInCart, ...props }) => {
  switch (nowCart) {
    case 'login':
      return <Login goToInCart={goToInCart} />;

    case 'forget password':
      return <ForgetPassword goToInCart={goToInCart} />;

    default: {
      const { carts } = props;

      return <ProductList carts={carts} goToInCart={goToInCart} />;
    }
  }
};

CartSwitch.propTypes = {
  nowCart: PropTypes.oneOf(['product list', 'login', 'forget password'])
    .isRequired,
  carts: PropTypes.shape({}),
  goToInCart: PropTypes.func.isRequired,
};

CartSwitch.defaultProps = {
  carts: null,
};

export default CartSwitch;
