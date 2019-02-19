import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';

import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import styles from './styles/addButton.less';
import { VARIANT_TYPE, ORDERABLE_TYPE } from './constants';
import {
  LOGIN_FIRST,
  ADD_TO_CART,
  NOTICE_DONE,
  NOTICE_ME,
  SOLD_OUT,
  NO_VARIANTS,
} from './locale';

export default class AddButton extends React.Component {
  static propTypes = {
    variantInfo: VARIANT_TYPE.isRequired,
    orderable: ORDERABLE_TYPE.isRequired,
    isInWishList: PropTypes.bool.isRequired,
    isAddingItem: PropTypes.bool.isRequired,
    isAddingWish: PropTypes.bool.isRequired,
    transformLocale: PropTypes.func.isRequired,
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
      variantInfo,
      transformLocale,
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
          {transformLocale(LOGIN_FIRST)}
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
          {transformLocale(ADD_TO_CART)}
        </Button>
      );
    }

    if (orderable === 'NO_VARIANTS') {
      return (
        <Button {...config} disabled>
          {transformLocale(NO_VARIANTS)}
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
          {variantInfo.productNotice
            ? transformLocale(NOTICE_DONE)
            : transformLocale(NOTICE_ME)}
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
        {transformLocale(SOLD_OUT)}
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
