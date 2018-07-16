import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { Button } from 'antd';
import CloseIcon from 'react-icons/lib/md/close';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';
import { loadAnimation } from 'utils/addAnimation';

import OrderProductList from 'orderProductList';

import * as LOCALE from './locale';
import * as styles from './styles/productList';

@enhancer
@radium
export default class ProductList extends React.PureComponent {
  isComponentMounted = false;

  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,

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

  updateProducts = ({ productId, quantity }) => {
    const { products, updateProducts } = this.props;
    const newProducts = products.reduce(
      (result, { productId: id, quantity: preQuantity, ...product }) => {
        if (id === productId && quantity === 0) return result;

        return [
          ...result,
          {
            ...product,
            productId: id,
            quantity: id === productId ? quantity : preQuantity,
          },
        ];
      },
      [],
    );

    updateProducts(newProducts);
  };

  render() {
    const {
      colors,
      transformLocale,
      goTo,
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
        >
          <Button type="primary" onClick={() => goTo({ back: true })}>
            {transformLocale(LOCALE.CONTINUE_SHOPPING)}
          </Button>
        </OrderProductList>
      </StyleRoot>
    );
  }
}
