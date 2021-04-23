// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  setFacebookAdTracks as setFacebookAdTracksType,
  setFacebookAdTracksVariables,
  useSetFacebookAdTracksFragment as useSetFacebookAdTracksFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useSetFacebookAdTracksFragment,
  setFacebookAdTracks,
} from '../gqls/useSetFacebookAdTracks';

// definition
export default (
  storeId: string,
  { validateFields }: FormComponentProps['form'],
): (() => Promise<boolean>) => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<
    setFacebookAdTracksType,
    setFacebookAdTracksVariables
  >(setFacebookAdTracks);

  return useCallback(
    () =>
      new Promise(resolve => {
        validateFields((errors, input) => {
          if (errors) {
            resolve(false);
            return;
          }

          mutation({
            variables: {
              input,
            },
            update: (cache, { data }) => {
              if (data?.setFacebookAdTracks.__typename !== 'OkResponse') {
                message.success(t('save-fail'));
                resolve(false);
                return;
              }

              cache.writeFragment<useSetFacebookAdTracksFragmentType>({
                id: storeId,
                fragment: useSetFacebookAdTracksFragment,
                data: {
                  __typename: 'Store',
                  id: storeId,
                  adTracks: {
                    __typename: 'AdTracks',
                    facebookPixelId: input.pixelId || null,
                    facebookConversionsAccessToken:
                      input.conversionsAccessToken || null,
                  },
                },
              });
              message.success(t('save-success'));
              resolve(true);
            },
          });
        });
      }),
    [storeId, validateFields, mutation, t],
  );
};
