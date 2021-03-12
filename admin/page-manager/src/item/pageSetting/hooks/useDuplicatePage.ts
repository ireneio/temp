// typescript import
import { DataProxy } from 'apollo-cache';

import useSelectedPageType from '../../../hooks/useSelectedPage';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  PageTypeEnum,
  getPages_viewer_store_homePages_edges as getPagesViewerStoreHomePagesEdges,
  editFragment as editFragmentType,
  duplicatePage as duplicatePageType,
  duplicatePageVariables,
  useDuplicatePageReadCache as useDuplicatePageReadCacheType,
  useDuplicatePageReadCacheVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useDuplicatePageReadCache,
  duplicatePage,
} from '../gqls/useDuplicatePage';

// definition
export default (
  id: string,
  pageType: editFragmentType['pageType'],
  variables: useDuplicatePageReadCacheVariables,
  setSelectedPage: ReturnType<typeof useSelectedPageType>['setSelectedPage'],
): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [mutation] = useMutation<duplicatePageType, duplicatePageVariables>(
    duplicatePage,
    {
      update: (cache: DataProxy, { data }: { data: duplicatePageType }) => {
        if (data.duplicatePage?.status !== 'OK') {
          message.error(t('duplicate-page.error'));
          return;
        }

        const storeData = cache.readQuery<
          useDuplicatePageReadCacheType,
          useDuplicatePageReadCacheVariables
        >({
          query: useDuplicatePageReadCache,
          variables,
        });
        const duplicatedPage: getPagesViewerStoreHomePagesEdges | null =
          data.duplicatePage?.duplicatedPage;

        if (!storeData || !duplicatedPage) return;

        cache.writeQuery<
          useDuplicatePageReadCacheType,
          useDuplicatePageReadCacheVariables
        >({
          query: useDuplicatePageReadCache,
          data: {
            ...storeData,
            viewer: !storeData.viewer
              ? null
              : {
                  ...storeData.viewer,
                  store: !storeData.viewer.store
                    ? null
                    : {
                        ...storeData.viewer.store,
                        homePages: {
                          ...storeData.viewer.store.homePages,
                          edges: [
                            ...(duplicatedPage.node.pageType !== 'home'
                              ? []
                              : [duplicatedPage]),
                            ...storeData.viewer.store.homePages.edges,
                          ],
                        },
                        customPages: {
                          ...storeData.viewer.store.customPages,
                          edges: [
                            ...(duplicatedPage.node.pageType !== 'custom'
                              ? []
                              : [duplicatedPage]),
                            ...storeData.viewer.store.customPages.edges,
                          ],
                        },
                        productTemplatePage: {
                          ...storeData.viewer.store.productTemplatePage,
                          edges: [
                            ...(duplicatedPage.node.pageType !== 'template'
                              ? []
                              : [duplicatedPage]),
                            ...storeData.viewer.store.productTemplatePage.edges,
                          ],
                        },
                      },
                },
          },
          variables,
        });
        message.success(t('duplicate-page.success'));
      },
    },
  );

  return useCallback(() => {
    mutation({
      variables: {
        input: {
          pageId: id,
          pageType: (pageType?.toUpperCase() || 'HOME') as PageTypeEnum,
        },
      },
    }).then(({ data }: { data: duplicatePageType }) => {
      const duplicatedPage: getPagesViewerStoreHomePagesEdges | null =
        data.duplicatePage?.duplicatedPage;

      if (!duplicatedPage) return;

      setSelectedPage(duplicatedPage.node);
    });
  }, [id, pageType, setSelectedPage, mutation]);
};
