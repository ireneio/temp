// import
import { gql } from '@apollo/client';

// definition
export const getValidatedConvenienceStoreAreas = gql`
  query getValidatedConvenienceStoreAreas(
    $input: ValidatedConvenienceStoreAreasFilterInput!
  ) {
    validatedConvenienceStoreAreas(input: $input) {
      id
      name {
        zh_TW
      }
    }
  }
`;

export const addressSelectCityFragment = gql`
  fragment addressSelectCityFragment on City {
    id
    cvsAreas {
      id
      name {
        zh_TW
      }
      streets
    }
  }
`;
