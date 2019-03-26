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
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
  GALLERY_TYPE,
} from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';

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
      galleries: GALLERY_TYPE.isRequired,
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

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    const { cart } = this.props;

    if (!areEqual(cart, nextProps.cart)) {
      this.setState({
        openModal: false,
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  toggleModal = () => {
    const { openModal } = this.state;

    this.setState({
      openModal: !openModal,
    });
  };

  resize = () => {
    this.setState({
      isMobile: window.matchMedia(PHONE_MEDIA.substring(7)).matches,
    });
  };

  render() {
    const { openModal, isMobile } = this.state;
    const {
      colors,
      transformLocale,
      transformCurrency,
      product,
      cart,
      wishList,
      stockNotificationList,
    } = this.props;
    const { id, title, galleries, variants } = product;
    const imageSrc =
      galleries?.[0]?.mainImage?.src ||
      ((galleries?.[0]?.images || []).find(image => image?.src) || {}).src;
    const totalPrice = (variants[0] || {}).totalPrice || 0;

    return (
      <div style={styles.root}>
        <Style scopeSelector=".ant-modal" rules={styles.modalStyle(colors)} />
        {imageSrc ? (
          <Image
            image={imageSrc}
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
          centered
        >
          <div id="modal-area">
            <ProductCarousel
              mode="list"
              galleries={galleries}
              autoPlay={false}
              thumbsPosition="bottom"
            />
            <ProductInfo
              mode="list"
              productData={product}
              cart={cart}
              stockNotificationList={stockNotificationList}
              isInWishList={wishList.some(item => item.productId === id)}
              showButton={false}
              container="modal-area"
              isMobile={isMobile}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
