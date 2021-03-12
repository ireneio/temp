// typescript import
import { FormComponentProps } from 'antd/lib/form';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  updateGoogleSearchConsoleVerificationHtml as updateGoogleSearchConsoleVerificationHtmlType,
  updateGoogleSearchConsoleVerificationHtmlVariables,
  useUpdateGoogleSearchConsoleVerificationHtmlFragment as useUpdateGoogleSearchConsoleVerificationHtmlFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useUpdateGoogleSearchConsoleVerificationHtmlFragment,
  updateGoogleSearchConsoleVerificationHtml,
} from '../gqls/useUpdateGoogleSearchConsoleVerificationHtml';

// definition
export default (
  storeId: string,
  { validateFields }: FormComponentProps['form'],
): (() => Promise<boolean>) => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<
    updateGoogleSearchConsoleVerificationHtmlType,
    updateGoogleSearchConsoleVerificationHtmlVariables
  >(updateGoogleSearchConsoleVerificationHtml);

  return useCallback(
    () =>
      new Promise(resolve => {
        validateFields((errors, { googleSearchConsoleVerificationHtml }) => {
          if (errors) {
            resolve(false);
            return;
          }

          mutation({
            variables: {
              input: googleSearchConsoleVerificationHtml,
            },
            update: (cache, { data }) => {
              if (
                data?.setGoogleSearchConsoleVerificationHtml.status !== 'OK'
              ) {
                message.success(t('save-fail'));
                resolve(false);
                return;
              }

              cache.writeFragment<
                useUpdateGoogleSearchConsoleVerificationHtmlFragmentType
              >({
                id: storeId,
                fragment: useUpdateGoogleSearchConsoleVerificationHtmlFragment,
                data: {
                  __typename: 'Store',
                  id: storeId,
                  adTracks: {
                    __typename: 'AdTracks',
                    googleSearchConsoleVerificationHtml,
                  },
                },
              });
              message.success(t('save-success'));
              resolve(true);
            },
          });
        });
      }),
    [storeId, validateFields, t, mutation],
  );
};
