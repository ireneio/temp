// import
import gql from 'graphql-tag';

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
