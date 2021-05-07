// import
import gql from 'graphql-tag';

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
