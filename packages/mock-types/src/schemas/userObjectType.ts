// import
import mock from '../mock';

// graphql typescript
import { userObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<userObjectTypeMockFragment>('userObjectType', [
  () => ({
    __typename: 'userObjectType',
    name: 'name',
    email: 'test@meepshop.com',
    mobile: '091234567',
  }),
]);
