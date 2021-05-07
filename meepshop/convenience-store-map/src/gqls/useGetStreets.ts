// import
import gql from 'graphql-tag';

// definition
export const getValidatedConvenienceStoreStreets = gql`
  query getValidatedConvenienceStoreStreets(
    $input: ValidatedConvenienceStoreStreetsFilterInput!
  ) {
    validatedConvenienceStoreStreets(input: $input)
  }
`;

export const useGetStreetFragment = gql`
  fragment useGetStreetFragment on Area {
    id
    streets
  }
`;
