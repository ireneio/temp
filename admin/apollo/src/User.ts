// import
import gql from 'graphql-tag';

// graphql typescript
import { userUserFragment as userUserFragmentType } from './__generated__/userUserFragment';
import { userAuthorityListFragment as userAuthorityListFragmentType } from './__generated__/userAuthorityListFragment';

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

export const resolvers = {
  User: {
    permission: ({
      groupId,
      getAuthorityList,
    }: userUserFragmentType & {
      getAuthorityList?: userAuthorityListFragmentType;
    }) =>
      getAuthorityList?.data?.find(list => list?.id === groupId)?.permission ||
      null,
  },
  Query: {
    viewer: ({
      viewer,
      getAuthorityList,
    }: {
      viewer?: userUserFragmentType;
      getAuthorityList: userAuthorityListFragmentType;
    }) =>
      !viewer
        ? null
        : {
            ...viewer,
            getAuthorityList,
          },
  },
};
