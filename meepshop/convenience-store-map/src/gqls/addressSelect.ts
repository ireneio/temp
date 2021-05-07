// import
import gql from 'graphql-tag';

// definition
export const getValidatedConvenienceStoreCities = gql`
  query getValidatedConvenienceStoreCities(
    $input: ValidatedConvenienceStoreCitiesFilterInput!
  ) {
    validatedConvenienceStoreCities(input: $input) {
      id
      name {
        zh_TW
      }

      children: cvsAreas @client {
        id
        name {
          zh_TW
        }
        streets
      }
    }
  }
`;
