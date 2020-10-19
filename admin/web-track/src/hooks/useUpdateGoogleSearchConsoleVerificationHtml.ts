// typescript import
import { MutationTuple } from '@apollo/react-hooks';

// import
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  updateGoogleSearchConsoleVerificationHtml as updateGoogleSearchConsoleVerificationHtmlType,
  updateGoogleSearchConsoleVerificationHtmlVariables,
} from './__generated__/updateGoogleSearchConsoleVerificationHtml';
import { updateGoogleSearchConsoleVerificationHtmlCacheFragment as updateGoogleSearchConsoleVerificationHtmlCacheFragmentType } from './fragments/__generated__/updateGoogleSearchConsoleVerificationHtmlCacheFragment';

// graphql import
import { storeAdTrackWebTrackFragment } from '@meepshop/apollo/lib/gqls/storeAdTrack';

import updateGoogleSearchConsoleVerificationHtmlCacheFragment from './fragments/useUpdateGoogleSearchConsoleVerificationHtml';

// definition
export default (
  storeId: string,
): MutationTuple<
  updateGoogleSearchConsoleVerificationHtmlType,
  updateGoogleSearchConsoleVerificationHtmlVariables
>[0] => {
  const { t } = useTranslation('web-track');
  const [updateGoogleSearchConsoleVerificationHtml] = useMutation<
    updateGoogleSearchConsoleVerificationHtmlType,
    updateGoogleSearchConsoleVerificationHtmlVariables
  >(
    gql`
      mutation updateGoogleSearchConsoleVerificationHtml(
        $updateWebTrackList: [UpdateWebTrack]
      ) {
        updateWebTrackList(updateWebTrackList: $updateWebTrackList) {
          ...storeAdTrackWebTrackFragment
        }
      }

      ${storeAdTrackWebTrackFragment}
    `,
    {
      update: (cache, { data }) => {
        message.success(t('save-success'));
        cache.writeFragment<
          updateGoogleSearchConsoleVerificationHtmlCacheFragmentType
        >({
          id: storeId,
          fragment: updateGoogleSearchConsoleVerificationHtmlCacheFragment,
          data: {
            __typename: 'Store',
            id: storeId,
            adTrack: {
              __typename: 'StoreAdTrack',
              googleSearchConsoleVerificationHtml:
                data?.updateWebTrackList?.[0]?.trackId || null,
            },
          },
        });
      },
    },
  );

  return updateGoogleSearchConsoleVerificationHtml;
};
