import React from 'react';
import PropTypes from 'prop-types';
import areEqual from 'fbjs/lib/areEqual';
import radium from 'radium';

import { enhancer } from 'layout';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/cartCount';

@enhancer
@radium
export default class CartCount extends React.Component {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        quantity: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['product', 'gift']).isRequired,
      }).isRequired,
    ).isRequired,
    expandSubItem: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps) {
    return (
      !areEqual(this.props.products, nextProps.products) ||
      this.props.expandSubItem !== nextProps.expandSubItem
    );
  }

  render() {
    const { colors, products, expandSubItem } = this.props;

    return (
      <div style={styles.root(colors, expandSubItem)}>
        {products
          .filter(({ type }) => type === 'product')
          .reduce((result, { quantity }) => result + quantity, 0)}
      </div>
    );
  }
}
