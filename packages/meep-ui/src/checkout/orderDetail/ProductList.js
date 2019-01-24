import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { close as CloseIcon } from 'react-icons/md';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';
import { loadAnimation } from 'utils/addAnimation';

import OrderProductList from 'orderProductList';

import * as styles from './styles/productList';

@enhancer
@radium
export default class ProductList extends React.PureComponent {
  isComponentMounted = false;

  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    activityInfo: PropTypes.arrayOf(PropTypes.shape({})),
    priceInfo: PropTypes.shape({}),
    isChoosenSipment: PropTypes.bool,
    showDetail: PropTypes.bool.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
    productHasError: PropTypes.bool.isRequired,
    updateProducts: PropTypes.func.isRequired,
    closeDetail: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activityInfo: null,
    priceInfo: {},
    isChoosenSipment: false,
  };

  componentDidMount() {
    this.isComponentMounted = true;
  }

  updateProducts = ({ cartId, quantity }) => {
    const { products, updateProducts } = this.props;

    updateProducts(
      products.reduce(
        (result, { cartId: id, quantity: preQuantity, ...product }) => {
          if (id === cartId && quantity === 0) return result;

          return [
            ...result,
            {
              ...product,
              cartId: id,
              quantity: id === cartId ? quantity : preQuantity,
            },
          ];
        },
        [],
      ),
    );
  };

  render() {
    const {
      colors,
      showDetail,
      products,
      activityInfo,
      priceInfo,
      productHasError,
      isChoosenSipment,
      closeDetail,
    } = this.props;

    return (
      <StyleRoot
        style={[
          styles.root(colors),
          this.isComponentMounted ? {} : styles.stopAnimation,
          {
            [PHONE_MEDIA]:
              styles.rootAnimation[showDetail ? 'hideToShow' : 'showToHide'],
          },
        ]}
      >
        {loadAnimation(Object.values(styles.rootAnimation))}

        <div style={styles.closeIconRoot(colors)}>
          <CloseIcon style={styles.closeIcon} onClick={closeDetail} />
        </div>

        <OrderProductList
          style={styles.orderProductList(colors, showDetail)}
          products={products}
          activityInfo={activityInfo}
          priceInfo={priceInfo}
          productHasError={productHasError}
          isChoosenSipment={isChoosenSipment}
          onChange={this.updateProducts}
        />
      </StyleRoot>
    );
  }
}
