// import
import gql from 'graphql-tag';

// graphql typescript
import { colorListFragment as colorListFragmentType } from './__generated__/colorListFragment';

// definition
export const colorListFragment = gql`
  fragment colorListFragment on ColorList {
    data {
      id
      selected
      themes {
        id
        colors
      }
    }

    colors @client
  }
`;

export const resolvers = {
  ColorList: {
    colors: ({ data }: colorListFragmentType) => {
      const { selected = null, themes = null } = data?.[0] || {}; // TODO: should not be null

      return themes?.[parseInt(selected || '0', 10)]?.colors || []; // TODO: should not be null
    },
  },
};
