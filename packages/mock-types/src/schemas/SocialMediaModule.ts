// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { SocialMediaModuleMock } from './__generated__/SocialMediaModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment SocialMediaModuleMock on SocialMediaModule {
    socialMediaType
    justifyContent
    color
    showFacebook
    showLine
    showWechat
    showTwitter
  }
`;

export default mock.add<SocialMediaModuleMock>('SocialMediaModule', [
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
    } as SocialMediaModuleMock),
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
    } as SocialMediaModuleMock),
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
    } as SocialMediaModuleMock),
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
    } as SocialMediaModuleMock),
]);
