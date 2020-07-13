// import
import gql from 'graphql-tag';

// definition
export default gql`
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
