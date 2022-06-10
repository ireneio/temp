// import
import { gql } from '@apollo/client';

// graphql import
import { prescoContentFragment } from './prescoContent';

// definition
export const prescoFragment = gql`
  fragment prescoFragment on User {
    id
    ...prescoContentFragment
  }

  ${prescoContentFragment}
`;
