// import
import uuid from 'uuid/v4';

// graphql typescript
import {
  SocialMediaModuleType,
  JustifyContent,
} from '@meepshop/types/gqls/meepshop';

// definition
export default {
  __typename: 'SocialMediaModule' as const,
  id: uuid(),
  socialMediaType: 'ORIGIN' as SocialMediaModuleType,
  justifyContent: 'FLEX_START' as JustifyContent,
  color: '#cccccc',
  showFacebook: true,
  showLine: true,
  showWechat: true,
  showTwitter: true,
};
