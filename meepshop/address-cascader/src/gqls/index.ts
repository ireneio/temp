// import
import { gql } from '@apollo/client';

// graphql import
import { useOptionsAddressServiceFragment } from './useOptions';

// definition
export const getCountriesAddress = gql`
  query getCountriesAddress {
    addressService {
      ...useOptionsAddressServiceFragment
    }
  }

  ${useOptionsAddressServiceFragment}
`;
