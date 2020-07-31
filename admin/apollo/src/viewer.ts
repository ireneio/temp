// import
import gql from 'graphql-tag';

// graphql typescript
import { viewerUserFragment as viewerUserFragmentType } from './__generated__/viewerUserFragment';
import { viewerAuthorityListFragment as viewerAuthorityListFragmentType } from './__generated__/viewerAuthorityListFragment';

// definition
export const viewerUserFragment = gql`
  fragment viewerUserFragment on User {
    id
    groupId
    store {
      id
    }
  }
`;

export const viewerAuthorityListFragment = gql`
  fragment viewerAuthorityListFragment on AuthorityList {
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
  Query: {
    viewer: ({
      viewer,
      getAuthorityList,
    }: {
      viewer: viewerUserFragmentType;
      getAuthorityList: viewerAuthorityListFragmentType;
    }) => ({
      ...viewer,
      permission:
        getAuthorityList?.data?.find(list => list?.id === viewer.groupId)
          ?.permission || null,
    }),
  },
};
