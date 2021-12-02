// import
import { gql } from '@apollo/client';

// graphql import
import { storeDetailFragment } from './storeDetail';

// definition
export const getValidatedConvenienceStores = gql`
  query getValidatedConvenienceStores(
    $input: ValidatedConvenienceStoreFilterInput!
  ) {
    validatedConvenienceStores(input: $input) {
      ...storeDetailFragment
    }
  }

  ${storeDetailFragment}
`;
