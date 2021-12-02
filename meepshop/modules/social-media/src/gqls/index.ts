// import
import { gql } from '@apollo/client';

// definition
export const socialMediaFragment = gql`
  fragment socialMediaFragment on SocialMediaModule {
    id
    socialMediaType
    justifyContent
    color
    showFacebook
    showLine
    showWechat
    showTwitter
  }
`;
