// import
import uuid from 'uuid/v4';

// graphql typescript
import { socialMediaFragment } from './src/__generated__/socialMediaFragment';

// definition
export default {
  __typename: 'SocialMediaModule',
  id: uuid(),
  socialMediaType: 'ORIGIN',
  justifyContent: 'FLEX_START',
  color: '#cccccc',
  showFacebook: true,
  showLine: true,
  showWechat: true,
  showTwitter: true,
} as socialMediaFragment;
