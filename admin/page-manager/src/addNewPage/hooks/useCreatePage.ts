// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { useRouter } from '@meepshop/link';

// graphql typescript
import {
  getPages_viewer_store_homePages_edges as getPagesViewerStoreHomePagesEdges,
  createPage as createPageType,
  createPageVariables,
  PageTypeEnum,
  PageTemplateTypeEnum,
  usePagesPageFragment as usePagesPageFragmentType,
  useCreatePageReadCache as useCreatePageReadCacheType,
  useCreatePageReadCacheVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useCreatePageReadCache, createPage } from '../gqls/useCreatePage';

// typescript definition
interface ValuesType {
  title: string;
  path: string;
  tabTitle: string;
  templateType: PageTemplateTypeEnum;
  useBottom: boolean;
}

// definition
export default (
  pageType: usePagesPageFragmentType['pageType'],
  variables: useCreatePageReadCacheVariables,
): ((values: ValuesType) => void) => {
  const { t } = useTranslation('page-manager');
  const router = useRouter();
  const [mutation] = useMutation<createPageType, createPageVariables>(
    createPage,
    {
      update: (cache: DataProxy, { data }: { data: createPageType }) => {
        if (data.createPage?.status !== 'OK') {
          message.error(t('create-page.error'));
          return;
        }

        const storeData = cache.readQuery<
          useCreatePageReadCacheType,
          useCreatePageReadCacheVariables
        >({
          query: useCreatePageReadCache,
          variables,
        });
        const newPage: getPagesViewerStoreHomePagesEdges | null =
          data.createPage?.newPage;

        if (!storeData || !newPage) return;

        cache.writeQuery<
          useCreatePageReadCacheType,
          useCreatePageReadCacheVariables
        >({
          query: useCreatePageReadCache,
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
                            ...(newPage.node.pageType !== 'home'
                              ? []
                              : [newPage]),
                            ...storeData.viewer.store.homePages.edges,
                          ],
                        },
                        customPages: {
                          ...storeData.viewer.store.customPages,
                          edges: [
                            ...(newPage.node.pageType !== 'custom'
                              ? []
                              : [newPage]),
                            ...storeData.viewer.store.customPages.edges,
                          ],
                        },
                        productTemplatePage: {
                          ...storeData.viewer.store.productTemplatePage,
                          edges: [
                            ...(newPage.node.pageType !== 'template'
                              ? []
                              : [newPage]),
                            ...storeData.viewer.store.productTemplatePage.edges,
                          ],
                        },
                      },
                },
          },
          variables,
        });
        router.push(`/page-manager/edit/${newPage?.node.id}`);
      },
    },
  );

  return useCallback(
    input => {
      mutation({
        variables: {
          input: {
            ...input,
            type: (pageType?.toUpperCase() || 'HOME') as PageTypeEnum,
          },
        },
      });
    },
    [pageType, mutation],
  );
};
