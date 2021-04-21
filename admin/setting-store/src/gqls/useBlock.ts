// import
import gql from 'graphql-tag';

// graphql import
import { cnameFragment } from './cname';
import { senderFragment } from './sender';
import { interfaceFragment } from './interface';
import { domainFragment } from './domain';
import { storeStatusFragment } from './storeStatus';

// definition
export const useBlockFragment = gql`
  fragment useBlockFragment on Store {
    id
    ...cnameFragment
    ...senderFragment
    ...interfaceFragment
    ...domainFragment
    ...storeStatusFragment
  }

  ${cnameFragment}
  ${senderFragment}
  ${interfaceFragment}
  ${domainFragment}
  ${storeStatusFragment}
`;
