// import
import mock from '../mock';

// graphql typescript
import { socialMediaModuleMockFragment } from './gqls/__generated__/socialMediaModuleMockFragment';

// definition
export default mock.add<socialMediaModuleMockFragment>('SocialMediaModule', [
  () =>
    ({
      __typename: 'SocialMediaModule',
      socialMediaType: 'NONE',
      justifyContent: 'FLEX_START',
      color: '#cccccc',
      showFacebook: true,
      showLine: true,
      showWechat: true,
      showTwitter: true,
    } as socialMediaModuleMockFragment),
  () =>
    ({
      __typename: 'SocialMediaModule',
      socialMediaType: 'CIRCLE',
      justifyContent: 'FLEX_END',
      color: '#cccccc',
      showFacebook: true,
      showLine: true,
      showWechat: true,
      showTwitter: true,
    } as socialMediaModuleMockFragment),
  () =>
    ({
      __typename: 'SocialMediaModule',
      socialMediaType: 'CIRCLE_FILLED',
      justifyContent: 'CENTER',
      color: '#cccccc',
      showFacebook: true,
      showLine: true,
      showWechat: true,
      showTwitter: true,
    } as socialMediaModuleMockFragment),
  () =>
    ({
      __typename: 'SocialMediaModule',
      socialMediaType: 'ORIGIN',
      justifyContent: 'CENTER',
      color: '#cccccc',
      showFacebook: true,
      showLine: true,
      showWechat: true,
      showTwitter: true,
    } as socialMediaModuleMockFragment),
]);
