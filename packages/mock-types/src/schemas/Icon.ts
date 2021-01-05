// import
import mock from '../mock';

// graphql typescript
import { DefaultIconEnum } from '../../../../__generated__/meepshop';
import { iconMockFragment } from './gqls/__generated__/iconMockFragment';

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
