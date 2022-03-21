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
  computedCartInCheckout_computedCart_ComputedCart_computedLineItems as computedCartInCheckoutComputedCartComputedCartComputedLineItemsType,
} from '@meepshop/types/gqls/store';

// graphql import
import { computedCartInCheckout } from '../gqls/useCheckout';

// definition
export default (
  viewer: useCartFragmentType | null,
  computeOrderList: (value: {
    [key: string]: computedCartInCheckoutComputedCartComputedCartComputedLineItemsType[];
  }) => void,
): {
  cartLoading: boolean;
  isEmptyCart: boolean;
} => {
  const { t } = useTranslation('checkout');
  const { push } = useRouter();
  const [isEmptyCart, setIsEmptyCart] = useState<boolean>(false);
  const { loading, cartItems } = useCart(viewer);

  const { data } = useQuery(computedCartInCheckout, {
    fetchPolicy: 'cache-and-network',
    variables: {
      cartItems: cartItems.map(({ __typename: _, ...cartItem }) => cartItem),
    },
    skip: loading,
  });

  const cartLoading = useMemo(() => loading || !data?.computedCart, [
    loading,
    data,
  ]);

  const carts = (data?.computedCart?.computedLineItems.filter(
    (
      computedLineItem: computedCartInCheckoutComputedCartComputedCartComputedLineItemsType,
    ) => computedLineItem.type !== 'GIFT',
  ) ||
    []) as computedCartInCheckoutComputedCartComputedCartComputedLineItemsType[];

  const prevCarts = usePrevious(carts);

  useEffect(() => {
    if (!areEqual(prevCarts, carts)) {
      computeOrderList({ products: carts });
    }
  }, [prevCarts, carts, computeOrderList]);

  useEffect(() => {
    if (isEmptyCart || cartLoading) return;

    if (carts.length === 0) {
      setIsEmptyCart(true);

      Modal.warning({
        title: t('cart-is-empty'),
        okText: t('confirm-go-to'),
        onOk: () => push('/'),
      });

      return;
    }

    if (!carts.some(item => item.type === 'PRODUCT')) {
      setIsEmptyCart(true);

      Modal.warning({
        title: t('only-upselling'),
        okText: t('confirm-go-to'),
        onOk: () => push('/'),
      });
    }
  }, [isEmptyCart, cartLoading, carts, t, push]);

  return {
    cartLoading,
    isEmptyCart,
  };
};
