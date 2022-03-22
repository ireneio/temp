// import
import { gql } from '@apollo/client';

// definition
export const useMenuListFragment = gql`
  fragment useMenuListFragment on User {
    id
    store {
      id
      featureSubscription {
        affiliateFeatureSubscription {
          status
        }
      }
      upsellingEnabled: checkUnleashToggle(
        name: "T6749_storeCnameWhiteListForUpsellingSetting"
      )
    }
    permission @client {
      orders: order {
        isEnabled: index
      }
      products: product {
        isEnabled: index
      }
      productService: service {
        isEnabled: product
      }
      member: user {
        isEnabled: index
      }
      design {
        isEnabled: index
      }
      fileManager: file {
        isEnabled: index
      }
      setting: store {
        isEnabled: index
        ableToEditNotificationSetting
      }
    }
  }
`;
