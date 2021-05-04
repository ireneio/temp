import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Modal } from 'antd';
import memoizeOne from 'memoize-one';

import { withTranslation } from '@meepshop/locales';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import CartContext from '@meepshop/cart';
import ProductSpecSelector from '@meepshop/product-spec-selector';
import useAddToCartNotification from '@store/notification/lib/hooks/useAddToCartNotification';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import MobileSpecSelector from '@meepshop/product-info/lib/mobileSpecSelector';
import useVariant from '@meepshop/product-info/lib/hooks/useVariant';

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
@withHook(({ productData, carts }) =>
  useVariant(productData, {
    data: [
      {
        ...carts,
        categories: [carts?.categories],
      },
    ],
  }),
)
@withHook(() => ({
  addToCartNotification: useAddToCartNotification(),
}))
@enhancer
@radium
export default class ProductInfo extends React.PureComponent {
  name = 'product-info';

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
    // eslint-disable-next-line react/destructuring-assignment
    quantity: this.props.min,
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

    const { max, quantityInCart } = this.props;
    const { stock, maxPurchaseLimit, minPurchaseItems } = variant;
    const formatVariant = {
      ...variant,
      productNotice: stockNotificationList.some(
        item => item.variantId === variant.id,
      ),
    };

    if (max === 0)
      return {
        formatVariant,
        orderable: OUT_OF_STOCK,
      };

    if (quantityInCart >= max)
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

  componentDidMount() {
    const { adTrack, productData, variant } = this.props;

    if (productData && variant)
      adTrack.viewProduct({
        id: productData.id,
        title: productData.title,
        price: variant.totalPrice,
      });
  }

  onChangeQuantity = value => {
    this.setState({ quantity: value });
  };

  addToCart = async () => {
    const {
      adTrack,
      productData,
      type,
      addProductToCart,
      addToCartNotification,
      variant,
    } = this.props;
    const { quantity } = this.state;

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
    addToCartNotification();
    this.setState({ isAddingItem: false });
  };

  addToNotificationList = async () => {
    const { isLogin, stockNotificationList, variant } = this.props;

    switch (isLogin) {
      case ISADMIN:
        return;
      case NOTLOGIN:
        this.setState({ isModalOpen: true });
        break;
      case ISUSER:
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

    const { setVariant, min, max } = this.props;
    const { quantity } = this.state;
    const newQuantity = (() => {
      if (max === 0) return quantity;

      if (quantity > max) return max;

      if (quantity < min) return min;

      return quantity;
    })();

    setVariant(variant);
    this.setState({ quantity: newQuantity });
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
      variant,
      min,
      max,
      quantityInCart,
    } = this.props;
    const { quantity, isAddingItem, isModalOpen, isDrawerOpen } = this.state;
    const { formatVariant, orderable } = this.format(
      carts,
      stockNotificationList,
      variant,
    );

    return (
      <div style={styles.root(mode)} className={this.name}>
        <Style
          scopeSelector={`.${this.name}`}
          rules={styles.infoStyle(colors, showButton)}
        />
        <Modal
          className={this.name}
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
              onChangeQuantity={this.onChangeQuantity}
              name={this.name}
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
            addToCart={this.addToCart}
            addToNotificationList={this.addToNotificationList}
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
              visible={isDrawerOpen}
              onClose={() => this.setState({ isDrawerOpen: false })}
              addProductToCart={this.addToCart}
              min={min > quantityInCart ? min - quantityInCart : 1}
              max={max > quantityInCart ? max - quantityInCart : 0}
              quantity={quantity}
              onChangeQuantity={this.onChangeQuantity}
            >
              <ProductSpecSelector
                product={productData}
                unfoldedVariants={unfoldedVariantsOnMobile}
                value={variant}
                onChange={this.onChangeVariant}
              />
            </MobileSpecSelector>
          )}
        </StyleRoot>
      </div>
    );
  }
}
