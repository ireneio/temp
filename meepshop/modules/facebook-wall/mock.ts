// import
import uuid from 'uuid/v4';

// graphql typescript
import { JustifyContent } from '@meepshop/types/gqls/meepshop';

// definition
export default {
  __typename: 'FacebookWallModule' as const,
  id: uuid(),
  href: 'https://www.facebook.com/meepshop',
  justifyContent: 'CENTER' as JustifyContent,
  showPosts: true,
  showFacepile: true,
  smallHeader: true,
  hideCover: true,
  hideCta: true,
};
