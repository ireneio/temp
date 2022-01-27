import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';
import { CloseOutlined } from '@ant-design/icons';
import transformColor from 'color';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE } from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';
import { loadAnimation } from 'utils/addAnimation';

import OrderProductList from 'orderProductList';

import * as styles from './styles/productList';
import * as lessStyles from './styles/productList.less';

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
      loading,
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
          <CloseOutlined style={styles.closeIcon} onClick={closeDetail} />
        </div>

        <OrderProductList
          className={lessStyles.orderProductList}
          style={{
            borderLeft: `20px solid ${transformColor(colors[4]).alpha(0.15)}`,
          }}
          products={products}
          activityInfo={activityInfo}
          priceInfo={priceInfo}
          productHasError={productHasError}
          isChoosenSipment={isChoosenSipment}
          loading={loading}
        />
      </StyleRoot>
    );
  }
}
