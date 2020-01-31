import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import radium, { Style } from 'radium';

import { withTranslation } from '@store/utils/lib/i18n';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import Link from 'link';
import Placeholder from '@store/placeholder';
import PopUp from 'productList/PopUp';
import {
  ID_TYPE,
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
  COVER_IMAGE_TYPE,
} from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';

import * as styles from './styles/product';

@withTranslation('activity')
@enhancer
@radium
export default class Product extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    transformCurrency: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
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
    cart: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { cart } = nextProps;

    if (areEqual(cart, prevState.cart)) return null;

    return {
      cart,
      openModal: false,
    };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
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
      /** context */
      colors,
      transformCurrency,

      /** props */
      t,
      i18n,
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
          <div style={styles.productTitle}>
            {title[i18n.language] || title.zh_TW}
          </div>
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
          {t('purchase')}
        </div>

        <PopUp
          className="activity-group"
          title={t('select-spec')}
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
