// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { userObjectTypeMock } from './__generated__/userObjectTypeMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment userObjectTypeMock on userObjectType {
    name
    email
    mobile
  }
`;

export default mock.add<userObjectTypeMock>('userObjectType', [
  () => ({
    __typename: 'userObjectType',
    name: 'name',
    email: 'test@meepshop.com',
    mobile: '091234567',
  }),
]);
