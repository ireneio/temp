// import
import { gql } from '@apollo/client';

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
