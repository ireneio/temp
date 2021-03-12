// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  useSetGAViewIdWriteCache,
  setGaViewId as setGaViewIdType,
  setGaViewIdVariables,
} from '@meepshop/types/gqls/admin';

// definition
export default (): ((
  storeId: string,
  gaViewId: string | null,
) => Promise<void>) => {
  const { t } = useTranslation('setting-third-party');
  const [setGaViewId] = useMutation<setGaViewIdType, setGaViewIdVariables>(
    gql`
      mutation setGaViewId($gaViewId: String) {
        setGAViewId(gaViewId: $gaViewId)
      }
    `,
  );

  return useCallback(
    async (storeId: string, gaViewId: string) =>
      new Promise((resolve, reject) =>
        setGaViewId({
          variables: {
            gaViewId,
          },
          update: (cache, { data }) => {
            if (data?.setGAViewId !== 'OK') {
              message.error(t('gaViewId.error'));
              reject(new Error('can not update ga view id'));
              return;
            }

            cache.writeFragment<useSetGAViewIdWriteCache>({
              id: storeId,
              fragment: gql`
                fragment useSetGAViewIdWriteCache on Store {
                  id
                  gaViewId
                }
              `,
              data: {
                __typename: 'Store',
                id: storeId,
                gaViewId,
              },
            });
          },
        }).then(() => {
          resolve();
        }),
      ),
    [setGaViewId, t],
  );
};
