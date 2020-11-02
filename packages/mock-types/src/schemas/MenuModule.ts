// import
import mock from '../mock';

// graphql typescript
import { menuModuleMockFragment } from './gqls/__generated__/menuModuleMockFragment';

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
