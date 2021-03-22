import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import radium, { Style } from 'radium';

import { withTranslation } from '@meepshop/locales';
import { placeholderThumbnail_scaledSrc as placeholderThumbnail } from '@meepshop/images';

import { enhancer } from 'layout/DecoratorsRoot';
import Image from 'image';
import PopUp from 'productList/PopUp';
import { ID_TYPE, COLOR_TYPE, POSITIVE_NUMBER_TYPE } from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';
import { ISUSER } from 'constants/isLogin';

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
      variants: PropTypes.arrayOf(
        PropTypes.shape({
          totalPrice: POSITIVE_NUMBER_TYPE.isRequired,
        }),
      ).isRequired,
    }),
    carts: PropTypes.shape({}),
  };

  static defaultProps = {
    product: null,
    carts: null,
  };

  state = {
    openModal: false,
    target: null,
    carts: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { carts } = nextProps;

    if (areEqual(carts, prevState.carts)) return null;

    return {
      carts,
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
      isLogin,
      hasStoreAppPlugin,
    } = this.props;
    const { openModal, target, isMobile } = this.state;

    const { id, title, variants, coverImage } = product;
    const totalPrice = (variants[0] || {}).totalPrice || 0;

    return (
      <div style={styles.root}>
        <Style scopeSelector=".ant-modal" rules={styles.modalStyle(colors)} />

        <Image
          image={coverImage || { scaledSrc: placeholderThumbnail }}
          href={`/product/${id}`}
          contentWidth={100}
          newWindow={false}
          alignment="center"
          alt={title[i18n.language] || title.zh_TW}
        />

        <div style={styles.productText}>
          <div style={styles.productTitle}>
            {title[i18n.language] || title.zh_TW}
          </div>
          <div style={styles.productPrice}>
            {hasStoreAppPlugin('memberSeePrice') && isLogin !== ISUSER
              ? t('member-see-price')
              : transformCurrency(totalPrice)}
          </div>
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
          target={target}
          isMobile={isMobile}
        />
      </div>
    );
  }
}
