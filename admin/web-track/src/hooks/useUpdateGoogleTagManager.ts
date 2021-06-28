// import
import { useCallback } from 'react';

import useSetGtagSettingsList from './useSetGtagSettingsList';
import parseGoogleTagManager from '../utils/parseGoogleTagManager';

// graphql typescript
import {
  gtagTypeEnum,
  gtagEventNameEnum,
  useUpdateGoogleTagManagerFragment as useUpdateGoogleTagManagerFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useUpdateGoogleTagManagerFragment } from '../gqls/useUpdateGoogleTagManager';

// typescript definition
interface ValuesType {
  googleTagManager: string;
}

// definition
export default (
  id: string | null,
  setEditMode: (editMode: boolean) => void,
): ((values: ValuesType) => void) => {
  const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
    cache.writeFragment<useUpdateGoogleTagManagerFragmentType>({
      id: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
      fragment: useUpdateGoogleTagManagerFragment,
      data: {
        __typename: 'Store',
        id: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
        adTracks: {
          __typename: 'AdTracks',
          googleTagManager: data?.setGtagSettingsList?.[0]?.trackingId || null,
        },
      },
    });
  });

  return useCallback(
    async ({ googleTagManager }) => {
      await setGtagSettingsList({
        variables: {
          setInput: [
            {
              type: 'google_tag_manager' as gtagTypeEnum,
              eventName: 'tag_manager' as gtagEventNameEnum,
              trackingId: parseGoogleTagManager(googleTagManager),
            },
          ],
        },
      });
      setEditMode(false);
    },
    [setEditMode, setGtagSettingsList],
  );
};
