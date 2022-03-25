// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { filter } from 'graphql-anywhere';

import { useCart } from '@meepshop/hooks';

// graphql typescript
import {
  computedCartInPreviewer as computedCartInPreviewerType,
  computedCartInPreviewerVariables as computedCartInPreviewerVariablesType,
  computedCartInPreviewer_computedCart_ComputedCart as computedCartInPreviewerComputedCartComputedCartType,
  computedCartInPreviewer_computedCart_ComputedCart_computedLineItems as computedCartInPreviewerComputedCartComputedCartComputedLineItemsType,
  useComputedCartInPreviewerFragment as useComputedCartInPreviewerFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useCartFragment } from '@meepshop/hooks/lib/gqls/useCart';

import { computedCartInPreviewer } from '../gqls/useComputedCart';

// typescript definition
interface ComputedProductsType
  extends computedCartInPreviewerComputedCartComputedCartType {
  computedLineItems: computedCartInPreviewerComputedCartComputedCartComputedLineItemsType[];
}

// definition
export default (
  viewer: useComputedCartInPreviewerFragmentType | null,
): ComputedProductsType | null => {
  const { loading, cartItems } = useCart(filter(useCartFragment, viewer));
  const cartItemsInput = useMemo(
    () => cartItems.map(({ __typename: _, ...cartItem }) => cartItem),
    [cartItems],
  );
  const { data } = useQuery<
    computedCartInPreviewerType,
    computedCartInPreviewerVariablesType
  >(computedCartInPreviewer, {
    fetchPolicy: 'cache-and-network',
    variables: {
      input: {
        cartItems: cartItemsInput,
      },
    },
    skip: loading,
  });

  return useMemo(() => {
    if (!data || data.computedCart.__typename !== 'ComputedCart') return null;

    return {
      ...data.computedCart,
      computedLineItems: (data.computedCart?.computedLineItems?.filter(
        Boolean,
      ) ||
        []) as computedCartInPreviewerComputedCartComputedCartComputedLineItemsType[],
    };
  }, [data]);
};
