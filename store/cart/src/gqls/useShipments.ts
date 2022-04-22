// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useShipmentsFragment = gql`
  fragment useShipmentsFragment on LineItem {
    id
    applicableShipments {
      id
      template
      title {
        ...localeFragment
      }
      description {
        ...localeFragment
      }
    }
  }

  ${localeFragment}
`;
