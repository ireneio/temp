// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { MenuModuleMock } from './__generated__/MenuModuleMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment MenuModuleMock on MenuModule {
    menu {
      id
    }
  }
`;

export default mock.add<MenuModuleMock>('MenuModule', [
  () => ({
    __typename: 'MenuModule',
    menu: {
      __typename: 'Menu',
      id: 'menu-id',
    },
  }),
]);
