// typescript import
import { DataProxy } from 'apollo-cache';

import useSelectedPageType from '../../../hooks/useSelectedPage';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';

// graphql typescript
import { getPages_viewer_store_homePage_edges as getPagesViewerStoreHomePageEdges } from '../../../__generated__/getPages';
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
import localeFragment from '@admin/utils/lib/fragments/locale';

// definition
const useDuplicatePageFragment = gql`
  fragment useDuplicatePageFragment on PageEdge {
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
  query useDuplicatePageReadCache(
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
            ...useDuplicatePageFragment
          }
        }

        customPage: pages(first: 500, filter: $customPagesFilter) {
          edges {
            ...useDuplicatePageFragment
          }
        }

        templatePage: pages(first: 500, filter: $templatePagesFilter) {
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
  isHomePage: boolean,
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
        const duplicatedPage: getPagesViewerStoreHomePageEdges | null =
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
                homePage: {
                  ...storeData.viewer?.store?.homePage,
                  edges: [
                    ...(duplicatedPage.node.pageType !== 'home'
                      ? []
                      : [duplicatedPage]),
                    ...(storeData.viewer?.store?.homePage.edges || []),
                  ],
                },
                customPage: {
                  ...storeData.viewer?.store?.customPage,
                  edges: [
                    ...(duplicatedPage.node.pageType !== 'custom'
                      ? []
                      : [duplicatedPage]),
                    ...(storeData.viewer?.store?.customPage.edges || []),
                  ],
                },
                templatePage: {
                  ...storeData.viewer?.store?.templatePage,
                  edges: [
                    ...(duplicatedPage.node.pageType !== 'template'
                      ? []
                      : [duplicatedPage]),
                    ...(storeData.viewer?.store?.templatePage.edges || []),
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
      const duplicatedPage: getPagesViewerStoreHomePageEdges | null =
        data.duplicatePage?.duplicatedPage;

      if (!duplicatedPage) return;

      setSelectedPage({
        ...duplicatedPage.node,
        isHomePage,
      });
    });
  }, [id, pageType, setSelectedPage, isHomePage, duplicatePage]);
};
