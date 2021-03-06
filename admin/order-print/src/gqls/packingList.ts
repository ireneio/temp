// import
import { gql } from '@apollo/client';

// graphql import
import { packingListDetailFragment } from './packingListDetail';

// definition
export const packingListFragment = gql`
  fragment packingListFragment on User {
    id
    ...packingListDetailFragment
  }

  ${packingListDetailFragment}
`;
