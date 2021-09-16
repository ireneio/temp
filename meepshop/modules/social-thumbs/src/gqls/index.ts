// import
import gql from 'graphql-tag';

// definition
export const socialThumbsFragment = gql`
  fragment socialThumbsFragment on SocialThumbsModule {
    id
    href
    justifyContent
  }
`;
