// import
import mock from '../mock';

// graphql typescript
import { menuIconMockFragment } from './gqls/__generated__/menuIconMockFragment';

// definition
export default mock.add<menuIconMockFragment>('MenuIcon', [
  () =>
    ({
      __typename: 'Image',
    } as menuIconMockFragment),
  () =>
    ({
      __typename: 'DefaultIcon',
      icon: 'ADD_SHOPPING_CART',
    } as menuIconMockFragment),
]);
