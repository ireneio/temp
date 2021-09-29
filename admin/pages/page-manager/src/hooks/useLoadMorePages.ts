// typescript import
import { QueryResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';

// graphql typescript
import {
  getPages as getPagesType,
  getPagesVariables,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  getHomePages,
  getCustomPages,
  getProductTemplatePage,
} from '../gqls/useLoadMorePages';

// definition
export default (
  fetchMore: QueryResult<getPagesType, getPagesVariables>['fetchMore'],
  variables: getPagesVariables,
): ((
  subKey: 'home-page' | 'custom-page' | 'template-page',
  pageInfo: { hasNextPage: boolean; endCursor: string },
) => void) =>
  useCallback(
    (subKey, pageInfo) => {
      const { field, query, variables: fetchMoreVariables } = {
        'home-page': {
          field: 'homePages' as const,
          query: getHomePages,
          variables: {
            homePagesAfter: pageInfo.endCursor,
            homePagesFilter: variables.homePagesFilter,
          },
        },
        'custom-page': {
          field: 'customPages' as const,
          query: getCustomPages,
          variables: {
            customPagesAfter: pageInfo.endCursor,
            customPagesFilter: variables.customPagesFilter,
          },
        },
        'template-page': {
          field: 'productTemplatePage' as const,
          query: getProductTemplatePage,
          variables: {
            productTemplatePageAfter: pageInfo.endCursor,
            productTemplatePageFilter: variables.productTemplatePageFilter,
          },
        },
      }[subKey];

      fetchMore({
        query,
        variables: fetchMoreVariables as getPagesVariables,
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult?.viewer?.store?.[field]) return previousResult;

          return {
            ...previousResult,
            viewer: {
              ...previousResult.viewer,
              store: {
                ...previousResult.viewer?.store,
                [field]: {
                  ...previousResult.viewer?.store?.[field],
                  edges: [
                    ...(previousResult.viewer?.store?.[field].edges || []),
                    ...fetchMoreResult.viewer.store[field].edges,
                  ],
                  pageInfo: fetchMoreResult.viewer.store[field].pageInfo,
                },
              },
            },
          };
        },
      });
    },
    [fetchMore, variables],
  );
