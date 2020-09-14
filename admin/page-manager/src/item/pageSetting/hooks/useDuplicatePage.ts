// typescript import
import { DataProxy } from 'apollo-cache';

import useSelectedPageType from '../../../hooks/useSelectedPage';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { getPages_viewer_store_homePages_edges as getPagesViewerStoreHomePagesEdges } from '../../../__generated__/getPages';
import { editFragment as editFragmentType } from '../__generated__/editFragment';
import {
  duplicatePage as duplicatePageType,
  duplicatePageVariables,
} from './__generated__/duplicatePage';
import {
  useDuplicatePageReadCache,
  useDuplicatePageReadCacheVariables,
} from './__generated__/useDuplicatePageReadCache';

// graphql import
import localeFragment from '@meepshop/utils/lib/fragments/locale';

// definition
const useDuplicatePageFragment = gql`
  fragment useDuplicatePageFragment on PageEdge {
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
  query useDuplicatePageReadCache(
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
            ...useDuplicatePageFragment
          }
        }

        customPages: pages(first: 500, filter: $customPagesFilter) {
          edges {
            ...useDuplicatePageFragment
          }
        }

        productTemplatePage: pages(
          first: 500
          filter: $productTemplatePageFilter
        ) {
          edges {
            ...useDuplicatePageFragment
          }
        }
      }
    }
  }

  ${useDuplicatePageFragment}
`;

export default (
  id: string,
  pageType: editFragmentType['pageType'],
  variables: useDuplicatePageReadCacheVariables,
  setSelectedPage: ReturnType<typeof useSelectedPageType>['setSelectedPage'],
): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [duplicatePage] = useMutation<
    duplicatePageType,
    duplicatePageVariables
  >(
    gql`
      mutation duplicatePage($input: DuplicatePageInput!) {
        duplicatePage(input: $input) {
          status
          duplicatedPage {
            ...useDuplicatePageFragment
          }
        }
      }

      ${useDuplicatePageFragment}
    `,
    {
      update: (cache: DataProxy, { data }: { data: duplicatePageType }) => {
        if (data.duplicatePage?.status !== 'OK') {
          message.error(t('duplicate-page.error'));
          return;
        }

        const storeData = cache.readQuery<
          useDuplicatePageReadCache,
          useDuplicatePageReadCacheVariables
        >({
          query,
          variables,
        });
        const duplicatedPage: getPagesViewerStoreHomePagesEdges | null =
          data.duplicatePage?.duplicatedPage;

        if (!storeData || !duplicatedPage) return;

        cache.writeQuery<
          useDuplicatePageReadCache,
          useDuplicatePageReadCacheVariables
        >({
          query,
          data: {
            ...storeData,
            viewer: {
              ...storeData.viewer,
              store: {
                ...storeData.viewer?.store,
                homePages: {
                  ...storeData.viewer?.store?.homePages,
                  edges: [
                    ...(duplicatedPage.node.pageType !== 'home'
                      ? []
                      : [duplicatedPage]),
                    ...(storeData.viewer?.store?.homePages.edges || []),
                  ],
                },
                customPages: {
                  ...storeData.viewer?.store?.customPages,
                  edges: [
                    ...(duplicatedPage.node.pageType !== 'custom'
                      ? []
                      : [duplicatedPage]),
                    ...(storeData.viewer?.store?.customPages.edges || []),
                  ],
                },
                productTemplatePage: {
                  ...storeData.viewer?.store?.productTemplatePage,
                  edges: [
                    ...(duplicatedPage.node.pageType !== 'template'
                      ? []
                      : [duplicatedPage]),
                    ...(storeData.viewer?.store?.productTemplatePage.edges ||
                      []),
                  ],
                },
              },
            },
          } as useDuplicatePageReadCache,
          variables,
        });
        message.success(t('duplicate-page.success'));
      },
    },
  );

  return useCallback(() => {
    duplicatePage({
      variables: {
        input: {
          pageId: id,
          // TODO: remove, use PageTypeEnum
          pageType: pageType?.toUpperCase() || 'HOME',
        },
      } as duplicatePageVariables,
    }).then(({ data }: { data: duplicatePageType }) => {
      const duplicatedPage: getPagesViewerStoreHomePagesEdges | null =
        data.duplicatePage?.duplicatedPage;

      if (!duplicatedPage) return;

      setSelectedPage(duplicatedPage.node);
    });
  }, [id, pageType, setSelectedPage, duplicatePage]);
};
