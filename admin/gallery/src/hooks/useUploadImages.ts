// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  uploadImages as uploadImagesType,
  uploadImagesVariables as uploadImagesVariablesType,
  useUploadImagesReadCache as useUploadImagesReadCacheType,
  useUploadImagesReadCacheVariables as useUploadImagesReadCacheVariablesType,
  useUploadImagesReadCache_viewer_files_edges_node as useUploadImagesReadCacheViewerFilesEdgesNode,
  getImagesVariables as getImagesVariablesType,
} from '@meepshop/types/gqls/admin';

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
            viewer: !cacheData.viewer
              ? null
              : {
                  ...cacheData.viewer,
                  files: !cacheData.viewer.files
                    ? null
                    : {
                        ...cacheData.viewer.files,
                        edges: [
                          ...createFileList.map((
                            // SHOULD_NOT_BE_NULL
                            node: useUploadImagesReadCacheViewerFilesEdgesNode,
                          ) => ({
                            __typename: 'FileEdge' as const,
                            node,
                          })),
                          ...cacheData.viewer.files.edges.filter(({ node }) =>
                            Object.values(node.scaledSrc).every(
                              src => !/^data:/.test(src),
                            ),
                          ),
                        ],
                      },
                },
          },
        });
      },
    },
  );

  return mutation;
};
