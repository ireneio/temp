// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  removeProduct as removeProductType,
  removeProductVariables,
} from '@meepshop/types/gqls/store';

// graphql import
import { removeProduct } from '../gqls/useRemoveProduct';

// definition
export default (): ((cartId: string) => void) => {
  const { t } = useTranslation('cart');
  const [mutation] = useMutation<removeProductType, removeProductVariables>(
    removeProduct,
    {
      onCompleted: () => {
        notification.success({
          message: t('cart-updated'),
        });
      },
    },
  );

  return useCallback(
    cartId =>
      mutation({
        variables: {
          search: [
            {
              productsInfo: {
                deleteData: [cartId],
              },
            },
          ],
        },
      }),
    [mutation],
  );
};
