// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Modal, message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  deletePage as deletePageType,
  deletePageVariables,
  useDeletePageReadCache as useDeletePageReadCacheTYpe,
  useDeletePageReadCacheVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import { useDeletePageReadCache, deletePage } from '../gqls/useDeletePage';

// definition
export default (
  id: string,
  variables: useDeletePageReadCacheVariables,
): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [mutation] = useMutation<deletePageType, deletePageVariables>(
    deletePage,
    {
      update: (cache: DataProxy, { data }: { data: deletePageType }) => {
        if (data.deletePage?.status !== 'OK') {
          message.error(t('delete-page.error'));
          return;
        }

        const storeData = cache.readQuery<
          useDeletePageReadCacheTYpe,
          useDeletePageReadCacheVariables
        >({
          query: useDeletePageReadCache,
          variables,
        });

        if (!storeData) return;

        cache.writeQuery<
          useDeletePageReadCacheTYpe,
          useDeletePageReadCacheVariables
        >({
          query: useDeletePageReadCache,
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
                          edges: storeData.viewer.store.homePages.edges.filter(
                            ({ node }) => node.id !== id,
                          ),
                        },
                        customPages: {
                          ...storeData.viewer.store.customPages,
                          edges: storeData.viewer.store.customPages.edges.filter(
                            ({ node }) => node.id !== id,
                          ),
                        },
                        productTemplatePage: {
                          ...storeData.viewer.store.productTemplatePage,
                          edges: storeData.viewer.store.productTemplatePage.edges.filter(
                            ({ node }) => node.id !== id,
                          ),
                        },
                      },
                },
          },
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
      onOk: () => mutation({ variables: { input: { pageId: id } } }),
      centered: true,
    });
  }, [id, t, mutation]);
};
