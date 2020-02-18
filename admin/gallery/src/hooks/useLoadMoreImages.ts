// typescript import
import { QueryResult } from '@apollo/react-common';

// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { getScrollPosition } from 'fbjs';

// graphql typescript
import { getImages, getImagesVariables } from '../__generated__/getImages';
import { useLoadMoreImagesFragment as useLoadMoreImagesFragmentType } from './__generated__/useLoadMoreImagesFragment';

// definition
export const useLoadMoreImagesFragment = gql`
  fragment useLoadMoreImagesFragment on PageInfo {
    hasNextPage
    endCursor
  }
`;

export default (
  fetchMore: QueryResult<getImages, getImagesVariables>['fetchMore'],
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
