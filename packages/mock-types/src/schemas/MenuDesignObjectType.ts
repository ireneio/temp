// import
import mock from '../mock';

// graphql typescript
import { menuDesignObjectTypeMockFragment } from './gqls/__generated__/menuDesignObjectTypeMockFragment';

// definition
export default mock.add<menuDesignObjectTypeMockFragment>(
  'MenuDesignObjectType',
  [
    () => ({
      __typename: 'MenuDesignObjectType',
      fontSize: 14,
      iconSize: 24,
      showSearchbar: false,
      alignment: 'left',
      expandSubItem: false,
      showLogo: true,
    }),
    () => ({
      __typename: 'MenuDesignObjectType',
      fontSize: 14,
      iconSize: 24,
      showSearchbar: true,
      alignment: 'center',
      expandSubItem: true,
      showLogo: false,
    }),
    () => ({
      __typename: 'MenuDesignObjectType',
      fontSize: 14,
      iconSize: 24,
      showSearchbar: false,
      alignment: 'right',
      expandSubItem: true,
      showLogo: false,
    }),
    () => ({
      __typename: 'MenuDesignObjectType',
      fontSize: 14,
      iconSize: 24,
      showSearchbar: true,
      alignment: 'separate',
      expandSubItem: false,
      showLogo: false,
    }),
  ],
);
