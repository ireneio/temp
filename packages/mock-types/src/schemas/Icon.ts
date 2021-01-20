// import
import mock from '../mock';

// graphql typescript
import {
  DefaultIconEnum,
  iconMockFragment,
} from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<iconMockFragment>('Icon', [
  () => ({
    __typename: 'Image',
  }),
  () => ({
    __typename: 'DefaultIcon',
    icon: 'ADD_SHOPPING_CART' as DefaultIconEnum,
  }),
]);
