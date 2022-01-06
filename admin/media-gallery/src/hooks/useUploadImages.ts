// typescript import
import { DataProxy, MutationFunction } from '@apollo/client';

// import
import { useMutation } from '@apollo/client';

// graphql typescript
import {
  uploadImages as uploadImagesType,
  uploadImagesVariables as uploadImagesVariablesType,
  useUploadImagesUserFragment as useUploadImagesUserFragmentType,
  useUploadImagesUserFragment_images_edges_node as useUploadImagesUserFragmentImagesEdgesNodeType,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  useUploadImagesUserFragment,
  uploadImages,
} from '../gqls/useUploadImages';

// definition
export default (
  viewer: useUploadImagesUserFragmentType | null,
): MutationFunction<uploadImagesType, uploadImagesVariablesType> => {
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

        cache.writeFragment<useUploadImagesUserFragmentType>({
          id: viewer.id,
          fragment: useUploadImagesUserFragment,
          fragmentName: 'useUploadImagesUserFragment',
          data: {
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
                      }: useUploadImagesUserFragmentImagesEdgesNodeType) => ({
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
        });
      },
    },
  );

  return mutation;
};
