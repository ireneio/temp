import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Modal, notification } from 'antd';
import memoizeOne from 'memoize-one';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import CartContext from '@meepshop/cart';
import ProductSpecSelector from '@meepshop/product-spec-selector';
import withContext from '@store/utils/lib/withContext';
import MobileSpecSelector from '@meepshop/product-info/lib/mobileSpecSelector';
import { getQuantityRange } from '@meepshop/product-amount-select/lib/hooks/useOptions';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER, NOTLOGIN, ISADMIN } from 'constants/isLogin';

import * as styles from './styles';
import Description from './Description';
import QuantityButton from './QuantityButton';
import AddButton from './AddButton';
import { PRODUCT_TYPE, LIMITED, ORDERABLE, OUT_OF_STOCK } from './constants';

@withTranslation('product-info')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(CartContext)
@enhancer
@radium
export default class ProductInfo extends React.PureComponent {
  name = 'product-info';

  isViewProduct = false;

  static propTypes = {
    adTrack: PropTypes.shape({}).isRequired,
    t: PropTypes.func.isRequired,
    productData: PRODUCT_TYPE.isRequired,
    mode: PropTypes.oneOf(['list', 'detail']),
    container: PropTypes.shape({}),
    isMobile: PropTypes.bool,
    type: PropTypes.string,

    /** props from module */
    showButton: PropTypes.bool.isRequired,
    drawerOnMobile: PropTypes.bool.isRequired,
    unfoldedVariantsOnMobile: PropTypes.bool.isRequired,

    /** props from context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    mode: 'detail',
    container: {},
    isMobile: null,
    type: null,
  };

  state = {
    quantity: 0,
    variant: null,
    isAddingItem: false,
    isDrawerOpen: false,
    isModalOpen: false,
  };

  format = memoizeOne((carts, stockNotificationList, variant) => {
    if (!variant)
      return {
        variant,
        orderable: OUT_OF_STOCK,
      };

    const { id, stock, maxPurchaseLimit, minPurchaseItems } = variant;
    const { max } = getQuantityRange(variant);
    const productNotice = stockNotificationList.some(
      item => item.variantId === variant.id,
    );
    const formatVariant = {
      ...variant,
      productNotice,
    };

    if (max === 0)
      return {
        formatVariant,
        orderable: OUT_OF_STOCK,
      };

    const variantInCart = carts?.categories.products.find(
      product => product.variantId === id,
    );
    const quantityInCart = variantInCart?.quantity || 0;

    if (quantityInCart > max)
      return {
        formatVariant,
        orderable: LIMITED,
      };

    return {
      formatVariant: {
        ...formatVariant,
        maxPurchaseLimit:
          maxPurchaseLimit > quantityInCart
            ? maxPurchaseLimit - quantityInCart
            : 0,
        minPurchaseItems:
          minPurchaseItems > quantityInCart
            ? minPurchaseItems - quantityInCart
            : 1,
        stock: stock > quantityInCart ? stock - quantityInCart : 0,
      },
      orderable: ORDERABLE,
    };
  });

  onChangeQuantity = value => {
    this.setState({ quantity: value });
  };

  addToCart = async () => {
    const { t, adTrack, productData, type, addProductToCart } = this.props;
    const { variant, quantity } = this.state;

    this.setState({ isAddingItem: true });
    await addProductToCart({
      variables: {
        search: {
          productsInfo: {
            createData: {
              productId: productData.id,
              variantId: variant.id,
              quantity,
            },
          },
        },
      },
    });
    adTrack.addToCart({
      eventName: type === 'pop-up' ? 'ec-popup' : 'ec',
      id: productData.id,
      title: productData.title,
      quantity,
      specs: variant.specs,
      price: variant.totalPrice,
    });
    notification.success({ message: t('add-product-to-cart') });
    this.setState({ isAddingItem: false });
  };

  addToNotificationList = async () => {
    const { isLogin, stockNotificationList } = this.props;

    switch (isLogin) {
      case ISADMIN:
        return;
      case NOTLOGIN:
        this.setState({ isModalOpen: true });
        break;
      case ISUSER: {
        const { variant } = this.state;

        this.setState({ isAddingItem: true });
        await initApollo({ name: 'store' }).mutate({
          mutation: gql`
            mutation addStockNotificationList(
              $updateStockNotificationList: [UpdateStockNotification]
            ) {
              updateStockNotificationList(
                updateStockNotificationList: $updateStockNotificationList
              ) {
                variantId
              }
            }
          `,
          variables: {
            updateStockNotificationList: {
              variantId: variant.id,
            },
          },
          update: (cache, { data: { updateStockNotificationList } }) => {
            if (updateStockNotificationList.length === 0) return;

            cache.writeQuery({
              query: gql`
                query updateStockNotification {
                  getStockNotificationList {
                    data {
                      variantId
                    }
                  }
                }
              `,
              data: {
                getStockNotificationList: {
                  __typename: 'StockNotificationList',
                  data: [
                    ...stockNotificationList,
                    ...updateStockNotificationList,
                  ],
                },
              },
            });
          },
        });
        this.setState({ isAddingItem: false });
        break;
      }
      default:
        break;
    }
  };

  handleCancel = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  onChangeVariant = variant => {
    if (!variant) return;

    const { adTrack, productData } = this.props;
    const { quantity } = this.state;
    const { min, max } = getQuantityRange(variant);
    const newQuantity = (() => {
      if (max === 0) return quantity;

      if (quantity > max) return max;

      if (quantity < min) return min;

      return quantity;
    })();

    this.setState({
      variant,
      quantity: newQuantity,
    });

    if (this.isViewProduct) return;

    adTrack.viewProduct({
      id: productData.id,
      title: productData.title,
      price: variant.totalPrice,
    });
    this.isViewProduct = true;
  };

  render() {
    const {
      t,
      productData,
      mode,
      transformCurrency,
      hasStoreAppPlugin,
      container,
      goTo,
      showButton,
      drawerOnMobile,
      unfoldedVariantsOnMobile,
      colors,
      isLogin,
      isMobile,
      carts,
      stockNotificationList,
    } = this.props;
    const {
      quantity,
      variant,
      isAddingItem,
      isModalOpen,
      isDrawerOpen,
    } = this.state;
    const { name, onChangeQuantity, addToCart, addToNotificationList } = this;
    const { formatVariant, orderable } = this.format(
      carts,
      stockNotificationList,
      variant,
    );

    return (
      <div style={styles.root(mode)} className={name}>
        <Style
          scopeSelector={`.${name}`}
          rules={styles.infoStyle(colors, showButton)}
        />
        <Modal
          className={name}
          visible={isModalOpen}
          onOk={() => {
            goTo({ pathname: '/login' });
          }}
          okText={t('confirm')}
          cancelText={t('cancel')}
          onCancel={this.handleCancel}
          closable={false}
          centered
        >
          {t('goto-login')}
        </Modal>

        <StyleRoot>
          <div style={styles.wrapper(mode)}>
            <Description
              productData={productData}
              variant={formatVariant}
              transformCurrency={transformCurrency}
              colors={colors}
              isLogin={isLogin}
              memberSeePrice={hasStoreAppPlugin('memberSeePrice')}
              mode={mode}
            />

            <ProductSpecSelector
              product={productData}
              unfoldedVariants={showButton}
              value={variant}
              onChange={this.onChangeVariant}
            />

            <QuantityButton
              variant={formatVariant}
              orderable={orderable}
              quantity={quantity}
              colors={colors}
              onChangeQuantity={onChangeQuantity}
              name={name}
              container={container}
              unfoldedVariants={showButton}
            />
          </div>

          <AddButton
            productId={productData.id}
            variant={formatVariant}
            orderable={orderable}
            openModal={() => this.setState({ isModalOpen: true })}
            openDrawer={() => this.setState({ isDrawerOpen: true })}
            addToCart={addToCart}
            addToNotificationList={addToNotificationList}
            colors={colors}
            hasStoreAppPlugin={hasStoreAppPlugin}
            isLogin={isLogin}
            goTo={goTo}
            isAddingItem={isAddingItem}
            mode={mode}
            isMobile={isMobile}
            drawerOnMobile={drawerOnMobile}
            hasSpecs={Boolean(productData.specs?.length)}
          />

          {!drawerOnMobile ? null : (
            <MobileSpecSelector
              product={productData}
              variant={variant}
              unfoldedVariantsOnMobile={unfoldedVariantsOnMobile}
              visible={isDrawerOpen}
              orderable={orderable}
              quantity={quantity}
              addToCart={addToCart}
              onClose={() => this.setState({ isDrawerOpen: false })}
              onChangeVariant={this.onChangeVariant}
              onChangeQuantity={onChangeQuantity}
            />
          )}
        </StyleRoot>
      </div>
    );
  }
}
