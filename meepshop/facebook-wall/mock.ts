// import
import uuid from 'uuid/v4';

// graphql typescript
import { facebookWallFragment } from './src/fragments/__generated__/facebookWallFragment';

// definition
export default {
  __typename: 'FacebookWallModule',
  id: uuid(),
  href: 'https://www.facebook.com/meepshop',
  justifyContent: 'CENTER',
  showPosts: true,
  showFacepile: true,
  smallHeader: true,
  hideCover: true,
  hideCta: true,
} as facebookWallFragment;
