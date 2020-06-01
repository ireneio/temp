// typescript import
import { DataProxy } from 'apollo-cache';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';

// graphql typescript
import {
  assignDefaultProductTemplatePage as assignDefaultProductTemplatePageType,
  assignDefaultProductTemplatePageVariables,
} from './__generated__/assignDefaultProductTemplatePage';
import { useAssignDefaultProductTemplatePageReadCache } from './__generated__/useAssignDefaultProductTemplatePageReadCache';
import { useAssignDefaultProductTemplatePageFragment } from './__generated__/useAssignDefaultProductTemplatePageFragment';

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
                  templatePage: pages(first: 500, filter: { type: TEMPLATE }) {
                    edges {
                      node {
                        id
                        isProductDefault
                      }
                    }
                  }
                }
              }
            }
          `,
        });
        const storeId = storeData?.viewer?.store?.id;
        const templatePage = storeData?.viewer?.store?.templatePage;

        if (!storeId || !templatePage) return;

        cache.writeFragment<useAssignDefaultProductTemplatePageFragment>({
          id: storeId,
          fragment: gql`
            fragment useAssignDefaultProductTemplatePageFragment on Store {
              id
              templatePage: pages(first: 500, filter: { type: TEMPLATE }) {
                edges {
                  node {
                    id
                    isProductDefault
                  }
                }
              }
            }
          `,
          data: {
            __typename: 'Store',
            id: storeId,
            templatePage: {
              ...templatePage,
              edges: (templatePage.edges || []).map(({ node, ...edge }) => ({
                ...edge,
                node: {
                  ...node,
                  isProductDefault: node.id === id,
                },
              })),
            },
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
