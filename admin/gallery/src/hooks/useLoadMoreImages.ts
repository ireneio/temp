// typescript import
import { QueryResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import { getScrollPosition } from 'fbjs';

// graphql typescript
import {
  getImages as getImagesType,
  getImagesVariables as getImagesVariablesType,
} from '../gqls/__generated__/getImages';
import { useLoadMoreImagesFragment as useLoadMoreImagesFragmentType } from '../gqls/__generated__/useLoadMoreImagesFragment';

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
            if ((fetchMoreResult?.viewer?.files?.edges || []).length <= 0)
              return previousResult;

            return {
              ...previousResult,
              viewer: {
                ...previousResult.viewer,
                files: {
                  ...fetchMoreResult?.viewer?.files,
                  __typename: 'FileConnection',
                  edges: [
                    ...(previousResult?.viewer?.files?.edges || []),
                    ...(fetchMoreResult?.viewer?.files?.edges || []),
                  ],
                },
              },
            };
          },
        });
    },
    [fetchMore, pageInfo],
  );
