import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { warning, areEqual } from 'fbjs';
import { Modal, notification } from 'antd';

import { withTranslation } from '@meepshop/utils/lib/i18n';
import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import cartFragment from 'layout/cart/fragment';
import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER, NOTLOGIN, ISADMIN } from 'constants/isLogin';
import buildVariantsTree from 'utils/buildVariantsTree';

import * as styles from './styles';
import Description from './Description';
import SpecList from './SpecList';
import QuantityButton from './QuantityButton';
import AddButton from './AddButton';
import { PRODUCT_TYPE, LIST_TYPE, NO_VARIANTS } from './constants';
import { findCoordinates, calculateOrderable, reformatVariant } from './utils';

@withTranslation('product-info')
@withContext(AdTrackContext, adTrack => ({ adTrack }))
@enhancer
@buildVariantsTree('productData')
@radium
export default class ProductInfo extends React.PureComponent {
  name = 'product-info';

  static propTypes = {
    adTrack: PropTypes.shape({}).isRequired,
    t: PropTypes.func.isRequired,
    productData: PRODUCT_TYPE.isRequired,
    stockNotificationList: LIST_TYPE.isRequired, // eslint-disable-line react/no-unused-prop-types
    isInWishList: PropTypes.bool.isRequired,
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
    const {
      productData,
      carts,
      isInWishList,
      stockNotificationList,
    } = nextProps;

    if (!productData) return null;

    const { id, specs, variants } = productData;

    const initState = {
      isAddingItem: false,
      isAddingWish: false,
      isModalOpen: false,
    };

    /** REMAINED productData or JUST setState */
    if (id === prevState.id) {
      const variant = reformatVariant(prevState.variant, stockNotificationList);
      return {
        variant,
        isInWishList,
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

        // change after addToWishList
        ...(isInWishList !== prevState.isInWishList
          ? {
              isAddingWish: false,
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
        isInWishList,
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
        isInWishList,
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
      isInWishList,
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

  addToCart = async addProductToCartMutation => {
    const { adTrack, productData, type } = this.props;
    const { variant, quantity } = this.state;

    this.setState({ isAddingItem: true });

    await addProductToCartMutation({
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
  };

  addToWishList = () => {
    const {
      adTrack,
      productData,
      isInWishList,
      isLogin,
      dispatchAction,
    } = this.props;

    switch (isLogin) {
      case ISADMIN:
        return;
      case NOTLOGIN:
        this.setState({ isModalOpen: true });
        break;
      case ISUSER:
        this.setState({ isAddingWish: true });
        dispatchAction('updateWishList', {
          [isInWishList ? 'remove' : 'add']: productData.id,
          callback: () => {
            adTrack.addToWishList();
          },
        });
        break;
      default:
        break;
    }
  };

  addToNotificationList = () => {
    const { isLogin, dispatchAction } = this.props;

    switch (isLogin) {
      case ISADMIN:
        return;
      case NOTLOGIN:
        this.setState({ isModalOpen: true });
        break;
      case ISUSER: {
        const { variant } = this.state;

        this.setState({ isAddingItem: true });
        dispatchAction('addToNotificationList', {
          variantId: variant.id,
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
      isAddingWish,
      isModalOpen,
      isInWishList,
    } = this.state;
    const {
      name,
      onChangeSpec,
      onChangeQuantity,
      addToWishList,
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

          <Mutation
            mutation={gql`
              mutation addProductToCartMutation($search: [ChangeCart]) {
                changeCartList(changeCartList: $search) {
                  id
                  ...cartFragment
                }
              }

              ${cartFragment}
            `}
            update={(cache, { data }) => {
              const query = gql`
                query updateCartCache {
                  getCartList(search: { showDetail: true }) {
                    data {
                      ...cartFragment
                    }
                  }
                }

                ${cartFragment}
              `;

              const cart = cache.readQuery({
                query,
              });

              if (cart.getCartList.data[0] === null)
                cache.writeQuery({
                  query,
                  data: {
                    getCartList: {
                      __typename: 'OrderList',
                      data: data.changeCartList,
                    },
                  },
                });

              notification.success({ message: t('add-product-to-cart') });
            }}
          >
            {addProductToCartMutation => (
              <AddButton
                variant={variant}
                orderable={orderable}
                addToCart={() => addToCart(addProductToCartMutation)}
                addToWishList={addToWishList}
                addToNotificationList={addToNotificationList}
                colors={colors}
                hasStoreAppPlugin={hasStoreAppPlugin}
                isInWishList={isInWishList}
                isLogin={isLogin}
                goTo={goTo}
                isAddingItem={isAddingItem}
                isAddingWish={isAddingWish}
                mode={mode}
                isMobile={isMobile}
              />
            )}
          </Mutation>
        </StyleRoot>
      </div>
    );
  }
}
