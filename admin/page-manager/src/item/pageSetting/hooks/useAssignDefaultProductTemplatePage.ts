// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import {
  assignDefaultProductTemplatePage as assignDefaultProductTemplatePageType,
  assignDefaultProductTemplatePageVariables,
} from './__generated__/assignDefaultProductTemplatePage';
import { useAssignDefaultProductTemplatePageReadCache } from './__generated__/useAssignDefaultProductTemplatePageReadCache';
import { useAssignDefaultProductTemplatePageFragment } from './__generated__/useAssignDefaultProductTemplatePageFragment';
import { useAssignDefaultProductTemplatePageUpdateNewPageFragment } from './__generated__/useAssignDefaultProductTemplatePageUpdateNewPageFragment';
import { useAssignDefaultProductTemplatePageUpdatePrevPageFragment } from './__generated__/useAssignDefaultProductTemplatePageUpdatePrevPageFragment';

// definition
export default (id: string): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [assignDefaultProductTemplatePage] = useMutation<
    assignDefaultProductTemplatePageType,
    assignDefaultProductTemplatePageVariables
  >(
    gql`
      mutation assignDefaultProductTemplatePage(
        $input: AssignDefaultProductTemplatePageInput!
      ) {
        assignDefaultProductTemplatePage(input: $input) {
          status
        }
      }
    `,
    {
      update: (
        cache: DataProxy,
        { data }: { data: assignDefaultProductTemplatePageType },
      ) => {
        if (data.assignDefaultProductTemplatePage?.status !== 'OK') {
          message.error(t('assign-default-product-template-page.error'));
          return;
        }

        const storeData = cache.readQuery<
          useAssignDefaultProductTemplatePageReadCache
        >({
          query: gql`
            query useAssignDefaultProductTemplatePageReadCache {
              viewer {
                id
                store {
                  id
                  defaultProductTemplatePage {
                    id
                  }
                }
              }
            }
          `,
        });
        const storeId = storeData?.viewer?.store?.id;
        const prevDefaultProductTemplatePageId =
          storeData?.viewer?.store?.defaultProductTemplatePage.id;

        if (!storeId) return;

        cache.writeFragment<useAssignDefaultProductTemplatePageFragment>({
          id: storeId,
          fragment: gql`
            fragment useAssignDefaultProductTemplatePageFragment on Store {
              id
              defaultProductTemplatePage {
                id
              }
            }
          `,
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
          useAssignDefaultProductTemplatePageUpdateNewPageFragment
        >({
          id,
          fragment: gql`
            fragment useAssignDefaultProductTemplatePageUpdateNewPageFragment on Page {
              id
              isDefaultProductTemplatePage @client
            }
          `,
          data: {
            __typename: 'Page',
            id,
            isDefaultProductTemplatePage: true,
          },
        });

        if (prevDefaultProductTemplatePageId)
          cache.writeFragment<
            useAssignDefaultProductTemplatePageUpdatePrevPageFragment
          >({
            id: prevDefaultProductTemplatePageId,
            fragment: gql`
              fragment useAssignDefaultProductTemplatePageUpdatePrevPageFragment on Page {
                id
                isDefaultProductTemplatePage @client
              }
            `,
            data: {
              __typename: 'Page',
              id: prevDefaultProductTemplatePageId,
              isDefaultProductTemplatePage: false,
            },
          });

        message.success(t('assign-default-product-template-page.success'));
      },
    },
  );

  return useCallback(() => {
    assignDefaultProductTemplatePage({ variables: { input: { pageId: id } } });
  }, [id, assignDefaultProductTemplatePage]);
};
