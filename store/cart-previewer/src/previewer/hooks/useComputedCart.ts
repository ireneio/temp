// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

// graphql typescript
import {
  getComputedCart as getComputedCartType,
  getComputedCartVariables as getComputedCartVariablesType,
  getComputedCart_computedCart_ComputedCart as getComputedCartComputedCartComputedCartType,
  getComputedCart_computedCart_ComputedCart_computedLineItems as getComputedCartComputedCartComputedCartComputedLineItemsType,
} from '@meepshop/types/gqls/store';

// graphql import
import { getComputedCart } from '../gqls/useGetCartComputed';

// typescript definition
interface ComputedProductsType
  extends getComputedCartComputedCartComputedCartType {
  computedLineItems: getComputedCartComputedCartComputedCartComputedLineItemsType[];
}

// definition
export default (
  cartItems: getComputedCartVariablesType['cartItems'] | null,
  cartProducts: getComputedCartVariablesType['cartProducts'] | null,
): ComputedProductsType | null => {
  const { data } = useQuery<getComputedCartType, getComputedCartVariablesType>(
    getComputedCart,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        cartItems: cartItems || [],
        cartProducts: cartProducts || [],
      },
      skip: !cartItems || !cartProducts,
    },
  );

  return useMemo(() => {
    if (!data || data.computedCart.__typename !== 'ComputedCart') return null;

    return {
      ...data.computedCart,
      computedLineItems: (data.computedCart?.computedLineItems?.filter(
        Boolean,
      ) ||
        []) as getComputedCartComputedCartComputedCartComputedLineItemsType[],
    };
  }, [data]);
};
