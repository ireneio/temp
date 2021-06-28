// import
import { useCallback } from 'react';

import useSetGtagSettingsList from './useSetGtagSettingsList';

// graphql typescript
import {
  gtagTypeEnum,
  gtagEventNameEnum,
  useUpdateGoogleAnalyticsFragment as useUpdateGoogleAnalyticsFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useUpdateGoogleAnalyticsFragment } from '../gqls/useUpdateGoogleAnalytics';

// typescript definition
interface ValuesType {
  googleAnalyticsId: string | null;
}

// definition
export default (
  id: string | null,
  setEditMode: (editMode: boolean) => void,
): ((values: ValuesType) => void) => {
  const setGtagSettingsList = useSetGtagSettingsList((cache, data) => {
    cache.writeFragment<useUpdateGoogleAnalyticsFragmentType>({
      id: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
      fragment: useUpdateGoogleAnalyticsFragment,
      data: {
        __typename: 'Store',
        id: id || 'null-id' /* SHOULD_NOT_BE_NULL */,
        adTracks: {
          __typename: 'AdTracks',
          googleAnalyticsId: data?.setGtagSettingsList?.[0]?.trackingId || null,
        },
      },
    });
  });

  return useCallback(
    async ({ googleAnalyticsId }) => {
      await setGtagSettingsList({
        variables: {
          setInput: [
            {
              type: 'google_analytics' as gtagTypeEnum,
              eventName: 'analytics_config' as gtagEventNameEnum,
              trackingId: googleAnalyticsId,
            },
          ],
        },
      });
      setEditMode(false);
    },
    [setEditMode, setGtagSettingsList],
  );
};
