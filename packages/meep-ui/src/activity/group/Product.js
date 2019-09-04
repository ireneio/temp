import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import radium, { Style } from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import Link from 'link';
import { Placeholder } from 'placeholder';
import PopUp from 'productList/PopUp';
import {
  ID_TYPE,
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
  COVER_IMAGE_TYPE,
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
      coverImage: COVER_IMAGE_TYPE,
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
    target: null,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    const { cart } = this.props;

    if (!areEqual(cart, nextProps.cart)) {
      this.setState({ openModal: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  toggleModal = () => {
    const {
      product: { id },
    } = this.props;
    const { openModal } = this.state;

    this.setState({
      openModal: !openModal,
      target: openModal ? null : id,
    });
  };

  resize = () => {
    this.setState({
      isMobile: window.matchMedia(PHONE_MEDIA.substring(7)).matches,
    });
  };

  render() {
    const {
      colors,
      transformLocale,
      transformCurrency,
      product,
      cart,
      wishList,
      stockNotificationList,
    } = this.props;
    const { openModal, target, isMobile } = this.state;

    const { id, title, coverImage, variants } = product;
    const totalPrice = (variants[0] || {}).totalPrice || 0;

    return (
      <div style={styles.root}>
        <Style scopeSelector=".ant-modal" rules={styles.modalStyle(colors)} />
        {coverImage?.src ? (
          <Image
            image={coverImage.src}
            href={`/product/${id}`}
            contentWidth={100}
            newWindow={false}
            alignment="center"
          />
        ) : (
          <Link href={`/product/${id}`} target="_self">
            <Placeholder />
          </Link>
        )}
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

        <PopUp
          className="activity-group"
          title={transformLocale(SELECT_SPEC)}
          visible={openModal}
          onCancel={this.toggleModal}
          type="original"
          popUpGalleryView="one"
          cart={cart}
          stockNotificationList={stockNotificationList}
          wishList={wishList}
          target={target}
          isMobile={isMobile}
        />
      </div>
    );
  }
}
