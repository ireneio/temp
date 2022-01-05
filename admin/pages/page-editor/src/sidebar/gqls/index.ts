// import
import { gql } from '@apollo/client';

// graphql import
import { moduleTabFragment } from './moduleTab';

// definition
export const sidebarFragment = gql`
  fragment sidebarFragment on Store {
    id
    ...moduleTabFragment
  }

  ${moduleTabFragment}
`;
