import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { warning, areEqual } from 'fbjs';
import { Modal, notification } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import initApollo from '@meepshop/apollo/lib/utils/initApollo';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import CartContext from '@meepshop/cart';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER, NOTLOGIN, ISADMIN } from 'constants/isLogin';
import buildVariantsTree from 'utils/buildVariantsTree';

import * as styles from './styles';
import Description from './Description';
import SpecList from './SpecList';
import QuantityButton from './QuantityButton';
import AddButton from './AddButton';
import { PRODUCT_TYPE, NO_VARIANTS } from './constants';
import { findCoordinates, calculateOrderable, reformatVariant } from './utils';

@withTranslation('product-info')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@withContext(CartContext)
@enhancer
@buildVariantsTree('productData')
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

    /** props from context */
    carts: PropTypes.shape({}),
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    mode: 'detail',
    carts: null,
    container: {},
    isMobile: null,
    type: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { productData, carts, stockNotificationList } = nextProps;

    if (!productData) return null;

    const { id, specs, variants } = productData;

    const initState = {
      isAddingItem: false,
      isModalOpen: false,
    };

    /** REMAINED productData or JUST setState */
    if (id === prevState.id) {
      const variant = reformatVariant(prevState.variant, stockNotificationList);
      return {
        variant,
        carts,

        // check orderable and quantity as well
        ...calculateOrderable(variant, carts, prevState.quantity),

        // change after addToCart/addToNotificationList
        ...(!areEqual(carts, prevState.carts) ||
        !areEqual(variant, prevState.variant)
          ? {
              isAddingItem: false,
            }
          : {}),
      };
    }

    /** UPDATED productData */
    if (!variants.length) {
      // 關閉多規格商品全部規格 variants 可為空陣列
      return {
        id,
        quantity: null,
        coordinates: null,
        variant: {},
        orderable: NO_VARIANTS,
        carts,
        ...initState,
      };
    }

    if (specs) {
      // 多規格
      const variantsLeaves = productData.variantsTree.leaves();
      const variantNode =
        variantsLeaves.find(
          ({
            data: {
              variant: { stock },
            },
          }) => stock > 0,
        ) || variantsLeaves[0];
      const variant = reformatVariant(
        variantNode.data.variant,
        stockNotificationList,
      );

      return {
        id,
        quantity: variant.minPurchaseItems,
        coordinates: findCoordinates(variantNode),
        variant,
        carts,
        ...initState,
        ...calculateOrderable(variant, carts),
      };
    }

    const variant = reformatVariant(variants[0], stockNotificationList);
    // 單規格
    return {
      id,
      quantity: variant.minPurchaseItems,
      coordinates: null,
      variant,
      carts,
      ...initState,
      ...calculateOrderable(variant, carts),
    };
  }

  componentDidMount() {
    const { adTrack, productData } = this.props;
    const { variant } = this.state;

    if (!productData) return;

    adTrack.viewProduct({
      id: productData.id,
      title: productData.title,
      price: variant.totalPrice,
    });
  }

  onChangeSpec = (level, value) => {
    const { coordinates, isAddingItem } = this.state;
    let {
      productData: { variantsTree },
    } = this.props;
    if (coordinates[level] === value || isAddingItem) return;
    coordinates[level] = value;
    const newCoordinates = coordinates.map(depth => {
      /* eslint-disable no-param-reassign */
      if (!variantsTree.children[depth]) depth = 0;
      /* eslint-enable no-param-reassign */
      variantsTree = variantsTree.children[depth];
      return depth;
    });
    this.setState({
      coordinates: newCoordinates,
      variant: variantsTree.data.variant,
    });
  };

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
  };

  addToNotificationList = () => {
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
        initApollo({ name: 'store' }).mutate({
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
      colors,
      isLogin,
      isMobile,
    } = this.props;
    const {
      coordinates,
      quantity,
      variant,
      orderable,
      isAddingItem,
      isModalOpen,
    } = this.state;
    const {
      name,
      onChangeSpec,
      onChangeQuantity,
      addToCart,
      addToNotificationList,
    } = this;

    if (!productData || !productData.status) {
      warning(
        process.env.NODE_ENV === 'production',
        'Illegal prop: [productData] has been found in ProductInfo.',
      );

      return null;
    }

    return (
      <div style={styles.root(mode)} className={name}>
        <Style scopeSelector={`.${name}`} rules={styles.infoStyle(colors)} />
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
              variant={variant}
              transformCurrency={transformCurrency}
              colors={colors}
              isLogin={isLogin}
              memberSeePrice={hasStoreAppPlugin('memberSeePrice')}
              mode={mode}
            />
            {coordinates && (
              <SpecList
                productData={productData}
                colors={colors}
                showButton={showButton}
                coordinates={coordinates}
                onChangeSpec={onChangeSpec}
                mode={mode}
                name={name}
                container={container}
              />
            )}
            {quantity !== null && (
              <QuantityButton
                variant={variant}
                orderable={orderable}
                quantity={quantity}
                colors={colors}
                onChangeQuantity={onChangeQuantity}
                name={name}
                container={container}
              />
            )}
          </div>

          <AddButton
            productId={productData.id}
            variant={variant}
            orderable={orderable}
            openModal={() => this.setState({ isModalOpen: true })}
            addToCart={addToCart}
            addToNotificationList={addToNotificationList}
            colors={colors}
            hasStoreAppPlugin={hasStoreAppPlugin}
            isLogin={isLogin}
            goTo={goTo}
            isAddingItem={isAddingItem}
            mode={mode}
            isMobile={isMobile}
          />
        </StyleRoot>
      </div>
    );
  }
}
