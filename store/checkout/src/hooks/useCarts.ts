// typescript import
import { ComputeOrderList } from './useComputeOrderList';

// import
import { useState, useMemo, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { usePrevious } from 'react-use';
import { areEqual } from 'fbjs';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';
import { useCart } from '@meepshop/hooks';

// graphql typescript
import {
  useCartFragment as useCartFragmentType,
  computedCartInCheckout as computedCartInCheckoutType,
  computedCartInCheckoutVariables as computedCartInCheckoutVariablesType,
  computedCartInCheckout_computedCart_ComputedCart_computedLineItems as computedCartInCheckoutComputedCartComputedCartComputedLineItemsType,
} from '@meepshop/types/gqls/store';

// graphql import
import { computedCartInCheckout } from '../gqls/useCarts';

// definition
export default (
  createOrderLoading: boolean,
  viewer: useCartFragmentType | null,
  computeOrderList: ComputeOrderList,
): {
  cartLoading: boolean;
  isEmptyCart: boolean;
  computedCartItems: computedCartInCheckoutComputedCartComputedCartComputedLineItemsType[];
} => {
  const { t } = useTranslation('checkout');
  const { push } = useRouter();
  const [isEmptyCart, setIsEmptyCart] = useState<boolean>(false);
  const [isShipmentCart, setIsShipmentCart] = useState<boolean>(false);
  const { loading, cartItems } = useCart(viewer);
  const { data } = useQuery<
    computedCartInCheckoutType,
    computedCartInCheckoutVariablesType
  >(computedCartInCheckout, {
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        cartItems: cartItems.map(({ __typename: _, ...cartItem }) => cartItem),
      },
    },
    skip: loading,
  });
  const cartLoading = useMemo(() => loading || !data?.computedCart, [
    loading,
    data,
  ]);
  const computedCartItems = useMemo(() => {
    if (data?.computedCart.__typename !== 'ComputedCart') return [];

    return data.computedCart.computedLineItems.filter(
      item => item.type !== 'GIFT',
    );
  }, [data]);
  const prevComputedCartItems = usePrevious(computedCartItems);

  useEffect(() => {
    if (!areEqual(prevComputedCartItems, computedCartItems)) {
      computeOrderList({ products: computedCartItems });
    }
  }, [prevComputedCartItems, computedCartItems, computeOrderList]);

  useEffect(() => {
    if (isEmptyCart || cartLoading || createOrderLoading) return;

    if (computedCartItems.length === 0) {
      setIsEmptyCart(true);

      Modal.warning({
        title: t('cart-is-empty'),
        okText: t('confirm-go-to'),
        onOk: () => push('/'),
      });

      return;
    }

    if (!computedCartItems.some(item => item.type === 'PRODUCT')) {
      setIsEmptyCart(true);

      Modal.warning({
        title: t('only-upselling'),
        okText: t('confirm-go-to'),
        onOk: () => push('/'),
      });
    }
  }, [
    isEmptyCart,
    cartLoading,
    createOrderLoading,
    computedCartItems,
    t,
    push,
  ]);

  useEffect(() => {
    if (isEmptyCart || cartLoading || createOrderLoading || isShipmentCart)
      return;

    if (
      !window.sessionStorage.getItem('shipment') &&
      computedCartItems.length !== 0 &&
      computedCartItems.some(item => item.type === 'PRODUCT')
    ) {
      setIsShipmentCart(true);

      setTimeout(() => {
        Modal.warning({
          title: t('shipment-empty'),
          content: t('choose-shipment'),
          okText: t('go-back-to-cart'),
          onOk: () => push('/cart'),
        });
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmptyCart, cartLoading, createOrderLoading, t, push, isShipmentCart]);

  return {
    cartLoading,
    isEmptyCart,
    computedCartItems,
  };
};
