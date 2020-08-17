import React from 'react';
import PropTypes from 'prop-types';

import ProductList from './ProductList';
import Login from './Login';
import ForgetPassword from './ForgetPassword';

const CartSwitch = ({ nowCart, goToInCart }) => {
  switch (nowCart) {
    case 'login':
      return <Login goToInCart={goToInCart} />;

    case 'forget password':
      return <ForgetPassword goToInCart={goToInCart} />;

    default: {
      return <ProductList goToInCart={goToInCart} />;
    }
  }
};

CartSwitch.propTypes = {
  nowCart: PropTypes.oneOf(['product list', 'login', 'forget password'])
    .isRequired,
  goToInCart: PropTypes.func.isRequired,
};

export default CartSwitch;
