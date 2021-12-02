// import
import { gql } from '@apollo/client';

// definition
export const socialThumbsFragment = gql`
  fragment socialThumbsFragment on SocialThumbsModule {
    id
    href
    justifyContent
  }
`;
