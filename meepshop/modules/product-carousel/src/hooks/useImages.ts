// typescript import
import { PropsType } from '@meepshop/carousel';

// import
import { useMemo } from 'react';

import { placeholderThumbnail_scaledSrc as placeholderThumbnail } from '@meepshop/images';

// graphql typescript
import {
  useImagesFragment,
  useImagesFragment_galleries_images as useImagesFragmentGalleriesImages,
} from '@meepshop/types/gqls/meepshop';

// definition
export default (product: useImagesFragment | null): PropsType['images'] =>
  useMemo(() => {
    const images = (product?.galleries?.[0]?.images || []).reduce(
      (
        result,
        { id, scaledSrc, imageExists }: useImagesFragmentGalleriesImages,
      ) => {
        if (!imageExists) return result;

        const image = {
          __typename: 'CarouselModuleImage' as const,
          link: null,
          image: {
            __typename: 'Image' as const,
            id,
            scaledSrc,
          },
        };

        return id === product?.coverImage?.id
          ? [image, ...result]
          : [...result, image];
      },
      [],
    );

    return images.length
      ? images
      : [
          {
            __typename: 'CarouselModuleImage' as const,
            link: null,
            image: {
              __typename: 'Image' as const,
              id: 'product-carousel-placeholder-id',
              scaledSrc: {
                __typename: 'ScaledURLs' as const,
                ...placeholderThumbnail,
              },
            },
          },
        ];
  }, [product]);
