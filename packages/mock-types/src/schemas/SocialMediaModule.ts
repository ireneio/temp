// import
import mock from '../mock';

// graphql typescript
import {
  SocialMediaModuleType,
  JustifyContent,
} from '../../../../__generated__/meepshop';
import { socialMediaModuleMockFragment } from './gqls/__generated__/socialMediaModuleMockFragment';

// definition
export default mock.add<socialMediaModuleMockFragment>('SocialMediaModule', [
  () => ({
    __typename: 'SocialMediaModule',
    socialMediaType: 'NONE' as SocialMediaModuleType,
    justifyContent: 'FLEX_START' as JustifyContent,
    color: '#cccccc',
    showFacebook: true,
    showLine: true,
    showWechat: true,
    showTwitter: true,
  }),
  () => ({
    __typename: 'SocialMediaModule',
    socialMediaType: 'CIRCLE' as SocialMediaModuleType,
    justifyContent: 'FLEX_END' as JustifyContent,
    color: '#cccccc',
    showFacebook: true,
    showLine: true,
    showWechat: true,
    showTwitter: true,
  }),
  () => ({
    __typename: 'SocialMediaModule',
    socialMediaType: 'CIRCLE_FILLED' as SocialMediaModuleType,
    justifyContent: 'CENTER' as JustifyContent,
    color: '#cccccc',
    showFacebook: true,
    showLine: true,
    showWechat: true,
    showTwitter: true,
  }),
  () => ({
    __typename: 'SocialMediaModule',
    socialMediaType: 'ORIGIN' as SocialMediaModuleType,
    justifyContent: 'CENTER' as JustifyContent,
    color: '#cccccc',
    showFacebook: true,
    showLine: true,
    showWechat: true,
    showTwitter: true,
  }),
]);
