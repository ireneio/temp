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

// typescript definition
interface ValuesType {
  googleSearchConsoleVerificationHtml: string;
}

// definition
export default (
  storeId: string,
  setEditMode: (editMode: boolean) => void,
): ((values: ValuesType) => void) => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<
    updateGoogleSearchConsoleVerificationHtmlType,
    updateGoogleSearchConsoleVerificationHtmlVariables
  >(updateGoogleSearchConsoleVerificationHtml);

  return useCallback(
    ({ googleSearchConsoleVerificationHtml }) => {
      mutation({
        variables: {
          input: googleSearchConsoleVerificationHtml,
        },
        update: (cache, { data }) => {
          if (data?.setGoogleSearchConsoleVerificationHtml.status !== 'OK') {
            message.success(t('save-fail'));
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
          setEditMode(false);
        },
      });
    },
    [storeId, setEditMode, t, mutation],
  );
};
