// import
import { gql } from 'apollo-boost';
import idx from 'idx';

// graphql typescript
import { colorsFragment as colorsFragmentType } from './__generated__/colorsFragment';

// definition
export const colorsFragment = gql`
  fragment colorsFragment on ColorList {
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
  Query: {},
  ColorList: {
    colors: ({ data }: colorsFragmentType) => {
      const { selected = null, themes = null } = idx(data, _ => _[0]) || {}; // TODO: should not be null

      return (
        (themes || [])[parseInt(selected || '0', 10)] || {
          colors: [],
        }
      ).colors; // TODO: should not be null
    },
  },
};
