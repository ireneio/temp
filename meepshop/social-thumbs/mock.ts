// import
import uuid from 'uuid/v4';

// graphql typescript
import { JustifyContent } from '../../__generated__/meepshop';

// definition
export default {
  __typename: 'SocialThumbsModule' as const,
  id: uuid(),
  href: 'https://www.google.com.tw',
  justifyContent: 'FLEX_START' as JustifyContent,
};
