// import
import { useMemo, useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  getWebTrackList_getWebTrackList_data as getWebTrackListGetWebTrackListData,
  getWebTrackList as getWebTrackListType,
} from './__generated__/getWebTrackList';
import {
  updateWebTrackList as updateWebTrackListType,
  updateWebTrackListVariables as updateWebTrackListVariablesType,
} from './__generated__/updateWebTrackList';

// definition
export const useWebTrackListFragment = gql`
  fragment useWebTrackListFragment on WebTrack {
    id
    trackId
    trackType
    trackPage {
      trackCode
    }
  }
`;

export default (
  webTrackList?: (getWebTrackListGetWebTrackListData | null)[] | null,
): {
  webTrackList: {
    google_webmaster?: getWebTrackListGetWebTrackListData;
    google_tag_manager?: getWebTrackListGetWebTrackListData;
  };
  updateWebTrackList: (input: updateWebTrackListVariablesType) => void;
} => {
  const { t } = useTranslation('web-track');
  const [updateWebTrackList] = useMutation<updateWebTrackListType>(
    gql`
      mutation updateWebTrackList($updateWebTrackList: [UpdateWebTrack]) {
        updateWebTrackList(updateWebTrackList: $updateWebTrackList) {
          ...useWebTrackListFragment
        }
      }
      ${useWebTrackListFragment}
    `,
    {
      update: (cache, { data }) => {
        message.success(t('save-success'));

        const query = gql`
          query getWebTrackList {
            getWebTrackList {
              data {
                ...useWebTrackListFragment
              }
            }
          }
          ${useWebTrackListFragment}
        `;

        const getWebTrackList =
          cache.readQuery<getWebTrackListType>({ query })?.getWebTrackList
            ?.data || [];

        cache.writeQuery<getWebTrackListType>({
          query,
          data: {
            getWebTrackList: {
              __typename: 'WebTrackList',
              data: getWebTrackList.map(webTrack => {
                const newTrack = (data?.updateWebTrackList || []).find(
                  track => track?.trackType === webTrack?.trackType,
                );

                if (newTrack) return newTrack;
                return webTrack;
              }),
            },
          },
        });
      },
    },
  );

  return {
    webTrackList: useMemo(
      () => ({
        ...(webTrackList || []).reduce((tracks, track) => {
          return {
            ...tracks,
            ...(track?.trackType ? { [track.trackType]: track } : {}),
          };
        }, {}),
      }),
      [webTrackList],
    ),
    updateWebTrackList: useCallback(
      (input: updateWebTrackListVariablesType) => {
        updateWebTrackList({
          variables: input,
        });
      },
      [updateWebTrackList],
    ),
  };
};
