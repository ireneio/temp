// import
import mock from '../mock';

// graphql typescript
import { iconMockFragment } from './gqls/__generated__/iconMockFragment';

// definition
export default mock.add<iconMockFragment>('Icon', [
  () =>
    ({
      __typename: 'Image',
    } as iconMockFragment),
  () =>
    ({
      __typename: 'DefaultIcon',
      icon: 'ADD_SHOPPING_CART',
    } as iconMockFragment),
]);
