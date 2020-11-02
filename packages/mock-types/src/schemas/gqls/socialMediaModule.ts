// import
import gql from 'graphql-tag';

// definition
export const socialMediaModuleMockFragment = gql`
  fragment socialMediaModuleMockFragment on SocialMediaModule {
    socialMediaType
    justifyContent
    color
    showFacebook
    showLine
    showWechat
    showTwitter
  }
`;
