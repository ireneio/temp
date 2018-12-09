import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import radium, { Style } from 'radium';
import { Modal } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import ProductCarousel from 'productCarousel';
import ProductInfo from 'productInfo';
import {
  ID_TYPE,
  URL_TYPE,
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';

import { PURCHASE, SELECT_SPEC } from '../locale';

import * as styles from './styles/product';

@enhancer
@radium
export default class Product extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    product: PropTypes.shape({
      id: ID_TYPE.isRequired,
      title: PropTypes.shape({
        zh_TW: PropTypes.string.isRequired,
        en_US: PropTypes.string,
      }),
      galleryInfo: PropTypes.shape({
        mainId: PropTypes.string,
        media: PropTypes.arrayOf(URL_TYPE),
      }),
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          totalPrice: POSITIVE_NUMBER_TYPE.isRequired,
        }),
      ).isRequired,
    }),
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
  };

  static defaultProps = {
    product: null,
    cart: null,
  };

  state = {
    openModal: false,
  };

  componentWillReceiveProps(nextProps) {
    const { cart } = this.props;

    if (!areEqual(cart, nextProps.cart)) {
      this.setState({
        openModal: false,
      });
    }
  }

  toggleModal = () => {
    const { openModal } = this.state;

    this.setState({
      openModal: !openModal,
    });
  };

  render() {
    const { openModal } = this.state;
    const {
      colors,
      transformLocale,
      transformCurrency,
      product,
      cart,
      wishList,
      stockNotificationList,
    } = this.props;
    const { id, title, galleryInfo, variants } = product;
    const { mainId, media = [] } = galleryInfo || {};
    const imageUrl = mainId || media[0] || null;
    const totalPrice = (variants[0] || {}).totalPrice || 0;

    return (
      <div style={styles.root}>
        <Style scopeSelector=".ant-modal" rules={styles.modalStyle(colors)} />
        {imageUrl ? (
          <Image
            image={imageUrl}
            href={`/product/${id}`}
            contentWidth={100}
            newWindow={false}
            alignment="center"
          />
        ) : null}
        <div style={styles.productText}>
          <div style={styles.productTitle}>{transformLocale(title)}</div>
          <div style={styles.productPrice}>{transformCurrency(totalPrice)}</div>
        </div>
        <div
          style={[
            styles.addButton,
            {
              backgroundColor: colors[4],
              color: colors[2],
            },
          ]}
          onClick={this.toggleModal}
        >
          {transformLocale(PURCHASE)}
        </div>
        <Modal
          title={transformLocale(SELECT_SPEC)}
          visible={openModal}
          onCancel={this.toggleModal}
          footer={null}
          destroyOnClose
        >
          <div style={styles.modal}>
            <ProductCarousel
              galleryInfo={galleryInfo}
              autoPlay={false}
              thumbsPosition="bottom"
              edition="small"
            />
            <ProductInfo
              mode="list"
              productData={product}
              cart={cart}
              stockNotificationList={stockNotificationList}
              isInWishList={wishList.some(item => item.productId === id)}
              showButton={false}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
