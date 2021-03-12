// typescript import
import { DataProxy } from 'apollo-cache';
import { ExecutionResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { message } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  editFragment as editFragmentType,
  renamePageWithSEO as renamePageWithSEOType,
  renamePageWithSEOVariables,
  useRenamePageWithSEOCache as useRenamePageWithSEOCacheType,
  useRenamePageWithSEOCacheVariables,
  useRenamePageWithSEOFragment as useRenamePageWithSEOFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useRenamePageWithSEOCache,
  renamePageWithSEO,
  useRenamePageWithSEOFragment,
} from '../gqls/useRenamePageWithSEO';

// definition
export default (
  pageType: editFragmentType['pageType'],
  variables: useRenamePageWithSEOCacheVariables,
): ((
  input: renamePageWithSEOVariables['input'],
) => Promise<ExecutionResult<renamePageWithSEOType>>) => {
  const { t } = useTranslation('page-manager');
  const [mutation] = useMutation<
    renamePageWithSEOType,
    renamePageWithSEOVariables
  >(renamePageWithSEO);

  return useCallback(
    (input: renamePageWithSEOVariables['input']) =>
      mutation({
        variables: { input },
        update: (
          cache: DataProxy,
          { data }: { data: renamePageWithSEOType },
        ) => {
          if (data.renamePageWithSEO?.status !== 'OK') {
            switch (data.renamePageWithSEO?.status) {
              case 'FAIL_PAGE_PATH_DUPLICATE':
                message.error(
                  t('rename-page-with-seo.error.FAIL_PAGE_PATH_DUPLICATE'),
                );
                break;

              default:
                message.error(t('rename-page-with-seo.error.default'));
                break;
            }
            return;
          }

          const storeData = cache.readQuery<
            useRenamePageWithSEOCacheType,
            useRenamePageWithSEOCacheVariables
          >({
            query: useRenamePageWithSEOCache,
            variables,
          });

          if (!storeData) return;

          cache.writeQuery<
            useRenamePageWithSEOCacheType,
            useRenamePageWithSEOCacheVariables
          >({
            query: useRenamePageWithSEOCache,
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
                            edges:
                              pageType !== 'home'
                                ? storeData.viewer.store.homePages.edges
                                : [
                                    {
                                      __typename: 'PageEdge',
                                      node: {
                                        __typename: 'Page',
                                        id: input.pageId,
                                      },
                                    },
                                    ...storeData.viewer.store.homePages.edges.filter(
                                      ({ node: { id } }) => id !== input.pageId,
                                    ),
                                  ],
                          },
                          customPages: {
                            ...storeData.viewer.store.customPages,
                            edges:
                              pageType !== 'custom'
                                ? storeData.viewer.store.customPages.edges
                                : [
                                    {
                                      __typename: 'PageEdge',
                                      node: {
                                        __typename: 'Page',
                                        id: input.pageId,
                                      },
                                    },
                                    ...storeData.viewer.store.customPages.edges.filter(
                                      ({ node: { id } }) => id !== input.pageId,
                                    ),
                                  ],
                          },
                          productTemplatePage: {
                            ...storeData.viewer.store.productTemplatePage,
                            edges:
                              pageType !== 'template'
                                ? storeData.viewer.store.productTemplatePage
                                    .edges
                                : [
                                    {
                                      __typename: 'PageEdge',
                                      node: {
                                        __typename: 'Page',
                                        id: input.pageId,
                                      },
                                    },
                                    ...storeData.viewer.store.productTemplatePage.edges.filter(
                                      ({ node: { id } }) => id !== input.pageId,
                                    ),
                                  ],
                          },
                        },
                  },
            },
            variables,
          });
          cache.writeFragment<useRenamePageWithSEOFragmentType>({
            id: input.pageId,
            fragment: useRenamePageWithSEOFragment,
            data: {
              __typename: 'Page',
              id: input.pageId,
              title: {
                __typename: 'Locale',
                // eslint-disable-next-line @typescript-eslint/camelcase
                zh_TW: input.title || null,
              },
              path: input.path || null,
              tabTitle: input.tabTitle || null,
              seo: !input.seo
                ? null
                : {
                    __typename: 'seoType',
                    keywords: input.seo.keywords || null,
                    description: input.seo.description || null,
                    image: input.seo.image || null,
                  },
            },
          });
          message.success(t('rename-page-with-seo.success'));
        },
      }),
    [pageType, variables, t, mutation],
  );
};
