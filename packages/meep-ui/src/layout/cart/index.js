import React from 'react';
import PropTypes from 'prop-types';
// FIXME remove
import { StyleRoot } from 'radium';
import { warning } from 'fbjs';
import { Drawer } from 'antd';
import { angleRight as AngleRightIcon } from 'react-icons/fa';
import { keyboardBackspace as ArrowLeftIcon } from 'react-icons/md';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';

import CartSwitch from './CartSwitch';
import styles from './styles/index.less';

@enhancer
export default class Cart extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    isShowCart: PropTypes.bool.isRequired,
    toggleCart: PropTypes.func.isRequired,
    carts: PropTypes.shape({}),
  };

  static defaultProps = {
    carts: null,
  };

  state = {
    nowCart: 'product list',
    history: [],
  };

  goToInCart = (nowCart, newFrom) => {
    const { history } = this.state;

    warning(
      nowCart && newFrom,
      'The two arguments of `goToInCart` can not be undefined or null.',
    );

    this.setState({
      nowCart,
      history: [...history, newFrom],
    });
  };

  goBack = () => {
    const { history } = this.state;
    const nowCart = history.pop();

    this.setState({ nowCart, history });
  };

  render() {
    const { colors, isShowCart, toggleCart, carts } = this.props;
    const { nowCart, history } = this.state;

    return (
      <Drawer
        className={styles.root}
        visible={isShowCart}
        onClose={toggleCart(false)}
        width="100%"
      >
        <AngleRightIcon
          className={styles.angleRightIcon}
          style={{
            display: isShowCart ? 'initial' : 'none',
            color: colors[2],
            background: colors[4],
          }}
          onClick={toggleCart(false)}
        />

        <StyleRoot
          className={`${styles.body} ${
            nowCart === 'product list' ? '' : styles.hasMinHeight
          }`}
          style={{ background: colors[0], color: colors[3] }}
        >
          <div
            className={styles.header}
            style={{
              background: colors[0],
              borderBottom:
                nowCart === 'product list' ? `1px solid ${colors[5]}` : '0px',
            }}
          >
            {history.length === 0 ? (
              <div />
            ) : (
              <ArrowLeftIcon className={styles.icon} onClick={this.goBack} />
            )}
          </div>

          <CartSwitch
            carts={carts}
            nowCart={nowCart}
            goToInCart={this.goToInCart}
          />
        </StyleRoot>
      </Drawer>
    );
  }
}
