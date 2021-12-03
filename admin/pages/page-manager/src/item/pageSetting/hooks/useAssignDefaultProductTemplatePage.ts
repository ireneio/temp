// typescript import
import { DataProxy } from '@apollo/client';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import message from '@admin/message';
import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  assignDefaultProductTemplatePage as assignDefaultProductTemplatePageType,
  assignDefaultProductTemplatePageVariables,
  useAssignDefaultProductTemplatePageReadCache as useAssignDefaultProductTemplatePageReadCacheType,
  useAssignDefaultProductTemplatePageFragment as useAssignDefaultProductTemplatePageFragmentType,
  useAssignDefaultProductTemplatePageUpdateNewPageFragment as useAssignDefaultProductTemplatePageUpdateNewPageFragmentType,
  useAssignDefaultProductTemplatePageUpdatePrevPageFragment as useAssignDefaultProductTemplatePageUpdatePrevPageFragmentType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  assignDefaultProductTemplatePage,
  useAssignDefaultProductTemplatePageReadCache,
  useAssignDefaultProductTemplatePageFragment,
  useAssignDefaultProductTemplatePageUpdateNewPageFragment,
  useAssignDefaultProductTemplatePageUpdatePrevPageFragment,
} from '../gqls/useAssignDefaultProductTemplatePage';

// definition
export default (id: string): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [mutation] = useMutation<
    assignDefaultProductTemplatePageType,
    assignDefaultProductTemplatePageVariables
  >(assignDefaultProductTemplatePage, {
    update: (
      cache: DataProxy,
      { data }: { data: assignDefaultProductTemplatePageType },
    ) => {
      if (data.assignDefaultProductTemplatePage?.status !== 'OK') {
        message.error(t('assign-default-product-template-page.error'));
        return;
      }

      const storeData = cache.readQuery<
        useAssignDefaultProductTemplatePageReadCacheType
      >({
        query: useAssignDefaultProductTemplatePageReadCache,
      });
      const storeId = storeData?.viewer?.store?.id;
      const prevDefaultProductTemplatePageId =
        storeData?.viewer?.store?.defaultProductTemplatePage.id;

      if (!storeId) return;

      cache.writeFragment<useAssignDefaultProductTemplatePageFragmentType>({
        id: storeId,
        fragment: useAssignDefaultProductTemplatePageFragment,
        data: {
          __typename: 'Store',
          id: storeId,
          defaultProductTemplatePage: {
            __typename: 'Page',
            id,
          },
        },
      });

      cache.writeFragment<
        useAssignDefaultProductTemplatePageUpdateNewPageFragmentType
      >({
        id,
        fragment: useAssignDefaultProductTemplatePageUpdateNewPageFragment,
        data: {
          __typename: 'Page',
          id,
          isDefaultProductTemplatePage: true,
        },
      });

      if (prevDefaultProductTemplatePageId)
        cache.writeFragment<
          useAssignDefaultProductTemplatePageUpdatePrevPageFragmentType
        >({
          id: prevDefaultProductTemplatePageId,
          fragment: useAssignDefaultProductTemplatePageUpdatePrevPageFragment,
          data: {
            __typename: 'Page',
            id: prevDefaultProductTemplatePageId,
            isDefaultProductTemplatePage: false,
          },
        });

      message.success(t('assign-default-product-template-page.success'));
    },
  });

  return useCallback(() => {
    mutation({ variables: { input: { pageId: id } } });
  }, [id, mutation]);
};
