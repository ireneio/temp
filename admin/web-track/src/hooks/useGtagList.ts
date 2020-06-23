// import
import { useMemo, useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  getGtagList_getGtagList as getGtagListGetGtagList,
  getGtagList as getGtagListType,
} from './__generated__/getGtagList';
import {
  setGtagSettingsList as setGtagSettingsListType,
  setGtagSettingsListVariables as setGtagSettingsListVariablesType,
} from './__generated__/setGtagSettingsList';

// definition
export const useGtagListFragment = gql`
  fragment useGtagListFragment on gtag {
    code
    type
    eventName
  }
`;

export default (
  gtagList?: (getGtagListGetGtagList | null)[],
): {
  gtagList: {
    analytics_config?: getGtagListGetGtagList;
    adwords_config?: getGtagListGetGtagList;
    sign_up?: getGtagListGetGtagList;
    begin_checkout?: getGtagListGetGtagList;
    purchase?: getGtagListGetGtagList;
  };
  setGtagSettingsList: (input: setGtagSettingsListVariablesType) => void;
} => {
  const { t } = useTranslation('web-track');
  const [setGtagSettingsList] = useMutation<setGtagSettingsListType>(
    gql`
      mutation setGtagSettingsList($setInput: [setGtagInput]) {
        setGtagSettingsList(setInput: $setInput) {
          ...useGtagListFragment
        }
      }
      ${useGtagListFragment}
    `,
    {
      update: (cache, { data }) => {
        message.success(t('save-success'));

        const query = gql`
          query getGtagList {
            getGtagList {
              ...useGtagListFragment
            }
          }
          ${useGtagListFragment}
        `;

        const getGtagList =
          cache.readQuery<getGtagListType>({ query })?.getGtagList || [];

        cache.writeQuery<getGtagListType>({
          query,
          data: {
            getGtagList: [
              ...getGtagList.filter(
                gtag =>
                  !(data?.setGtagSettingsList || []).find(
                    tag => tag?.eventName === gtag?.eventName,
                  ),
              ),
              ...(data?.setGtagSettingsList || []),
            ],
          },
        });
      },
    },
  );

  return {
    gtagList: useMemo(
      () => ({
        ...(gtagList || []).reduce((gtags, gtag) => {
          return {
            ...gtags,
            ...(gtag?.eventName ? { [gtag.eventName]: gtag } : {}),
          };
        }, {}),
      }),
      [gtagList],
    ),
    setGtagSettingsList: useCallback(
      (input: setGtagSettingsListVariablesType) => {
        setGtagSettingsList({
          variables: {
            setInput: input.setInput?.filter(gtag => gtag?.code !== null),
          },
        });
      },
      [setGtagSettingsList],
    ),
  };
};
