// import
import gql from 'graphql-tag';

// graphql typescript
import { storeAppListFragment as storeAppListFragmentType } from './__generated__/storeAppListFragment';

// definition
export const storeAppListFragment = gql`
  fragment storeAppListFragment on StoreAppList {
    data {
      plugin
      isInstalled
    }
  }
`;

export const resolvers = {
  StoreAppList: {
    isPluginInstalled: (
      { data }: storeAppListFragmentType,
      {
        pluginName,
      }: {
        pluginName: string;
      },
    ) =>
      (data || []) /** TODO: should not be null */
        .some(storeApp => {
          const { isInstalled = false, plugin = '' } = storeApp || {}; // TODO: should not be null

          return plugin === pluginName && isInstalled;
        }),
  },
};
