// import
import gql from 'graphql-tag';

// graphql typescript
import { viewerUserFragment as viewerUserFragmentType } from './__generated__/viewerUserFragment';
import { viewerStoreAppListFragment as viewerStoreAppListFragmentType } from './__generated__/viewerStoreAppListFragment';
import { viewerAppListFragment as viewerAppListFragmentType } from './__generated__/viewerAppListFragment';
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

export const viewerStoreAppListFragment = gql`
  fragment viewerStoreAppListFragment on StoreAppList {
    data {
      id
      appId
      plugin
      isInstalled
    }
  }
`;

export const viewerAppListFragment = gql`
  fragment viewerAppListFragment on AppList {
    data {
      id
      plugin
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
        }
        file {
          index
        }
      }
    }
  }
`;

export const resolver = {
  Query: {
    viewer: ({
      viewer,
      getStoreAppList,
      getAppList,
      getAuthorityList,
    }: {
      viewer: viewerUserFragmentType;
      getStoreAppList: viewerStoreAppListFragmentType;
      getAppList: viewerAppListFragmentType;
      getAuthorityList: viewerAuthorityListFragmentType;
    }) => {
      return {
        ...viewer,
        permission:
          getAuthorityList?.data?.find(list => list?.id === viewer.groupId)
            ?.permission || null,
        store: !viewer?.store
          ? null
          : {
              ...viewer.store,
              apps:
                getAppList?.data?.reduce(
                  (
                    list: {
                      [plugin: string]: boolean | string;
                    },
                    app,
                  ) => {
                    if (!app) return list;

                    const { id: appId, plugin } = app;

                    if (!plugin || !appId) return list;

                    const { id, isInstalled } =
                      getStoreAppList?.data?.find(
                        storeApp => storeApp?.plugin === plugin,
                      ) || {};

                    return {
                      ...list,
                      [plugin]: {
                        __typename: 'Extension',
                        id: appId,
                        storeAppId: id || null,
                        isInstalled: Boolean(id),
                        isEnabled: Boolean(isInstalled),
                      },
                    };
                  },
                  { __typename: 'Apps' },
                ) || null,
            },
      };
    },
  },
};
