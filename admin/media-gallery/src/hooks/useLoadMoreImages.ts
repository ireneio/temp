// typescript import
import { QueryResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { getScrollPosition } from 'fbjs';

// graphql typescript
import {
  getImages as getImagesType,
  getImagesVariables as getImagesVariablesType,
  useLoadMoreImagesFragment as useLoadMoreImagesFragmentType,
} from '@meepshop/types/gqls/admin';

// definition
export default (
  fetchMore: QueryResult<getImagesType, getImagesVariablesType>['fetchMore'],
  pageInfo: useLoadMoreImagesFragmentType | null,
): ((
  e: React.UIEvent<HTMLDivElement> & {
    target: HTMLDivElement;
  },
) => void) =>
  useCallback(
    e => {
      if (!pageInfo?.hasNextPage) return;

      const { y } = getScrollPosition(e.target);

      if (y >= e.target.scrollHeight - e.target.clientHeight)
        fetchMore({
          variables: {
            after: pageInfo.endCursor,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if ((fetchMoreResult?.viewer?.images?.edges || []).length <= 0)
              return previousResult;

            return {
              ...previousResult,
              viewer: {
                ...previousResult.viewer,
                images: {
                  ...fetchMoreResult?.viewer?.images,
                  __typename: 'ImageConnection',
                  edges: [
                    ...(previousResult?.viewer?.images?.edges || []),
                    ...(fetchMoreResult?.viewer?.images?.edges || []),
                  ],
                },
              },
            };
          },
        });
    },
    [fetchMore, pageInfo],
  );
