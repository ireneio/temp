// typescript import
import { ExecutionResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  removeProductFromWishList as removeProductFromWishListType,
  removeProductFromWishListVariables,
} from '../gqls/__generated__/removeProductFromWishList';
import { useRemoveFragment as useRemoveFragmentType } from '../gqls/__generated__/useRemoveFragment';

// graphql import
import {
  removeProductFromWishList,
  useRemoveFragment,
} from '../gqls/useRemove';

// definition
export default (
  user: useRemoveFragmentType | null,
): ((
  input: removeProductFromWishListVariables['input'],
) => Promise<ExecutionResult<removeProductFromWishListType>>) => {
  const { t } = useTranslation('member-wish-list');
  const [mutation] = useMutation<
    removeProductFromWishListType,
    removeProductFromWishListVariables
  >(removeProductFromWishList);

  return useCallback(
    (input: removeProductFromWishListVariables['input']) =>
      mutation({
        variables: { input },
        update: (cache, { data }) => {
          const userId = user?.id;

          if (!data?.removeWishlistProduct?.success || !userId) {
            t('fail');
            return;
          }

          cache.writeFragment<useRemoveFragmentType>({
            id: userId,
            fragment: useRemoveFragment,
            data: {
              __typename: 'User',
              id: userId,
              wishList: (user?.wishList || []).filter(
                product => product?.productId !== input.productId,
              ),
            },
          });
          t('success');
        },
      }),
    [user, t, mutation],
  );
};