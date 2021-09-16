// import
import uuid from 'uuid/v4';

// definition
export default {
  __typename: 'CarouselModule' as const,
  id: uuid(),
  images: [],
  width: 50,
  autoPlay: true,
  hoverPause: true,
  showIndicator: true,
  showController: true,
  alt: 'carouselModule',
};
