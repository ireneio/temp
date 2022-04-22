// typescript import
import { QueryResult } from '@apollo/client';

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

// typescript definition
export interface ReturnType
  extends Pick<
    QueryResult<computedCartType, computedCartVariablesType>,
    'refetch' | 'variables'
  > {
  loading: boolean;
  computedCart: computedCartComputedCartComputedCartType | null;
}

// definition
export default (viewer: useComputedCartFragmentType | null): ReturnType => {
  const { loading, cartItems } = useCart(filter(useCartFragment, viewer));
  const cartItemsInput = useMemo(
    () => cartItems.map(({ __typename: _, ...cartItem }) => cartItem),
    [cartItems],
  );
  const { data, refetch, variables, loading: computedCartLoading } = useQuery<
    computedCartType,
    computedCartVariablesType
  >(computedCart, {
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        cartItems: cartItemsInput,
      },
    },
    skip: loading,
  });

  return {
    loading: computedCartLoading || loading,
    computedCart: useMemo(() => {
      if (data?.computedCart.__typename !== 'ComputedCart') return null;

      return data.computedCart;
    }, [data]),
    refetch,
    variables,
  };
};
