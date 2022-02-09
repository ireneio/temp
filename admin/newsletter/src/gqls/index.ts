// import
import { gql } from '@apollo/client';

// graphql import
import { useInitialValuesNewsLetterFragment } from './useInitialValues';

// definition
export const getEdm = gql`
  query getEdm($isNew: Boolean!, $id: ID) {
    viewer {
      id
      store {
        id
        memberGroups {
          id
          name
          status
        }
        edm(id: $id) @skip(if: $isNew) {
          id
          totalUsers
          sentAt
          ...useInitialValuesNewsLetterFragment
        }
      }
    }
  }

  ${useInitialValuesNewsLetterFragment}
`;
