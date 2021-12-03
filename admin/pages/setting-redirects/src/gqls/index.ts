// import
import { gql } from '@apollo/client';

// graphql import
import { modalFragmet } from './modal';
import { useColumnsStoreFragment } from './useColumns';

// definition
export const getRedirects = gql`
  query getRedirects {
    viewer {
      id
      store {
        id
        ...modalFragmet
        ...useColumnsStoreFragment
      }
    }
  }

  ${modalFragmet}
  ${useColumnsStoreFragment}
`;
