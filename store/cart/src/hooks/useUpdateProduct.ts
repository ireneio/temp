// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateProduct as updateProductType,
  updateProductVariables,
} from '@meepshop/types/gqls/store';

// graphql import
import { updateProduct } from '../gqls/useUpdateProduct';

// definition
export default (): ((cartId: string) => (value: number) => void) => {
  const { t } = useTranslation('cart');
  const [mutation] = useMutation<updateProductType, updateProductVariables>(
    updateProduct,
    {
      onCompleted: () => {
        notification.success({
          message: t('cart-updated'),
        });
      },
    },
  );

  return useCallback(
    cartId => value => {
      mutation({
        variables: {
          search: [
            {
              productsInfo: {
                updateData: [
                  {
                    id: cartId,
                    quantity: value,
                  },
                ],
              },
            },
          ],
        },
      });
    },
    [mutation],
  );
};
