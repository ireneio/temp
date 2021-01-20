// import
import mock from '../mock';

// graphql typescript
import { menuModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<menuModuleMockFragment>('MenuModule', [
  () => ({
    __typename: 'MenuModule',
    menu: {
      __typename: 'Menu',
      id: 'menu-id',
    },
  }),
]);
