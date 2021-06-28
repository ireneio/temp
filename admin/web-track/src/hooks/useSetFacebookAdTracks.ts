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

// typescript definition
interface ValuesType {
  pixelId: string;
  conversionsAccessToken: string | null;
}

// definition
export default (
  storeId: string,
  setEditMode: (editMode: boolean) => void,
): ((values: ValuesType) => void) => {
  const { t } = useTranslation('web-track');
  const [mutation] = useMutation<
    setFacebookAdTracksType,
    setFacebookAdTracksVariables
  >(setFacebookAdTracks);

  return useCallback(
    input => {
      mutation({
        variables: {
          input,
        },
        update: (cache, { data }) => {
          if (data?.setFacebookAdTracks.__typename !== 'OkResponse') {
            message.success(t('save-fail'));
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
          setEditMode(false);
        },
      });
    },
    [storeId, setEditMode, mutation, t],
  );
};
