// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import { useCart } from '@meepshop/hooks';

// graphql typescript
import {
  computedCart as computedCartType,
  computedCartVariables as computedCartVariablesType,
  computedCart_computedCart_ComputedCart as computedCartComputedCartComputedCartType,
  computedCart_computedCart_ComputedCart_computedLineItems as computedCartComputedCartComputedCartComputedLineItemsType,
  useComputedCartFragment as useComputedCartFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { computedCart } from '../gqls/useComputedCart';

// typescript definition
interface ComputedProductsType
  extends computedCartComputedCartComputedCartType {
  computedLineItems: computedCartComputedCartComputedCartComputedLineItemsType[];
}

// definition
export default (
  viewer: useComputedCartFragmentType | null,
): ComputedProductsType | null => {
  const { loading, cartItems } = useCart(filter(useCartFragment, viewer));
  const cartItemsInput = useMemo(
    () => cartItems.map(({ __typename: _, ...cartItem }) => cartItem),
    [cartItems],
  );
  const { data } = useQuery<computedCartType, computedCartVariablesType>(
    computedCart,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        cartItems: cartItemsInput,
      },
      skip: loading,
    },
  );

  return useMemo(() => {
    if (!data || data.computedCart.__typename !== 'ComputedCart') return null;

    return {
      ...data.computedCart,
      computedLineItems: (data.computedCart?.computedLineItems?.filter(
        Boolean,
      ) || []) as computedCartComputedCartComputedCartComputedLineItemsType[],
    };
  }, [data]);
};
