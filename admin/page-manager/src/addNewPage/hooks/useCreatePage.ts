// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { getPages_viewer_store_homePage_edges as getPagesViewerStoreHomePageEdges } from '../../__generated__/getPages';
import {
  createPage as createPageType,
  createPageVariables,
} from './__generated__/createPage';
import {
  useCreatePageReadCache,
  useCreatePageReadCacheVariables,
} from './__generated__/useCreatePageReadCache';

// graphql import
import localeFragment from '@admin/utils/lib/fragments/locale';

// definition
const useCreatePageFragment = gql`
  fragment useCreatePageFragment on PageEdge {
    node {
      id
      pageType
      title {
        ...localeFragment
      }
      isDefaultTemplatePage: isProductDefault
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
    $templatePagesFilter: StorePagesFilterInput
  ) {
    viewer {
      id
      store {
        id
        homePage: pages(first: 500, filter: $homePagesFilter) {
          edges {
            ...useCreatePageFragment
          }
        }

        customPage: pages(first: 500, filter: $customPagesFilter) {
          edges {
            ...useCreatePageFragment
          }
        }

        templatePage: pages(first: 500, filter: $templatePagesFilter) {
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
        const newPage: getPagesViewerStoreHomePageEdges | null =
          data.createPage?.newPage;

        if (!storeData || !newPage) return;

        cache.writeQuery<
          useCreatePageReadCache,
          useCreatePageReadCacheVariables
        >({
          query,
          data: {
            ...storeData,
            viewer: {
              ...storeData.viewer,
              store: {
                ...storeData.viewer?.store,
                homePage: {
                  ...storeData.viewer?.store?.homePage,
                  edges: [
                    ...(newPage.node.pageType !== 'home' ? [] : [newPage]),
                    ...(storeData.viewer?.store?.homePage.edges || []),
                  ],
                },
                customPage: {
                  ...storeData.viewer?.store?.customPage,
                  edges: [
                    ...(newPage.node.pageType !== 'custom' ? [] : [newPage]),
                    ...(storeData.viewer?.store?.customPage.edges || []),
                  ],
                },
                templatePage: {
                  ...storeData.viewer?.store?.templatePage,
                  edges: [
                    ...(newPage.node.pageType !== 'template' ? [] : [newPage]),
                    ...(storeData.viewer?.store?.templatePage.edges || []),
                  ],
                },
              },
            },
          } as useCreatePageReadCache,
          variables,
        });
      },
    },
  );

  return createPage;
};
