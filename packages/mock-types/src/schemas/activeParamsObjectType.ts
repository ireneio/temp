// import
import mock from '../mock';

// graphql typescript
import { activeParamsObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<activeParamsObjectTypeMockFragment>(
  'activeParamsObjectType',
  [
    () => ({
      __typename: 'activeParamsObjectType',
      color: 'yellow',
      background: 'red',
      borderColor: 'blue',
    }),
  ],
);
