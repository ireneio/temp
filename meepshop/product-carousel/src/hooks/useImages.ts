// typescript import
import { PropsType } from '@meepshop/carousel/lib/index';

// import
import { useMemo } from 'react';

import { placeholderThumbnail_scaledSrc as placeholderThumbnail } from '@meepshop/images';

// graphql typescript
import {
  productCarouselFragment_product as productCarouselFragmentProduct,
  productCarouselFragment_product_galleries_images as productCarouselFragmentProductGalleriesImages,
} from '../__generated__/productCarouselFragment';

// definition
export type CarouselModuleImage = 'CarouselModuleImage';
export type Image = 'Image';
export type ScaledURLs = 'ScaledURLs';

export default (
  product: productCarouselFragmentProduct | null,
): PropsType['images'] =>
  useMemo(() => {
    const images = [
      ...(product?.coverImage?.scaledSrc ? [product.coverImage] : []),
      ...((product?.galleries?.[0]?.images || []).filter(
        (image: productCarouselFragmentProductGalleriesImages | null) =>
          image?.scaledSrc && image.id !== product?.coverImage?.id,
      ) as productCarouselFragmentProductGalleriesImages[]),
    ].map(({ id, scaledSrc }) => ({
      __typename: 'CarouselModuleImage' as CarouselModuleImage,
      link: null,
      image: {
        __typename: 'Image' as Image,
        id,
        ...(scaledSrc
          ? {
              scaledSrc: {
                ...scaledSrc,
              },
            }
          : { scaledSrc: null }),
      },
    }));

    return images.length
      ? images
      : [
          {
            __typename: 'CarouselModuleImage' as CarouselModuleImage,
            link: null,
            image: {
              __typename: 'Image' as Image,
              id: 'product-carousel-placeholder-id',
              scaledSrc: {
                __typename: 'ScaledURLs' as ScaledURLs,
                ...placeholderThumbnail,
              },
            },
          },
        ];
  }, [product]);
