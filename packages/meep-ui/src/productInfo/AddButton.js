import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';

import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import styles from './styles/addButton.less';
import { VARIANT_TYPE, ORDERABLE_TYPE } from './constants';

@withTranslation('product-info')
export default class AddButton extends React.Component {
  static propTypes = {
    t: PropTypes.func.isRequired,
    variantInfo: VARIANT_TYPE.isRequired,
    orderable: ORDERABLE_TYPE.isRequired,
    isInWishList: PropTypes.bool.isRequired,
    isAddingItem: PropTypes.bool.isRequired,
    isAddingWish: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    addToWishList: PropTypes.func.isRequired,
    addToNotificationList: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    goTo: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['list', 'detail']).isRequired,
    isMobile: PropTypes.bool.isRequired,
  };

  generateAddButton = () => {
    const {
      t,
      variantInfo,
      addToCart,
      addToNotificationList,
      orderable,
      hasStoreAppPlugin,
      isLogin,
      colors,
      goTo,
      isAddingItem,
      mode,
    } = this.props;
    const config = {
      className: `color-2 color-2-hover ${styles.item} ${styles[mode]}`,
      style: {
        border: `2px solid ${colors[4]}`,
        background: colors[4],
      },
      size: 'large',
    };

    if (hasStoreAppPlugin('memberSeePrice') && isLogin !== ISUSER) {
      return (
        <Button
          {...config}
          onClick={() => {
            goTo({ pathname: '/login' });
          }}
        >
          {t('login-first')}
        </Button>
      );
    }

    if (orderable === 'ORDERABLE') {
      return (
        <Button
          {...config}
          onClick={addToCart}
          loading={isAddingItem}
          disabled={isAddingItem}
        >
          {t('add-to-cart')}
        </Button>
      );
    }

    if (orderable === 'NO_VARIANTS') {
      return (
        <Button {...config} disabled>
          {t('no-variants')}
        </Button>
      );
    }

    if (hasStoreAppPlugin('productNotice')) {
      return (
        <Button
          {...config}
          loading={isAddingItem}
          onClick={addToNotificationList}
          disabled={variantInfo.productNotice || isAddingItem}
        >
          {variantInfo.productNotice ? t('notice-done') : t('notice-me')}
        </Button>
      );
    }

    return (
      <Button
        {...config}
        style={{
          border: `2px solid ${colors[4]}`,
          background: '#CCC',
        }}
        disabled
      >
        {t('sold-out')}
      </Button>
    );
  };

  render() {
    const {
      isInWishList,
      colors,
      addToWishList,
      isAddingWish,
      mode,
      isMobile,
    } = this.props;

    return isMobile ? (
      ReactDOM.createPortal(
        <div className={styles.portal}>{this.generateAddButton()}</div>,
        document.querySelector('body'),
      )
    ) : (
      <div className={`${styles.root} ${styles[mode]}`}>
        {this.generateAddButton()}
        {mode === 'detail' ? (
          <Button
            className={styles.wish}
            size="large"
            style={{
              border: `1px solid ${isInWishList ? colors[4] : colors[5]}`,
              color: isInWishList ? colors[4] : colors[5],
            }}
            onClick={addToWishList}
            loading={isAddingWish}
            disabled={isAddingWish}
          >
            {isAddingWish ? null : (
              <Icon type="heart" theme={isInWishList ? 'filled' : 'outlined'} />
            )}
          </Button>
        ) : null}
      </div>
    );
  }
}
