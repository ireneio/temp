import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import ProductInfo from 'productInfo';
import ProductCarousel from 'productCarousel';
import ProductCollection from 'productCollection';

import { PRODUCT_TYPE } from './constants';
import * as styles from './styles';

@enhancer // FIX: unnecessary with new context api
@radium
export default class ProductSet extends React.PureComponent {
  static propTypes = {
    productData: PRODUCT_TYPE,
    showButton: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    productData: null,
  };

  render() {
    const { productData, showButton } = this.props;

    return (
      <StyleRoot>
        <div style={styles.root}>
          <div style={styles.half}>
            <ProductCarousel
              coverImage={productData.coverImage}
              galleries={productData.galleries}
              autoPlay={false}
              thumbsPosition="none"
            />
          </div>
          <div style={styles.half}>
            <ProductInfo productData={productData} showButton={showButton} />
          </div>
          <div style={styles.block}>
            <ProductCollection
              galleries={productData.galleries}
              align="original"
              title={productData.title}
            />
          </div>
        </div>
      </StyleRoot>
    );
  }
}
