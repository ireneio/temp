// typescript import
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  setFbPixel as setFbPixelType,
  setFbPixelVariables,
} from '../gqls/__generated__/setFbPixel';
import { useSetFbPixelFragment as useSetFbPixelFragmentType } from '../gqls/__generated__/useSetFbPixelFragment';

// graphql import
import { useSetFbPixelFragment, setFbPixel } from '../gqls/useSetFbPixel';

// definition
export default (
  storeId: string,
): MutationTuple<setFbPixelType, setFbPixelVariables>[0] => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<setFbPixelType, setFbPixelVariables>(
    setFbPixel,
    {
      update: (cache, { data }) => {
        message.success(t('save-success'));
        cache.writeFragment<useSetFbPixelFragmentType>({
          id: storeId,
          fragment: useSetFbPixelFragment,
          data: {
            __typename: 'Store',
            id: storeId,
            adTracks: {
              __typename: 'AdTracks',
              facebookPixelId: data?.setFbPixel?.pixelId || null,
            },
          },
        });
      },
    },
  );

  return mutation;
};
