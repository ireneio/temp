import React from 'react';
import PropTypes from 'prop-types';
// FIXME remove
import { StyleRoot } from 'radium';
import { warning } from 'fbjs';
import {
  ArrowLeftOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Spin, Drawer } from 'antd';

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
    const { colors, isShowCart, toggleCart, isCartUpdating } = this.props;
    const { nowCart, history } = this.state;

    return (
      <Drawer
        className={styles.root}
        visible={isShowCart}
        closable={false}
        onClose={() => toggleCart(false)}
        width="100vw"
      >
        <Spin
          wrapperClassName={styles.spin}
          spinning={isCartUpdating}
          indicator={<LoadingOutlined spin />}
        >
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
                <ArrowLeftOutlined
                  className={styles.icon}
                  onClick={this.goBack}
                />
              )}
              <CloseOutlined
                className={styles.closeIcon}
                onClick={() => toggleCart(false)}
              />
            </div>

            <CartSwitch nowCart={nowCart} goToInCart={this.goToInCart} />
          </StyleRoot>
        </Spin>
      </Drawer>
    );
  }
}
