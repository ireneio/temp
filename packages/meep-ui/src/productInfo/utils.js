import { ORDERABLE, OUT_OF_STOCK, LIMITED } from './constants';

export const findCoordinates = variantNode =>
  !variantNode.parent
    ? []
    : [
        ...findCoordinates(variantNode.parent),
        variantNode.parent.children.findIndex(node => node === variantNode),
      ];

export const reformatVariant = (variant, stockNotificationList, carts) => {
  const { id, stock } = variant;
  let { maxPurchaseLimit, minPurchaseItems } = variant;

  // minPurchaseItems 最小需等於 1
  minPurchaseItems = minPurchaseItems > 0 ? minPurchaseItems : 1;

  // maxPurchaseLimit 最小需等於 minPurchaseItems
  if (typeof maxPurchaseLimit === 'number') {
    maxPurchaseLimit =
      maxPurchaseLimit > minPurchaseItems ? maxPurchaseLimit : minPurchaseItems;
  } else {
    maxPurchaseLimit = variant.stock;
  }

  const quantityInCart =
    carts?.categories.products.find(product => product.variantId === id)
      ?.quantity || 0;

  return {
    ...variant,
    maxPurchaseLimit:
      maxPurchaseLimit > quantityInCart ? maxPurchaseLimit - quantityInCart : 0,
    minPurchaseItems:
      minPurchaseItems > quantityInCart ? minPurchaseItems - quantityInCart : 1,
    stock: stock > quantityInCart ? stock - quantityInCart : 0,
    productNotice: stockNotificationList.some(
      item => item.variantId === variant.id,
    ),
  };
};

export const calculateOrderable = (variant, carts, quantity) => {
  const { id, stock, minPurchaseItems, maxPurchaseLimit } = variant;

  // 第一步：庫存（有庫存且大於最低購買量）
  if (stock && stock >= minPurchaseItems) {
    const variantInCart = carts?.categories.products.find(
      product => product.variantId === id,
    );
    const quantityInCart = variantInCart?.quantity || 0;

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
