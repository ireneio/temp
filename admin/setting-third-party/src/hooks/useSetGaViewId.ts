// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { useSetGAViewIdWriteCache } from './__generated__/useSetGAViewIdWriteCache';
import {
  setGaViewId as setGaViewIdType,
  setGaViewIdVariables,
} from './__generated__/setGaViewId';

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
      new Promise(resolve =>
        setGaViewId({
          variables: {
            gaViewId,
          },
          update: (cache, { data }) => {
            if (data?.setGAViewId !== 'OK') {
              message.error(t('gaViewId.error'));
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
