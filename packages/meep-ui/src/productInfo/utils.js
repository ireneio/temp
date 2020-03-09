import { ORDERABLE, OUT_OF_STOCK, LIMITED } from './constants';

export const findCoordinates = variantNode =>
  !variantNode.parent
    ? []
    : [
        ...findCoordinates(variantNode.parent),
        variantNode.parent.children.findIndex(node => node === variantNode),
      ];

export const reformatVariant = (variantInfo, stockNotificationList) => {
  let { maxPurchaseLimit, minPurchaseItems } = variantInfo;

  // minPurchaseItems 最小需等於 1
  minPurchaseItems = minPurchaseItems > 0 ? minPurchaseItems : 1;

  // maxPurchaseLimit 最小需等於 minPurchaseItems
  if (typeof maxPurchaseLimit === 'number') {
    maxPurchaseLimit =
      maxPurchaseLimit > minPurchaseItems ? maxPurchaseLimit : minPurchaseItems;
  } else {
    maxPurchaseLimit = variantInfo.stock;
  }

  return {
    ...variantInfo,
    minPurchaseItems,
    maxPurchaseLimit,
    productNotice: stockNotificationList.some(
      item => item.variantId === variantInfo.id,
    ),
  };
};

export const calculateOrderable = (variantInfo, cart, quantity) => {
  const { id, stock, minPurchaseItems, maxPurchaseLimit } = variantInfo;

  // 第一步：庫存（有庫存且大於最低購買量）
  if (stock && stock >= minPurchaseItems) {
    const variantInCart =
      cart &&
      cart.categories.products.find(product => product.variantId === id);
    const quantityInCart = variantInCart ? variantInCart.quantity : 0;

    // 第二步： 購物車內含量（不超過最高購買量或庫存）
    if (quantityInCart >= maxPurchaseLimit || quantityInCart >= stock) {
      return {
        orderable: LIMITED,
      };
    }

    // 上限為最高購買量或庫存，取低減購物車內含量
    const max =
      maxPurchaseLimit < stock
        ? maxPurchaseLimit - quantityInCart
        : stock - quantityInCart;
    // 下限為最低購買量減購物車內含量
    const min =
      minPurchaseItems > quantityInCart ? minPurchaseItems - quantityInCart : 1;

    return {
      ...(quantity > max && {
        quantity: max,
      }),
      ...(quantity < min && {
        quantity: min,
      }),
      orderable: ORDERABLE,
    };
  }
  return {
    orderable: OUT_OF_STOCK,
  };
};
