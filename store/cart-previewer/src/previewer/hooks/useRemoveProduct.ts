// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  removeProductInPreviewer as removeProductInPreviewerType,
  removeProductInPreviewerVariables,
} from '@meepshop/types/gqls/store';

// graphql import
import { removeProductInPreviewer } from '../gqls/useRemoveProduct';

// definition
export default (): ((cartId: string) => void) => {
  const { t } = useTranslation('cart');
  const [mutation] = useMutation<
    removeProductInPreviewerType,
    removeProductInPreviewerVariables
  >(removeProductInPreviewer, {
    onCompleted: () => {
      notification.success({
        message: t('cart-updated'),
      });
    },
  });

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
