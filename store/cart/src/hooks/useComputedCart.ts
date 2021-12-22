// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';

// graphql typescript
import {
  computedCart as computedCartType,
  computedCartVariables as computedCartVariablesType,
  computedCart_computedCart_ComputedCart as computedCartComputedCartComputedCartType,
  computedCart_computedCart_ComputedCart_computedLineItems as computedCartComputedCartComputedCartComputedLineItemsType,
} from '@meepshop/types/gqls/store';

// graphql import
import { computedCart } from '../gqls/useComputedCart';

// typescript definition
interface ComputedProductsType
  extends computedCartComputedCartComputedCartType {
  computedLineItems: computedCartComputedCartComputedCartComputedLineItemsType[];
}

// definition
export default (
  cartItems: computedCartVariablesType['cartItems'],
  cartProducts: computedCartVariablesType['cartProducts'],
): ComputedProductsType | null => {
  const { data } = useQuery<computedCartType, computedCartVariablesType>(
    computedCart,
    {
      fetchPolicy: 'cache-and-network',
      variables: {
        cartItems,
        cartProducts,
      },
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
