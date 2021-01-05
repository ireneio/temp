// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { getPages_viewer_store_homePages_edges as getPagesViewerStoreHomePagesEdges } from '../../__generated__/getPages';
import {
  createPage as createPageType,
  createPageVariables,
} from './__generated__/createPage';
import {
  useCreatePageReadCache,
  useCreatePageReadCacheVariables,
} from './__generated__/useCreatePageReadCache';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
const useCreatePageFragment = gql`
  fragment useCreatePageFragment on PageEdge {
    node {
      id
      pageType
      title {
        ...localeFragment
      }
      isDefaultHomePage @client
      isDefaultProductTemplatePage @client
      path
      addressTitle
      seo {
        keywords
        description
        image
      }
    }
  }

  ${localeFragment}
`;

const query = gql`
  query useCreatePageReadCache(
    $homePagesFilter: StorePagesFilterInput
    $customPagesFilter: StorePagesFilterInput
    $productTemplatePageFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        homePages: pages(first: 500, filter: $homePagesFilter) {
          edges {
            ...useCreatePageFragment
          }
        }

        customPages: pages(first: 500, filter: $customPagesFilter) {
          edges {
            ...useCreatePageFragment
          }
        }

        productTemplatePage: pages(
          first: 500
          filter: $productTemplatePageFilter
        ) {
          edges {
            ...useCreatePageFragment
          }
        }
      }
    }
  }

  ${useCreatePageFragment}
`;

export default (
  variables: useCreatePageReadCacheVariables,
): MutationTuple<createPageType, createPageVariables>[0] => {
  const { t } = useTranslation('page-manager');
  const [createPage] = useMutation<createPageType, createPageVariables>(
    gql`
      mutation createPage($input: CreatePageInput!) {
        createPage(input: $input) {
          status
          newPage {
            ...useCreatePageFragment
          }
        }
      }

      ${useCreatePageFragment}
    `,
    {
      update: (cache: DataProxy, { data }: { data: createPageType }) => {
        if (data.createPage?.status !== 'OK') {
          message.error(t('create-page.error'));
          return;
        }

        const storeData = cache.readQuery<
          useCreatePageReadCache,
          useCreatePageReadCacheVariables
        >({
          query,
          variables,
        });
        const newPage: getPagesViewerStoreHomePagesEdges | null =
          data.createPage?.newPage;

        if (!storeData || !newPage) return;

        cache.writeQuery<
          useCreatePageReadCache,
          useCreatePageReadCacheVariables
        >({
          query,
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
      },
    },
  );

  return createPage;
};
