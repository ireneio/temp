// import
import gql from 'graphql-tag';

// graphql import
import { cnameFragment } from './cname';
import { interfaceFragment } from './interface';

// definition
export const useBlockFragment = gql`
  fragment useBlockFragment on Store {
    id
    ...cnameFragment
    ...interfaceFragment
  }

  ${cnameFragment}
  ${interfaceFragment}
`;
