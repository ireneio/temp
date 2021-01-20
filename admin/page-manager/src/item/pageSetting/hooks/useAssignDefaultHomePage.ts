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
  assignDefaultHomePage as assignDefaultHomePageType,
  assignDefaultHomePageVariables,
  useAssignDefaultHomePageReadCache,
  useAssignDefaultHomePageFragment,
  useAssignDefaultHomePageUpdateNewPageFragment,
  useAssignDefaultHomePageUpdatePrevPageFragment,
} from '@meepshop/types/gqls/admin';

// definition
export default (id: string): (() => void) => {
  const { t } = useTranslation('page-manager');
  const [assignDefaultHomePage] = useMutation<
    assignDefaultHomePageType,
    assignDefaultHomePageVariables
  >(
    gql`
      mutation assignDefaultHomePage($input: AssignDefaultHomePageInput!) {
        assignDefaultHomePage(input: $input) {
          status
        }
      }
    `,
    {
      update: (
        cache: DataProxy,
        { data }: { data: assignDefaultHomePageType },
      ) => {
        if (data.assignDefaultHomePage?.status !== 'OK') {
          message.error(t('assign-default-home-page.error'));
          return;
        }

        const storeData = cache.readQuery<useAssignDefaultHomePageReadCache>({
          query: gql`
            query useAssignDefaultHomePageReadCache {
              viewer {
                id
                store {
                  id
                  defaultHomePage {
                    id
                  }
                }
              }
            }
          `,
        });
        const storeId = storeData?.viewer?.store?.id;
        const prevDefaultHomagePageId =
          storeData?.viewer?.store?.defaultHomePage.id;

        if (!storeId) return;

        cache.writeFragment<useAssignDefaultHomePageFragment>({
          id: storeId,
          fragment: gql`
            fragment useAssignDefaultHomePageFragment on Store {
              id
              defaultHomePage {
                id
              }
            }
          `,
          data: {
            __typename: 'Store',
            id: storeId,
            defaultHomePage: {
              __typename: 'Page',
              id,
            },
          },
        });

        cache.writeFragment<useAssignDefaultHomePageUpdateNewPageFragment>({
          id,
          fragment: gql`
            fragment useAssignDefaultHomePageUpdateNewPageFragment on Page {
              id
              isDefaultHomePage @client
            }
          `,
          data: {
            __typename: 'Page',
            id,
            isDefaultHomePage: true,
          },
        });

        if (prevDefaultHomagePageId)
          cache.writeFragment<useAssignDefaultHomePageUpdatePrevPageFragment>({
            id: prevDefaultHomagePageId,
            fragment: gql`
              fragment useAssignDefaultHomePageUpdatePrevPageFragment on Page {
                id
                isDefaultHomePage @client
              }
            `,
            data: {
              __typename: 'Page',
              id: prevDefaultHomagePageId,
              isDefaultHomePage: false,
            },
          });

        message.success(t('assign-default-home-page.success'));
      },
    },
  );

  return useCallback(() => {
    assignDefaultHomePage({ variables: { input: { pageId: id } } });
  }, [id, assignDefaultHomePage]);
};
