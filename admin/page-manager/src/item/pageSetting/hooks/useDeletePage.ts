// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Modal, message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  deletePage as deletePageType,
  deletePageVariables,
} from './__generated__/deletePage';
import {
  useDeletePageReadCache,
  useDeletePageReadCacheVariables,
} from './__generated__/useDeletePageReadCache';

// definition
const query = gql`
  query useDeletePageReadCache(
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
            node {
              id
            }
          }
        }

        customPage: pages(first: 500, filter: $customPagesFilter) {
          edges {
            node {
              id
            }
          }
        }

        templatePage: pages(first: 500, filter: $templatePagesFilter) {
          edges {
            node {
              id
            }
          }
        }
      }
    }
  }
`;

export default (
  id: string,
  variables: useDeletePageReadCacheVariables,
): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [deletePage] = useMutation<deletePageType, deletePageVariables>(
    gql`
      mutation deletePage($input: DeletePageInput!) {
        deletePage(input: $input) {
          status
        }
      }
    `,
    {
      update: (cache: DataProxy, { data }: { data: deletePageType }) => {
        if (data.deletePage?.status !== 'OK') {
          message.error(t('delete-page.error'));
          return;
        }

        const storeData = cache.readQuery<
          useDeletePageReadCache,
          useDeletePageReadCacheVariables
        >({
          query,
          variables,
        });

        if (!storeData) return;

        cache.writeQuery<
          useDeletePageReadCache,
          useDeletePageReadCacheVariables
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
                  edges: storeData.viewer?.store?.homePage.edges.filter(
                    ({ node }) => node.id !== id,
                  ),
                },
                customPage: {
                  ...storeData.viewer?.store?.customPage,
                  edges: storeData.viewer?.store?.customPage.edges.filter(
                    ({ node }) => node.id !== id,
                  ),
                },
                templatePage: {
                  ...storeData.viewer?.store?.templatePage,
                  edges: storeData.viewer?.store?.templatePage.edges.filter(
                    ({ node }) => node.id !== id,
                  ),
                },
              },
            },
          } as useDeletePageReadCache,
          variables,
        });
        message.success(t('delete-page.success'));
      },
    },
  );

  return useCallback(() => {
    Modal.confirm({
      title: t('delete-page.confirm.title'),
      content: t('delete-page.confirm.content'),
      okText: t('delete-page.confirm.ok'),
      cancelText: t('delete-page.confirm.cancel'),
      onOk: () => deletePage({ variables: { input: { pageId: id } } }),
      centered: true,
    });
  }, [id, t, deletePage]);
};
