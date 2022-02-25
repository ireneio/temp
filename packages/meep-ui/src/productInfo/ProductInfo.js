import React from 'react';
import Notification from 'rc-notification';
import { gql, useApolloClient } from '@apollo/client';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Modal } from 'antd';
import memoizeOne from 'memoize-one';

import { AddToCartIcon } from '@meepshop/icons';
import { withTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import ProductSpecSelector from '@meepshop/product-spec-selector';
import withContext from '@store/utils/lib/withContext';
import withHook from '@store/utils/lib/withHook';
import MobileSpecSelector from '@meepshop/product-info/lib/mobileSpecSelector';
import useVariant from '@meepshop/product-info/lib/hooks/useVariant';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER, NOTLOGIN } from 'constants/isLogin';

import * as styles from './styles';
import lessStyles from './styles/productInfo.less';
import Description from './Description';
import QuantityButton from './QuantityButton';
import AddButton from './AddButton';
import { PRODUCT_TYPE, LIMITED, ORDERABLE, OUT_OF_STOCK } from './constants';

@withTranslation('product-info')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@enhancer
@withHook(({ productData, carts }) => useVariant(productData, carts))
@withHook(() => ({
  client: useApolloClient(),
  router: useRouter(),
}))
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
  };

  static defaultProps = {
    mode: 'detail',
    container: {},
    isMobile: null,
    type: null,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    quantity: this.props.variant?.currentMinPurchasableQty,
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

    const { quantityInCart } = this.props;
    const { currentMinPurchasableQty, currentMaxPurchasableQty } = variant;
    const formatVariant = {
      ...variant,
      productNotice: stockNotificationList.some(
        item => item.variantId === variant.id,
      ),
    };

    if (currentMinPurchasableQty === 0)
      return {
        formatVariant,
        orderable: OUT_OF_STOCK,
      };

    if (quantityInCart >= currentMaxPurchasableQty)
      return {
        formatVariant,
        orderable: LIMITED,
      };

    return {
      formatVariant,
      orderable: ORDERABLE,
    };
  });

  componentDidMount() {
    const { adTrack, productData, variant } = this.props;

    if (productData && variant)
      adTrack.viewProduct({
        id: productData.id,
        title: productData.title,
        price: variant.retailPrice,
      });
  }

  onChangeQuantity = value => {
    this.setState({ quantity: value });
  };

  addToCart = async () => {
    const {
      adTrack,
      t,
      colors,
      productData,
      type,
      upsertCart,
      variant,
    } = this.props;
    const { quantity } = this.state;

    this.setState({ isAddingItem: true });

    await upsertCart({
      __typename: 'CartItem',
      productId: productData.id,
      quantity,
      variantId: variant.id,
    });

    adTrack.addToCart({
      eventName: type === 'pop-up' ? 'ec-popup' : 'ec',
      id: productData.id,
      title: productData.title,
      quantity,
      specs: variant.specs,
      price: variant.retailPrice,
    });

    Notification.newInstance(
      {
        prefixCls: lessStyles.root,
        style: {},
      },
      notification => {
        notification.notice({
          content: (
            <>
              <div className={lessStyles.wrapper}>
                <AddToCartIcon />
                {t('added-to-cart')}
              </div>

              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    .${lessStyles.wrapper} {
                      background-color: ${colors[3]};
                      color: ${colors[0]};
                    }
                  `,
                }}
              />
            </>
          ),
          onClose: () => notification.destroy(),
        });
      },
    );

    this.setState({ isAddingItem: false });
  };

  addToNotificationList = async () => {
    const { client, isLogin, stockNotificationList, variant } = this.props;

    switch (isLogin) {
      case NOTLOGIN:
        this.setState({ isModalOpen: true });
        break;
      case ISUSER:
        this.setState({ isAddingItem: true });
        await client.mutate({
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

    const { setVariant } = this.props;
    const { quantity } = this.state;
    const { currentMinPurchasableQty, currentMaxPurchasableQty } = variant;
    const newQuantity = (() => {
      if (currentMaxPurchasableQty === 0) return quantity;

      if (quantity > currentMaxPurchasableQty) return currentMaxPurchasableQty;

      if (quantity < currentMinPurchasableQty) return currentMinPurchasableQty;

      return quantity;
    })();

    setVariant(variant);
    this.setState({ quantity: newQuantity });
  };

  render() {
    const {
      t,
      router,
      productData,
      mode,
      transformCurrency,
      hasStoreAppPlugin,
      container,
      showButton,
      drawerOnMobile,
      unfoldedVariantsOnMobile,
      colors,
      isLogin,
      isMobile,
      carts,
      stockNotificationList,
      variant,
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
            router.push('/login');
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
              quantity={quantity}
              quantityInCart={quantityInCart}
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
