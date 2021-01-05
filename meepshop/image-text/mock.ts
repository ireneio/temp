// import
import uuid from 'uuid/v4';

import imageMock from '@meepshop/image/mock';

// graphql typescript
import { ImageTextModulePosition } from '../../__generated__/meepshop';

// definition
export default {
  __typename: 'ImageTextModule' as const,
  id: uuid(),
  image: imageMock.image,
  link: imageMock.link,
  width: 100,
  title: {
    __typename: 'ImageTextModuleField' as const,
    content: 'title',
    fontSize: 24,
  },
  description: {
    __typename: 'ImageTextModuleField' as const,
    content: 'description',
    fontSize: 20,
  },
  button: {
    __typename: 'ImageTextModuleField' as const,
    content: 'button',
    fontSize: 16,
  },
  titleBold: true,
  color: '#003380',
  hoverColor: '#cccccc',
  position: 'LEFT_TOP' as ImageTextModulePosition,
  alt: 'ImageTextModule',
};
