// import
import { gql } from 'apollo-boost';
import idx from 'idx';

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

export const resolver = {
  ColorList: {
    colors: ({ data }: colorListFragmentType) => {
      const { selected = null, themes = null } = idx(data, _ => _[0]) || {}; // TODO: should not be null

      return (
        (themes || [])[parseInt(selected || '0', 10)] || {
          colors: [],
        }
      ).colors; // TODO: should not be null
    },
  },
};
