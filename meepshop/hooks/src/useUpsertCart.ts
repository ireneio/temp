// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  upsertCart as upsertCartType,
  upsertCartVariables as upsertCartVariablesType,
  useUpsertCartUserFragment as useUpsertCartUserFragmentType,
  useMergeCartFragment as useMergeCartFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { upsertCart, useUpsertCartUserFragment } from './gqls/useUpsertCart';

// definition
export default (
  viewer: useUpsertCartUserFragmentType | null,
): ((cartItems: useMergeCartFragmentType[]) => Promise<void>) => {
  const isShopper = viewer?.role === 'SHOPPER';
  const [mutation] = useMutation<upsertCartType, upsertCartVariablesType>(
    upsertCart,
  );

  return useCallback(
    async cartItems => {
      const input = cartItems.map(({ __typename: _, ...cartItem }) => cartItem);

      await mutation({
        variables: {
          isShopper,
          input,
          guestInput: isShopper ? [] : input,
        },
        update: (cache: DataProxy, { data }) => {
          if (
            (data?.upsertCart || data?.upsertGuestCart)?.__typename !==
              'OkResponse' ||
            !viewer
          )
            return;

          cache.writeFragment<useUpsertCartUserFragmentType>({
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore FIXME: should use cache.identify
            id: viewer.id,
            fragment: useUpsertCartUserFragment,
            fragmentName: 'useUpsertCartUserFragment',
            data: {
              ...viewer,
              cart: !isShopper
                ? viewer.cart
                : {
                    __typename: 'Cart',
                    cartItems,
                  },
              guestCart: {
                __typename: 'GuestCart',
                cartItems: isShopper ? [] : cartItems,
              },
            },
          });
        },
      });
    },
    [isShopper, mutation, viewer],
  );
};
