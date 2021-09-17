import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import gql from 'graphql-tag';
import { HeartFilled, HeartOutlined, LoadingOutlined } from '@ant-design/icons';

import { withTranslation } from '@meepshop/locales';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER } from 'constants/isLogin';
import { PHONE_MEDIA } from 'constants/media';

import styles from './styles/addButton.less';
import { VARIANT_TYPE, ORDERABLE_TYPE } from './constants';

@withTranslation('product-info')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@enhancer
export default class AddButton extends React.Component {
  state = {
    loading: false,
    isMobile: false,
  };

  static propTypes = {
    t: PropTypes.func.isRequired,
    variant: VARIANT_TYPE.isRequired,
    orderable: ORDERABLE_TYPE.isRequired,
    isAddingItem: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    addToNotificationList: PropTypes.func.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    isLogin: ISLOGIN_TYPE.isRequired,
    goTo: PropTypes.func.isRequired,
    mode: PropTypes.oneOf(['list', 'detail']).isRequired,
    isMobile: PropTypes.bool.isRequired,
    openDrawer: PropTypes.func.isRequired,
    drawerOnMobile: PropTypes.bool.isRequired,
    hasSpecs: PropTypes.bool.isRequired,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      isMobile: window.matchMedia(PHONE_MEDIA.substring(7)).matches,
    });
  };

  generateAddButton = () => {
    const {
      t,
      variant,
      addToCart,
      addToNotificationList,
      orderable,
      hasStoreAppPlugin,
      isLogin,
      colors,
      goTo,
      isAddingItem,
      mode,
      openDrawer,
      drawerOnMobile,
      hasSpecs,
    } = this.props;
    const { isMobile } = this.state;
    const config = {
      className: `${styles.item} ${styles[mode]}`,
      style: {
        border: `2px solid ${colors[4]}`,
        background: colors[4],
      },
      size: 'large',
    };

    if (!variant) return null;

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
          onClick={() => {
            if (hasSpecs && isMobile && drawerOnMobile) openDrawer();
            else addToCart();
          }}
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
          disabled={variant.productNotice || isAddingItem}
        >
          {variant.productNotice ? t('notice-done') : t('notice-me')}
        </Button>
      );
    }

    return (
      <Button
        className={`${styles.item} ${styles[mode]}`}
        size="large"
        disabled
      >
        {t('sold-out')}
      </Button>
    );
  };

  addProductLToWishList = () => {
    const { adTrack, user, productId } = this.props;

    return initApollo({ name: 'store' }).mutate({
      mutation: gql`
        mutation addProductLToWishList($input: AddWishlistProductInput!) {
          addWishlistProduct(input: $input) {
            success
            wishlistProduct {
              id
              productId
            }
          }
        }
      `,
      variables: {
        input: { productId },
      },
      update: (cache, { data: { addWishlistProduct } }) => {
        if (!addWishlistProduct.success) return;

        cache.writeFragment({
          id: user.id,
          fragment: gql`
            fragment updateWishListAddCacheFragment on User {
              id
              wishList: wishlist {
                id
                productId
              }
            }
          `,
          data: {
            __typename: 'User',
            id: user.id,
            wishList: [
              ...(user?.wishList || []),
              {
                ...addWishlistProduct.wishlistProduct,
                __typename: 'WishlistProduct',
              },
            ],
          },
        });
        adTrack.addToWishList();
      },
    });
  };

  removeProductFromWishList = () => {
    const { user, productId } = this.props;

    return initApollo({ name: 'store' }).mutate({
      mutation: gql`
        mutation removeProductFromWishList(
          $input: RemoveWishlistProductInput!
        ) {
          removeWishlistProduct(input: $input) {
            success
          }
        }
      `,
      variables: {
        input: { productId },
      },
      update: (cache, { data: { removeWishlistProduct } }) => {
        if (!removeWishlistProduct.success) return;

        cache.writeFragment({
          id: user.id,
          fragment: gql`
            fragment updateWishListRemoveCacheFragment on User {
              id
              wishList: wishlist {
                id
              }
            }
          `,
          data: {
            __typename: 'User',
            id: user.id,
            wishList: (user?.wishList || []).filter(
              ({ productId: wishListProductId }) =>
                wishListProductId !== productId,
            ),
          },
        });
      },
    });
  };

  render() {
    const {
      colors,
      mode,
      isMobile,
      hasStoreAppPlugin,
      productId,
      user,
      openModal,
    } = this.props;
    const { loading } = this.state;
    const isInWishList = (user?.wishList || []).some(
      ({ productId: wishListProductId }) => wishListProductId === productId,
    );

    if (isMobile)
      return ReactDOM.createPortal(
        <div className={styles.portal}>{this.generateAddButton()}</div>,
        document.querySelector('body'),
      );

    const Icon = isInWishList ? HeartFilled : HeartOutlined;

    return (
      <>
        <div className={`${styles.root} ${styles[mode]}`}>
          {this.generateAddButton()}

          {mode === 'detail' && hasStoreAppPlugin('wishList') ? (
            <Button
              className={styles.wish}
              size="large"
              style={{
                border: `1px solid ${isInWishList ? colors[4] : colors[5]}`,
                color: isInWishList ? colors[4] : colors[5],
              }}
              onClick={async () => {
                if (user.role === 'GUEST') {
                  openModal();
                  return;
                }

                this.setState({ loading: true });

                if (isInWishList) await this.removeProductFromWishList();
                else await this.addProductLToWishList();

                this.setState({ loading: false });
              }}
              disabled={loading}
            >
              {loading ? <LoadingOutlined /> : <Icon />}
            </Button>
          ) : null}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.item},
              .${styles.item}:hover {
                color: ${colors[2]};
              }
            `,
          }}
        />
      </>
    );
  }
}
