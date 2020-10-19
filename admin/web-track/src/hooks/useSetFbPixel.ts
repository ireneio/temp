// typescript import
import { MutationTuple } from '@apollo/react-hooks';

// import
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  setFbPixel as setFbPixelType,
  setFbPixelVariables,
} from './__generated__/setFbPixel';
import { updateFacebookCacheFragment as updateFacebookCacheFragmentType } from './fragments/__generated__/updateFacebookCacheFragment';

// graphql import
import updateFacebookCacheFragment from './fragments/useSetFbPixel';

// definition
export default (
  storeId: string,
): MutationTuple<setFbPixelType, setFbPixelVariables>[0] => {
  const { t } = useTranslation('web-track');
  const [setFbPixel] = useMutation<setFbPixelType, setFbPixelVariables>(
    gql`
      mutation setFbPixel($input: FbPixelInput!) {
        setFbPixel(input: $input) {
          pixelId
        }
      }
    `,
    {
      update: (cache, { data }) => {
        message.success(t('save-success'));
        cache.writeFragment<updateFacebookCacheFragmentType>({
          id: storeId,
          fragment: updateFacebookCacheFragment,
          data: {
            __typename: 'Store',
            id: storeId,
            adTrack: {
              __typename: 'StoreAdTrack',
              facebookPixelId: data?.setFbPixel?.pixelId || null,
            },
          },
        });
      },
    },
  );

  return setFbPixel;
};
