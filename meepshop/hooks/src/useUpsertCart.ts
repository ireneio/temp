// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useContext, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { Role as RoleContext } from '@meepshop/context';

// graphql typescript
import {
  upsertCart as upsertCartType,
  upsertCartVariables as upsertCartVariablesType,
  useMergeCartCartItemFragment as useMergeCartCartItemFragmentType,
  useUpsertCartUserFragment as useUpsertCartUserFragmentType,
} from '@meepshop/types/gqls/meepshop';

// graphql import
import { upsertCart, useUpsertCartUserFragment } from './gqls/useUpsertCart';

// definition
export default (
  viewer: useUpsertCartUserFragmentType,
): ((input: useMergeCartCartItemFragmentType[]) => Promise<void>) => {
  const isShopper = useContext(RoleContext) === 'SHOPPER';
  const [mutation] = useMutation<upsertCartType, upsertCartVariablesType>(
    upsertCart,
  );

  return useCallback(
    async input => {
      await mutation({
        variables: {
          isShopper,
          input,
        },
        update: (cache: DataProxy, { data }) => {
          if (data?.upsertCart.__typename !== 'OkResponse') return;

          cache.writeFragment<useUpsertCartUserFragmentType>({
            id: viewer.id || 'null-id', // SHOULD_NOT_BE_NULL
            fragment: useUpsertCartUserFragment,
            data: {
              ...viewer,
              ...(isShopper
                ? {
                    cart: {
                      __typename: 'Cart',
                      cartItems: input,
                    },
                  }
                : {
                    guestCart: input,
                  }),
            },
          });
        },
      });
    },
    [isShopper, mutation, viewer],
  );
};
