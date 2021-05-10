// import
import gql from 'graphql-tag';

// definition
export const userUserFragment = gql`
  fragment userUserFragment on User {
    id
    groupId
    store {
      id
    }
  }
`;

export const userAuthorityListFragment = gql`
  fragment userAuthorityListFragment on AuthorityList {
    data {
      id
      permission {
        order {
          index
          paymentStatus
          shipmentStatus
          status
          create
          export
        }
        product {
          index
          create
          update
          remove
          cost
          export
        }
        design {
          index
        }
        user {
          index
          create
          update
          export
          remove
        }
        service {
          index
          product
        }
        store {
          index
          payment
          shipment
          exportSetting
          ableToEditNotificationSetting
        }
        file {
          index
        }
      }
    }
  }
`;
