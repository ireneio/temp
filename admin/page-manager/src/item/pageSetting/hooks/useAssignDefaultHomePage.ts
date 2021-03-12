// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  assignDefaultHomePage as assignDefaultHomePageType,
  assignDefaultHomePageVariables,
  useAssignDefaultHomePageReadCache as useAssignDefaultHomePageReadCacheType,
  useAssignDefaultHomePageFragment as useAssignDefaultHomePageFragmentType,
  useAssignDefaultHomePageUpdateNewPageFragment as useAssignDefaultHomePageUpdateNewPageFragmentType,
  useAssignDefaultHomePageUpdatePrevPageFragment as useAssignDefaultHomePageUpdatePrevPageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  assignDefaultHomePage,
  useAssignDefaultHomePageReadCache,
  useAssignDefaultHomePageFragment,
  useAssignDefaultHomePageUpdateNewPageFragment,
  useAssignDefaultHomePageUpdatePrevPageFragment,
} from '../gqls/useAssignDefaultHomePage';

// definition
export default (id: string): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [mutation] = useMutation<
    assignDefaultHomePageType,
    assignDefaultHomePageVariables
  >(assignDefaultHomePage, {
    update: (
      cache: DataProxy,
      { data }: { data: assignDefaultHomePageType },
    ) => {
      if (data.assignDefaultHomePage?.status !== 'OK') {
        message.error(t('assign-default-home-page.error'));
        return;
      }

      const storeData = cache.readQuery<useAssignDefaultHomePageReadCacheType>({
        query: useAssignDefaultHomePageReadCache,
      });
      const storeId = storeData?.viewer?.store?.id;
      const prevDefaultHomagePageId =
        storeData?.viewer?.store?.defaultHomePage.id;

      if (!storeId) return;

      cache.writeFragment<useAssignDefaultHomePageFragmentType>({
        id: storeId,
        fragment: useAssignDefaultHomePageFragment,
        data: {
          __typename: 'Store',
          id: storeId,
          defaultHomePage: {
            __typename: 'Page',
            id,
          },
        },
      });

      cache.writeFragment<useAssignDefaultHomePageUpdateNewPageFragmentType>({
        id,
        fragment: useAssignDefaultHomePageUpdateNewPageFragment,
        data: {
          __typename: 'Page',
          id,
          isDefaultHomePage: true,
        },
      });

      if (prevDefaultHomagePageId)
        cache.writeFragment<useAssignDefaultHomePageUpdatePrevPageFragmentType>(
          {
            id: prevDefaultHomagePageId,
            fragment: useAssignDefaultHomePageUpdatePrevPageFragment,
            data: {
              __typename: 'Page',
              id: prevDefaultHomagePageId,
              isDefaultHomePage: false,
            },
          },
        );

      message.success(t('assign-default-home-page.success'));
    },
  });

  return useCallback(() => {
    mutation({ variables: { input: { pageId: id } } });
  }, [id, mutation]);
};
