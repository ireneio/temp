import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';

import styles from './styles/cartCount.less';

@enhancer
export default class CartCount extends React.PureComponent {
  static propTypes = {
    /** context */
    carts: PropTypes.shape({}).isRequired,

    /** props */
    showCartCount: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    const { showCartCount, carts, children } = this.props;

    if (!showCartCount) return children;

    return (
      <Badge
        className={styles.root}
        count={(carts?.categories.products || [])
          .filter(({ type }) => type === 'product')
          .reduce((result, { quantity }) => result + quantity, 0)}
        showZero={false}
      >
        {children}
      </Badge>
    );
  }
}
