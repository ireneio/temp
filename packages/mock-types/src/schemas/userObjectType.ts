// import
import mock from '../mock';

// graphql typescript
import { userObjectTypeMockFragment } from './gqls/__generated__/userObjectTypeMockFragment';

// definition
export default mock.add<userObjectTypeMockFragment>('userObjectType', [
  () => ({
    __typename: 'userObjectType',
    name: 'name',
    email: 'test@meepshop.com',
    mobile: '091234567',
  }),
]);
