// import
import { gql } from '@apollo/client';

// graphql import
import { useSectionsFragment } from './useSections';

// definition
export const moduleTabFragment = gql`
  fragment moduleTabFragment on Store {
    id
    ...useSectionsFragment
  }

  ${useSectionsFragment}
`;
