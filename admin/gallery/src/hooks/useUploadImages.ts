// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  uploadImages as uploadImagesType,
  uploadImagesVariables as uploadImagesVariablesType,
} from '../gqls/__generated__/uploadImages';
import {
  useUploadImagesReadCache as useUploadImagesReadCacheType,
  useUploadImagesReadCacheVariables as useUploadImagesReadCacheVariablesType,
} from '../gqls/__generated__/useUploadImagesReadCache';

import { getImagesVariables as getImagesVariablesType } from '../gqls/__generated__/getImages';

// graphql import
import {
  useUploadImagesReadCache,
  uploadImages,
} from '../gqls/useUploadImages';

// definition
export default (
  variables: getImagesVariablesType,
): MutationTuple<uploadImagesType, uploadImagesVariablesType>[0] => {
  const [mutation] = useMutation<uploadImagesType, uploadImagesVariablesType>(
    uploadImages,
    {
      update: (cache: DataProxy, { data }: { data: uploadImagesType }) => {
        if (!data) return;

        const { createFileList } = data;
        const cacheData = cache.readQuery<useUploadImagesReadCacheType>({
          query: useUploadImagesReadCache,
          variables,
        });

        if (!cacheData || !createFileList) return;

        cache.writeQuery<
          useUploadImagesReadCacheType,
          useUploadImagesReadCacheVariablesType
        >({
          query: useUploadImagesReadCache,
          variables,
          data: {
            ...cacheData,
            viewer: {
              ...cacheData.viewer,
              __typename: 'User',
              files: {
                ...cacheData.viewer?.files,
                __typename: 'FileConnection',
                edges: [
                  ...createFileList.map(node => ({
                    __typename: 'FileEdge',
                    node,
                  })),
                  ...(cacheData.viewer?.files?.edges || []).filter(
                    ({ node }) => {
                      return Object.values(node.scaledSrc).every(
                        src => !/^data:/.test(src),
                      );
                    },
                  ),
                ],
              },
            },
          } as useUploadImagesReadCacheType,
        });
      },
    },
  );

  return mutation;
};
