// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  removeProductFromWishList as removeProductFromWishListType,
  removeProductFromWishListVariables,
  useRemoveFragment as useRemoveFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  removeProductFromWishList,
  useRemoveFragment,
} from '../gqls/useRemove';

// definition
export default (
  user: useRemoveFragmentType | null,
): ((productId: string) => void) => {
  const { t } = useTranslation('member-wish-list');
  const [mutation] = useMutation<
    removeProductFromWishListType,
    removeProductFromWishListVariables
  >(removeProductFromWishList);

  return useCallback(
    (productId: string) => {
      mutation({
        variables: { input: { productId } },
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
                product => product?.productId !== productId,
              ),
            },
          });
          t('success');
        },
      });
    },
    [user, t, mutation],
  );
};
