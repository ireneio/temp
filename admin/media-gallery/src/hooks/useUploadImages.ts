// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationTuple } from '@apollo/react-hooks';

// import
import { useMutation } from '@apollo/react-hooks';

// graphql typescript
import {
  uploadImages as uploadImagesType,
  uploadImagesVariables as uploadImagesVariablesType,
  getImagesVariables as getImagesVariablesType,
  useUploadImagesUserFragment as useUploadImagesUserFragmentType,
  useUploadImagesWriteCache as useUploadImagesWriteCacheType,
  useUploadImagesWriteCacheVariables as useUploadImagesWriteCacheVariablesType,
  useUploadImagesWriteCache_viewer_images_edges_node as useUploadImagesWriteCacheViewerImagesEdgesNodeType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useUploadImagesWriteCache,
  uploadImages,
} from '../gqls/useUploadImages';

// definition
export default (
  variables: getImagesVariablesType,
  viewer: useUploadImagesUserFragmentType | null,
): MutationTuple<uploadImagesType, uploadImagesVariablesType>[0] => {
  const [mutation] = useMutation<uploadImagesType, uploadImagesVariablesType>(
    uploadImages,
    {
      update: (
        cache: DataProxy,
        { data: { createImages } }: { data: uploadImagesType },
      ) => {
        if (
          !viewer?.id ||
          createImages.__typename !== 'CreateImagesSuccessResponse'
        )
          return;

        cache.writeQuery<
          useUploadImagesWriteCacheType,
          useUploadImagesWriteCacheVariablesType
        >({
          query: useUploadImagesWriteCache,
          variables,
          data: {
            viewer: !viewer
              ? null
              : {
                  ...viewer,
                  images: !viewer.images
                    ? null
                    : {
                        ...viewer.images,
                        edges: [
                          ...createImages.images.map(
                            ({
                              id,
                              scaledSrc,
                            }: useUploadImagesWriteCacheViewerImagesEdgesNodeType) => ({
                              __typename: 'ImageEdge' as const,
                              node: {
                                __typename: 'Image' as const,
                                id,
                                scaledSrc,
                              },
                            }),
                          ),
                          ...viewer.images.edges,
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
