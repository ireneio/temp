import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import { Button, Icon } from 'antd';

import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';

import * as styles from './styles/addButton';
import { VARIANT_TYPE, ORDERABLE_TYPE } from './constants';
import {
  LOGIN_FIRST,
  ADD_TO_CART,
  NOTICE_DONE,
  NOTICE_ME,
  SOLD_OUT,
  NO_VARIANTS,
} from './locale';

@radium
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

    if (hasStoreAppPlugin('memberSeePrice') && isLogin !== ISUSER) {
      return (
        <Button
          className="add-item"
          size="large"
          style={styles.addItemButton(mode, colors)}
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
          className="add-item"
          size="large"
          style={styles.addItemButton(mode, colors)}
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
        <Button
          className="add-item"
          size="large"
          style={styles.addItemButton(mode, colors)}
          disabled
        >
          {transformLocale(NO_VARIANTS)}
        </Button>
      );
    }

    if (hasStoreAppPlugin('productNotice')) {
      return (
        <Button
          className="add-item"
          size="large"
          style={styles.addItemButton(mode, colors)}
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
        className="add-item"
        size="large"
        style={styles.addItemButton(mode, colors, false)}
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
    } = this.props;

    return (
      <div style={styles.root(mode)}>
        {this.generateAddButton()}
        {mode === 'detail' ? (
          <Button
            className="add-wish"
            size="large"
            style={styles.addWishButton(colors, isInWishList)}
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
