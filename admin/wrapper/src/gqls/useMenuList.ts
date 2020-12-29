// import
import gql from 'graphql-tag';

// definition
export const useMenuListFragment = gql`
  fragment useMenuListFragment on permissionObj {
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
`;
