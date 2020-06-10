// import
import uuid from 'uuid/v4';

// graphql typescript
import { socialThumbsFragment } from './src/__generated__/socialThumbsFragment';

// definition
export default {
  __typename: 'SocialThumbsModule',
  id: uuid(),
  href: 'https://www.google.com.tw',
  justifyContent: 'FLEX_START',
} as socialThumbsFragment;
