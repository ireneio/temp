// import
import uuid from 'uuid/v4';

// graphql typescript
import { imageTextFragment } from './src/fragments/__generated__/imageTextFragment';

// definition
export default {
  __typename: 'ImageTextModule',
  id: uuid(),
  image: null,
  link: {
    __typename: 'ProductsLink',
    sort: 'LATEST',
    searchKey: 'searchKey',
    minPrice: 0,
    maxPrice: 100,
    tags: ['tag1', 'tag2'],
    newWindow: true,
    tracking: {
      __typename: 'Tracking',
      name: 'tracking',
      category: null,
    },
  },
  width: 100,
  title: {
    content: 'title',
    fontSize: 24,
  },
  description: {
    content: 'description',
    fontSize: 20,
  },
  button: {
    content: 'button',
    fontSize: 16,
  },
  titleBold: true,
  color: '#003380',
  hoverColor: '#cccccc',
  position: 'LEFT_TOP',
  alt: 'ImageTextModule',
} as imageTextFragment;
