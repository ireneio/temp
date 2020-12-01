// import
import gql from 'graphql-tag';

// definition
export const useCheckUser = gql`
  query useCheckUser($email: String) {
    checkUserInfo(
      search: {
        filter: {
          and: [
            { type: "exact", field: "email", query: $email }
            { type: "exact", field: "type", query: "shopper" }
          ]
        }
      }
    ) {
      exists
    }
  }
`;
