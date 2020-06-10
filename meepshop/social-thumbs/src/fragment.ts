// import
import gql from 'graphql-tag';

// definition
export default gql`
  fragment socialThumbsFragment on SocialThumbsModule {
    id
    href
    justifyContent
  }
`;
