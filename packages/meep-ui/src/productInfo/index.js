import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot, Style } from 'radium';
import { warning, areEqual } from 'fbjs';
import { Modal } from 'antd';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ISLOGIN_TYPE } from 'constants/propTypes';
import { ISUSER, NOTLOGIN, ISADMIN } from 'constants/isLogin';
import buildVariantsTree from 'utils/buildVariantsTree';

import * as styles from './styles';
import Description from './Description';
import SpecList from './SpecList';
import QuantityButton from './QuantityButton';
import AddButton from './AddButton';
import {
  PRODUCT_TYPE,
  ACTIVITY_TYPE,
  LIST_TYPE,
  NO_VARIANTS,
} from './constants';
import { GOTO_LOGIN, CONFIRM, CANCEL } from './locale';
import { calculateOrderable, reformatVariant } from './utils';

@enhancer
@buildVariantsTree('productData')
@radium
export default class ProductInfo extends React.PureComponent {
  name = 'product-info';

  static propTypes = {
    productData: PRODUCT_TYPE.isRequired,
    activityData: ACTIVITY_TYPE,
    stockNotificationList: LIST_TYPE.isRequired, // eslint-disable-line react/no-unused-prop-types
    isInWishList: PropTypes.bool.isRequired,
    mode: PropTypes.oneOf(['list', 'detail']),
    cart: PropTypes.shape({}),
    container: PropTypes.string,
    isMobile: PropTypes.bool,
    type: PropTypes.string,

    /** props from module */
    showButton: PropTypes.bool.isRequired,

    /** props from context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    hasStoreAppPlugin: PropTypes.func.isRequired,
    transformLocale: PropTypes.func.isRequired,
    transformCurrency: PropTypes.func.isRequired,
    addCartItems: PropTypes.func.isRequired,
    goTo: PropTypes.func.isRequired,
    dispatchAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    activityData: null,
    mode: 'detail',
    cart: null,
    container: '',
    isMobile: null,
    type: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      productData,
      cart,
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
      const variantInfo = reformatVariant(
        prevState.variantInfo,
        stockNotificationList,
      );
      return {
        variantInfo,
        isInWishList,
        cart,

        // check orderable and quantity as well
        ...calculateOrderable(variantInfo, cart, prevState.quantity),

        // change after addToCart/addToNotificationList
        ...(!areEqual(cart, prevState.cart) ||
        !areEqual(variantInfo, prevState.variantInfo)
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
        variantInfo: {},
        orderable: NO_VARIANTS,
        isInWishList,
        cart,
        ...initState,
      };
    }

    if (specs) {
      // 多規格
      const coordinates = new Array(specs.length).fill(0);
      let { variantsTree } = productData;
      coordinates.forEach(depth => {
        variantsTree = variantsTree.children[depth];
      });
      const variantInfo = reformatVariant(
        variantsTree.data.variant,
        stockNotificationList,
      );

      return {
        id,
        quantity: variantInfo.minPurchaseItems,
        coordinates,
        variantInfo,
        isInWishList,
        cart,
        ...initState,
        ...calculateOrderable(variantInfo, cart),
      };
    }

    const variantInfo = reformatVariant(variants[0], stockNotificationList);
    // 單規格
    return {
      id,
      quantity: variantInfo.minPurchaseItems,
      coordinates: null,
      variantInfo,
      isInWishList,
      cart,
      ...initState,
      ...calculateOrderable(variantInfo, cart),
    };
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
      variantInfo: variantsTree.data.variant,
    });
  };

  onChangeQuantity = value => {
    this.setState({ quantity: value });
  };

  addToCart = () => {
    const { addCartItems, productData, type } = this.props;
    const { variantInfo, quantity } = this.state;

    this.setState({ isAddingItem: true });

    addCartItems(
      [
        {
          productId: productData.id,
          variantId: variantInfo.id,
          quantity,
        },
      ],
      type,
    );
  };

  addToWishList = () => {
    const { productData, isInWishList, isLogin, dispatchAction } = this.props;

    switch (isLogin) {
      case ISADMIN:
        return;
      case NOTLOGIN:
        this.setState({ isModalOpen: true });
        break;
      case ISUSER:
        this.setState({ isAddingWish: true });
        dispatchAction('updateWishList', {
          [isInWishList ? 'remove' : 'add']: [productData.id],
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
        const { variantInfo } = this.state;

        this.setState({ isAddingItem: true });
        dispatchAction('addToNotificationList', {
          variantId: variantInfo.id,
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
      productData,
      activityData,
      mode,
      transformLocale,
      transformCurrency,
      hasStoreAppPlugin,
      cart,
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
      variantInfo,
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
          okText={transformLocale(CONFIRM)}
          cancelText={transformLocale(CANCEL)}
          onCancel={this.handleCancel}
          closable={false}
          centered
        >
          {transformLocale(GOTO_LOGIN)}
        </Modal>
        <StyleRoot>
          <div style={styles.wrapper(mode)}>
            <Description
              productData={productData}
              activityData={activityData}
              variantInfo={variantInfo}
              transformLocale={transformLocale}
              transformCurrency={transformCurrency}
              colors={colors}
              isLogin={isLogin}
              memberSeePrice={hasStoreAppPlugin('memberSeePrice')}
              mode={mode}
            />
            {coordinates && (
              <SpecList
                productData={productData}
                transformLocale={transformLocale}
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
                variantInfo={variantInfo}
                orderable={orderable}
                quantity={quantity}
                colors={colors}
                cart={cart}
                transformLocale={transformLocale}
                onChangeQuantity={onChangeQuantity}
                name={name}
                container={container}
              />
            )}
          </div>
          <AddButton
            variantInfo={variantInfo}
            orderable={orderable}
            transformLocale={transformLocale}
            addToCart={addToCart}
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
        </StyleRoot>
      </div>
    );
  }
}
