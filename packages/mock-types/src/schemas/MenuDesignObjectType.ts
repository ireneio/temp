// import
import mock from '../mock';

// graphql typescript
import { menuDesignObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<menuDesignObjectTypeMockFragment>(
  'MenuDesignObjectType',
  [
    () => ({
      __typename: 'MenuDesignObjectType',
      iconSize: 24,
      fontSize: 14,
      showSearchbar: false,
      alignment: 'left',
      expandSubItem: false,
      showLogo: true,
      opacity: 1,
      pattern: 0,
      active: {
        __typename: 'activeParamsObjectType',
      },
      hover: {
        __typename: 'hoverParamsObjectType',
      },
      nornal: {
        __typename: 'nornalParamsObjectType',
      },
    }),
    () => ({
      __typename: 'MenuDesignObjectType',
      iconSize: 24,
      fontSize: 14,
      showSearchbar: true,
      alignment: 'center',
      expandSubItem: true,
      showLogo: false,
      opacity: 1,
      pattern: 1,
      active: {
        __typename: 'activeParamsObjectType',
      },
      hover: {
        __typename: 'hoverParamsObjectType',
      },
      nornal: {
        __typename: 'nornalParamsObjectType',
      },
    }),
    () => ({
      __typename: 'MenuDesignObjectType',
      iconSize: 24,
      fontSize: 14,
      showSearchbar: false,
      alignment: 'right',
      expandSubItem: true,
      showLogo: false,
      opacity: 1,
      pattern: 2,
      active: {
        __typename: 'activeParamsObjectType',
      },
      hover: {
        __typename: 'hoverParamsObjectType',
      },
      nornal: {
        __typename: 'nornalParamsObjectType',
      },
    }),
    () => ({
      __typename: 'MenuDesignObjectType',
      iconSize: 24,
      fontSize: 14,
      showSearchbar: true,
      alignment: 'separate',
      expandSubItem: false,
      showLogo: false,
      opacity: 1,
      pattern: 3,
      active: {
        __typename: 'activeParamsObjectType',
      },
      hover: {
        __typename: 'hoverParamsObjectType',
      },
      nornal: {
        __typename: 'nornalParamsObjectType',
      },
    }),
    () => ({
      __typename: 'MenuDesignObjectType',
      iconSize: 24,
      fontSize: 14,
      showSearchbar: true,
      alignment: 'separate',
      expandSubItem: false,
      showLogo: false,
      opacity: 1,
      pattern: 3,
      active: null,
      hover: null,
      nornal: null,
    }),
  ],
);
