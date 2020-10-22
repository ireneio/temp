// typescript import
import { PropsType } from '@meepshop/carousel';

// import
import { useMemo } from 'react';

import { placeholderThumbnail_scaledSrc as placeholderThumbnail } from '@meepshop/images';

// graphql typescript
import {
  useImagesFragment,
  useImagesFragment_galleries_images as useImagesFragmentGalleriesImages,
} from '../gqls/__generated__/useImagesFragment';

// definition
export default (product: useImagesFragment | null): PropsType['images'] =>
  useMemo(() => {
    const images: PropsType['images'] = [
      ...(product?.coverImage?.scaledSrc ? [product.coverImage] : []),
      ...(product?.galleries?.[0]?.images || []).filter(
        image => image?.scaledSrc && image.id !== product?.coverImage?.id,
      ),
    ].map(({ id, scaledSrc }: useImagesFragmentGalleriesImages) => ({
      __typename: 'CarouselModuleImage',
      link: null,
      image: {
        __typename: 'Image',
        id,
        scaledSrc,
      },
    }));

    return images.length
      ? images
      : [
          {
            __typename: 'CarouselModuleImage',
            link: null,
            image: {
              __typename: 'Image',
              id: 'product-carousel-placeholder-id',
              scaledSrc: {
                __typename: 'ScaledURLs',
                ...placeholderThumbnail,
              },
            },
          },
        ];
  }, [product]);
