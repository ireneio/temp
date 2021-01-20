// import
import mock from '../mock';

// graphql typescript
import { nornalParamsObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<nornalParamsObjectTypeMockFragment>(
  'nornalParamsObjectType',
  [
    () => ({
      __typename: 'nornalParamsObjectType',
      color: 'red',
      background: 'blue',
      borderColor: 'yellow',
    }),
  ],
);
