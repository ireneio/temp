import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';

import { STORE_SETTING_TYPE, ID_TYPE } from 'constants/propTypes';
import ProductCarousel from 'productCarousel';
import ProductInfo from 'productInfo';
import ProductCollection from 'productCollection';

import { PRODUCT_TYPE } from './constants';

export default class PopUp extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,

    type: PropTypes.oneOf(['original', 'pop-up']).isRequired,
    popUpGalleryView: PropTypes.oneOf(['one', 'two', 'all', 'none']).isRequired,
    cart: PropTypes.shape({}),
    wishList: PropTypes.arrayOf(
      PropTypes.shape({
        productId: ID_TYPE.isRequired,
      }),
    ).isRequired,
    stockNotificationList: PropTypes.arrayOf(
      PropTypes.shape({
        variantId: ID_TYPE.isRequired,
      }),
    ).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,

    products: PropTypes.shape({
      data: PropTypes.arrayOf(PRODUCT_TYPE),
    }),
    target: PropTypes.string,
    isMobile: PropTypes.bool,
  };

  static defaultProps = {
    cart: null,
    products: null,
    target: null,
    isMobile: null,
  };

  generateDetails = () => {
    const {
      type,
      popUpGalleryView,
      cart,
      stockNotificationList,
      wishList,
      storeSetting,
      products,
      target,
      isMobile,
    } = this.props;

    // return if no target or products
    if (!target || !products || products instanceof Promise) return null;

    const productData = products.data.find(item => item.id === target);

    // return if no productData
    if (!productData) return null;

    if (
      storeSetting?.experiment?.productListImagePopUpEnabled &&
      type === 'pop-up'
    ) {
      return (
        <div id="modal-area">
          {['one', 'all', undefined].indexOf(popUpGalleryView) > -1 && (
            <ProductCarousel
              mode="list"
              galleries={productData.galleries}
              autoPlay={false}
              thumbsPosition="bottom"
            />
          )}
          <ProductInfo
            mode="list"
            productData={productData}
            cart={cart}
            stockNotificationList={stockNotificationList}
            isInWishList={wishList.some(item => item.productId === target)}
            showButton={false}
            container="modal-area"
            isMobile={isMobile}
          />
          {['two', 'all'].indexOf(popUpGalleryView) > -1 && (
            <ProductCollection
              mode="list"
              galleries={productData.galleries}
              align="original"
              title={productData.title}
              contentWidth={100}
            />
          )}
        </div>
      );
    }

    return (
      <div id="modal-area">
        <ProductCarousel
          mode="list"
          galleries={productData.galleries}
          autoPlay={false}
          thumbsPosition="bottom"
        />
        <ProductInfo
          mode="list"
          productData={productData}
          cart={cart}
          stockNotificationList={stockNotificationList}
          isInWishList={wishList.some(item => item.productId === target)}
          showButton={false}
          container="modal-area"
          isMobile={isMobile}
        />
      </div>
    );
  };

  render() {
    const { className, title, visible, onCancel } = this.props;

    return (
      <Modal
        className={className}
        title={title}
        visible={visible}
        onCancel={onCancel}
        footer={null}
        destroyOnClose
        centered
      >
        {this.generateDetails()}
      </Modal>
    );
  }
}
