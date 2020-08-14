// import
import uuid from 'uuid/v4';

// graphql typescript
import { carouselFragment } from './src/__generated__/carouselFragment';

// definition
export default {
  __typename: 'CarouselModule',
  id: uuid(),
  images: [],
  width: 50,
  autoPlay: true,
  hoverPause: true,
  showIndicator: true,
  showController: true,
  alt: 'carouselModule',
} as carouselFragment;
