// graphql typescript
import { carouselFragment_images as carouselFragmentImages } from '@meepshop/types/gqls/meepshop';

// definition
export const DEFAULT_IMAGES: carouselFragmentImages[] = [
  {
    __typename: 'CarouselModuleImage',
    image: {
      __typename: 'Image',
      id: 'image-id-1',
      scaledSrc: null,
    },
    link: null,
  },
  {
    __typename: 'CarouselModuleImage',
    image: {
      __typename: 'Image',
      id: 'image-id-2',
      scaledSrc: null,
    },
    link: null,
  },
  {
    __typename: 'CarouselModuleImage',
    image: {
      __typename: 'Image',
      id: 'image-id-3',
      scaledSrc: null,
    },
    link: null,
  },
];
