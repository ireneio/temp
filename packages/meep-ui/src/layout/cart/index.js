import React from 'react';
import PropTypes from 'prop-types';
// FIXME remove
import { StyleRoot } from 'radium';
import warning from 'fbjs/lib/warning';
import AngleRightIcon from 'react-icons/lib/fa/angle-right';
import ArrowLeftIcon from 'react-icons/lib/md/keyboard-backspace';
import CloseIcon from 'react-icons/lib/md/close';

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
    cartIsShown: false,
    nowCart: 'product list',
    history: [],
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { isShowCart } = nextProps;

    if (isShowCart && !preState.cartIsShown) {
      return {
        cartIsShown: true,
        nowCart: 'product list',
        history: [],
      };
    }

    return null;
  }

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
    const { nowCart, history, cartIsShown } = this.state;

    if (!cartIsShown) return null;

    return (
      <div
        className={`${styles.root} ${styles[isShowCart ? 'show' : 'hide']}`}
        onAnimationEnd={() => {
          if (!isShowCart) this.setState({ cartIsShown: false });
        }}
      >
        <div className={styles.background} onClick={toggleCart(false)}>
          <AngleRightIcon
            className={styles.angleRightIcon}
            style={{
              color: colors[2],
              background: colors[4],
            }}
            onClick={toggleCart(false)}
          />
        </div>

        <StyleRoot className={styles.sidebar} style={{ background: colors[0] }}>
          <div
            className={`${styles.body} ${
              nowCart === 'product list' ? '' : styles.hasMinHeight
            }`}
          >
            <div
              className={styles.header}
              style={{
                color: colors[3],
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

              <CloseIcon className={styles.icon} onClick={toggleCart(false)} />
            </div>

            <CartSwitch
              carts={carts}
              nowCart={nowCart}
              goToInCart={this.goToInCart}
            />
          </div>
        </StyleRoot>
      </div>
    );
  }
}
