// import
import { useMemo } from 'react';
import { useQuery } from '@apollo/client';

import useMapCartItem from './useMapCartItem';

// graphql typescript
import {
  computedCartInPreviewer as computedCartInPreviewerType,
  computedCartInPreviewerVariables as computedCartInPreviewerVariablesType,
  computedCartInPreviewer_computedCart_ComputedCart as computedCartInPreviewerComputedCartComputedCartType,
  computedCartInPreviewer_computedCart_ComputedCart_computedLineItems as computedCartInPreviewerComputedCartComputedCartComputedLineItemsType,
  useComputedCartInPreviewerFragment as useComputedCartInPreviewerFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { computedCartInPreviewer } from '../gqls/useComputedCart';

// typescript definition
interface ComputedProductsType
  extends computedCartInPreviewerComputedCartComputedCartType {
  computedLineItems: computedCartInPreviewerComputedCartComputedCartComputedLineItemsType[];
}

// definition
export default (
  // FIXME: using useCart and useCartFragment in T9918
  _viewer: useComputedCartInPreviewerFragmentType | null,
): ComputedProductsType | null => {
  const mapCartItem = useMapCartItem();
  const cartItems = mapCartItem?.cartItems || null;
  const cartProducts = mapCartItem?.cartProducts || null;
  const { data } = useQuery<
    computedCartInPreviewerType,
    computedCartInPreviewerVariablesType
  >(computedCartInPreviewer, {
    fetchPolicy: 'cache-and-network',
    variables: {
      cartItems: cartItems || [],
      cartProducts: cartProducts || [],
    },
    skip: !cartItems || !cartProducts,
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
