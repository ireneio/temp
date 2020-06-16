// typescript import
import { DataProxy } from 'apollo-cache';
import { ExecutionResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { message } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { editFragment as editFragmentType } from '../__generated__/editFragment';
import {
  renamePageWithSEO as renamePageWithSEOType,
  renamePageWithSEOVariables,
} from './__generated__/renamePageWithSEO';
import {
  useRenamePageWithSEOCache,
  useRenamePageWithSEOCacheVariables,
} from './__generated__/useRenamePageWithSEOCache';
import { useRenamePageWithSEOFragment } from './__generated__/useRenamePageWithSEOFragment';

// definition
const query = gql`
  query useRenamePageWithSEOCache(
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
  pageType: editFragmentType['pageType'],
  variables: useRenamePageWithSEOCacheVariables,
): ((
  input: renamePageWithSEOVariables['input'],
) => Promise<ExecutionResult<renamePageWithSEOType>>) => {
  const { t } = useTranslation('page-manager');
  const [renamePageWithSEO] = useMutation<
    renamePageWithSEOType,
    renamePageWithSEOVariables
  >(
    gql`
      mutation renamePageWithSEO($input: RenamePageWithSEOInput!) {
        renamePageWithSEO(input: $input) {
          status
        }
      }
    `,
  );

  return useCallback(
    (input: renamePageWithSEOVariables['input']) =>
      renamePageWithSEO({
        variables: { input },
        update: (
          cache: DataProxy,
          { data }: { data: renamePageWithSEOType },
        ) => {
          if (data.renamePageWithSEO?.status !== 'OK') {
            switch (data.renamePageWithSEO?.status) {
              case 'FAIL_PAGE_PATH_DUPLICATE':
                message.error(
                  t('rename-page-with-seo.error.FAIL_PAGE_PATH_DUPLICATE'),
                );
                break;

              default:
                message.error(t('rename-page-with-seo.error.default'));
                break;
            }
            return;
          }

          const storeData = cache.readQuery<
            useRenamePageWithSEOCache,
            useRenamePageWithSEOCacheVariables
          >({
            query,
            variables,
          });

          if (!storeData) return;

          cache.writeQuery<
            useRenamePageWithSEOCache,
            useRenamePageWithSEOCacheVariables
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
                    edges:
                      pageType !== 'home'
                        ? storeData.viewer?.store?.homePage.edges || []
                        : [
                            {
                              __typename: 'PageEdge',
                              node: { __typename: 'Page', id: input.pageId },
                            },
                            ...(
                              storeData.viewer?.store?.homePage.edges || []
                            ).filter(({ node: { id } }) => id !== input.pageId),
                          ],
                  },
                  customPage: {
                    ...storeData.viewer?.store?.customPage,
                    edges:
                      pageType !== 'custom'
                        ? storeData.viewer?.store?.customPage.edges || []
                        : [
                            {
                              __typename: 'PageEdge',
                              node: { __typename: 'Page', id: input.pageId },
                            },
                            ...(
                              storeData.viewer?.store?.customPage.edges || []
                            ).filter(({ node: { id } }) => id !== input.pageId),
                          ],
                  },
                  templatePage: {
                    ...storeData.viewer?.store?.templatePage,
                    edges:
                      pageType !== 'template'
                        ? storeData.viewer?.store?.templatePage.edges || []
                        : [
                            {
                              __typename: 'PageEdge',
                              node: { __typename: 'Page', id: input.pageId },
                            },
                            ...(
                              storeData.viewer?.store?.templatePage.edges || []
                            ).filter(({ node: { id } }) => id !== input.pageId),
                          ],
                  },
                },
              },
            } as useRenamePageWithSEOCache,
            variables,
          });
          cache.writeFragment<useRenamePageWithSEOFragment>({
            id: input.pageId,
            fragment: gql`
              fragment useRenamePageWithSEOFragment on Page {
                id
                title {
                  zh_TW
                }
                path
                addressTitle
                seo {
                  keywords
                  description
                  image
                }
              }
            `,
            data: {
              __typename: 'Page',
              id: input.pageId,
              title: {
                __typename: 'Locale',
                // eslint-disable-next-line @typescript-eslint/camelcase
                zh_TW: input.title,
              },
              path: input.path || null,
              addressTitle: input.tabTitle || null,
              seo: !input.seo
                ? null
                : {
                    __typename: 'seoType',
                    keywords: input.seo.keywords || null,
                    description: input.seo.description || null,
                    image: input.seo.image || null,
                  },
            } as useRenamePageWithSEOFragment,
          });
          message.success(t('rename-page-with-seo.success'));
        },
      }),
    [pageType, variables, t, renamePageWithSEO],
  );
};
