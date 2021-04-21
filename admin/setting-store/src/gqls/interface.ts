// import
import gql from 'graphql-tag';

// definition
export const interfaceFragment = gql`
  fragment interfaceFragment on Store {
    id
    locale
    currency
    timezone
  }
`;
