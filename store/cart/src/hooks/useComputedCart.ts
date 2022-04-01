// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import { useCart } from '@meepshop/hooks';
import filter from '@meepshop/utils/lib/filter';

// graphql typescript
import {
  computedCart as computedCartType,
  computedCartVariables as computedCartVariablesType,
  computedCart_computedCart_ComputedCart as computedCartComputedCartComputedCartType,
  useComputedCartFragment as useComputedCartFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { computedCart } from '../gqls/useComputedCart';

// definition
export default (
  viewer: useComputedCartFragmentType | null,
): computedCartComputedCartComputedCartType | null => {
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
        input: {
          cartItems: cartItemsInput,
        },
      },
      skip: loading,
    },
  );

  return useMemo(() => {
    if (data?.computedCart.__typename !== 'ComputedCart') return null;

    return data.computedCart;
  }, [data]);
};
