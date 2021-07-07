// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  editFragment as editFragmentType,
  renamePageWithSEO as renamePageWithSEOType,
  renamePageWithSEOVariables,
  useRenamePageWithSEOCache as useRenamePageWithSEOCacheType,
  useRenamePageWithSEOCacheVariables,
  useRenamePageWithSEOFragment as useRenamePageWithSEOFragmentType,
  PageTypeEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useRenamePageWithSEOCache,
  renamePageWithSEO,
  useRenamePageWithSEOFragment,
} from '../gqls/useRenamePageWithSEO';

// typescript definition
interface ValuesType {
  title: string;
  path: string | null;
  tabTitle: string | null;
  seo?: {
    keywords: string | null;
    description: string | null;
    image: string | null;
  };
}

// definition
export default (
  id: string,
  pageType: editFragmentType['pageType'],
  variables: useRenamePageWithSEOCacheVariables,
  onClose: () => void,
): ((values: ValuesType) => void) => {
  const { t } = useTranslation('page-manager');
  const [mutation] = useMutation<
    renamePageWithSEOType,
    renamePageWithSEOVariables
  >(renamePageWithSEO, {
    onCompleted: onClose,
  });

  return useCallback(
    input => {
      mutation({
        variables: {
          input: {
            ...input,
            pageId: id,
            type: (pageType?.toUpperCase() || 'HOME') as PageTypeEnum,
          },
        },
        update: (
          cache: DataProxy,
          { data }: { data: renamePageWithSEOType },
        ) => {
          if (data.renamePageWithSEO?.status !== 'OK') {
            switch (data.renamePageWithSEO?.status) {
              case 'FAIL_PAGE_PATH_DUPLICATE':
                message.error(t('validator:page-path.same-path'));
                break;

              default:
                message.error(t('rename-page-with-seo.error'));
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
                                : storeData.viewer.store.homePages.edges.sort(
                                    ({ node }) => (node.id === id ? -1 : 1),
                                  ),
                          },
                          customPages: {
                            ...storeData.viewer.store.customPages,
                            edges:
                              pageType !== 'custom'
                                ? storeData.viewer.store.customPages.edges
                                : storeData.viewer.store.customPages.edges.sort(
                                    ({ node }) => (node.id === id ? -1 : 1),
                                  ),
                          },
                          productTemplatePage: {
                            ...storeData.viewer.store.productTemplatePage,
                            edges:
                              pageType !== 'template'
                                ? storeData.viewer.store.productTemplatePage
                                    .edges
                                : storeData.viewer.store.productTemplatePage.edges.sort(
                                    ({ node }) => (node.id === id ? -1 : 1),
                                  ),
                          },
                        },
                  },
            },
            variables,
          });
          cache.writeFragment<useRenamePageWithSEOFragmentType>({
            id,
            fragment: useRenamePageWithSEOFragment,
            data: {
              __typename: 'Page',
              id,
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
      });
    },
    [id, pageType, variables, t, mutation],
  );
};
