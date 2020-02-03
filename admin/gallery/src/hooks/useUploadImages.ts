// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// graphql typescript
import {
  uploadImages as uploadImagesType,
  uploadImagesVariables,
} from './__generated__/uploadImages';
import { useUploadImagesReadCache } from './__generated__/useUploadImagesReadCache';

import { getImagesVariables } from '../__generated__/getImages';

// definition
const query = gql`
  query useUploadImagesReadCache(
    $first: PositiveInt
    $after: String
    $filter: FileFilterInput
  ) {
    viewer {
      id
      files(first: $first, after: $after, filter: $filter) {
        edges {
          node {
            id
            image
          }
        }

        pageInfo {
          hasNextPage
          endCursor
        }

        total
      }
    }
  }
`;

export default (
  variables: getImagesVariables,
): MutationTuple<uploadImagesType, uploadImagesVariables>[0] => {
  const [uploadImages] = useMutation(
    gql`
      mutation uploadImages($createFileList: [NewFile]) {
        createFileList(createFileList: $createFileList) {
          id
          image
        }
      }
    `,
    {
      update: (cache: DataProxy, { data }: { data: uploadImagesType }) => {
        if (!data) return;

        const { createFileList } = data;
        const cacheData = cache.readQuery<useUploadImagesReadCache>({
          query,
          variables,
        });

        if (!cacheData || !createFileList) return;

        cache.writeQuery({
          query,
          variables,
          data: {
            ...cacheData,
            viewer: {
              ...cacheData.viewer,
              files: {
                ...cacheData.viewer?.files,
                edges: [
                  ...createFileList.map(node => ({
                    __typename: 'FileEdge',
                    node,
                  })),
                  ...(cacheData.viewer?.files?.edges || []).filter(
                    ({ node }) =>
                      !/^data:/.test(
                        node?.image || '' /** TODO: should not be null */,
                      ),
                  ),
                ],
                total:
                  (cacheData.viewer?.files?.total || 0) + createFileList.length,
              },
            },
          },
        });
      },
    },
  );

  return uploadImages;
};
