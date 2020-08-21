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
import { updateGoogleSearchConsoleVerificationHtmlCache } from './__generated__/updateGoogleSearchConsoleVerificationHtmlCache';

// graphql import
import { storeAdTrackWebTrackFragment } from '@meepshop/apollo/lib/StoreAdTrack';

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
        cache.writeFragment<updateGoogleSearchConsoleVerificationHtmlCache>({
          id: storeId,
          fragment: gql`
            fragment updateGoogleSearchConsoleVerificationHtmlCache on Store {
              id
              adTrack @client {
                googleSearchConsoleVerificationHtml
              }
            }
          `,
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
