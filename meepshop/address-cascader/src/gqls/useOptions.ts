// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useOptionsAddressServiceFragment = gql`
  fragment useOptionsAddressServiceFragment on AddressService {
    countries {
      id
      name {
        ...localeFragment
      }

      children: cities {
        id
        name {
          ...localeFragment
        }

        children: areas {
          id
          name {
            ...localeFragment
          }
          zipCodes
        }
      }
    }
  }

  ${localeFragment}
`;
