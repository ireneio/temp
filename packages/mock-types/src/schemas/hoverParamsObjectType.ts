// import
import mock from '../mock';

// graphql typescript
import { hoverParamsObjectTypeMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<hoverParamsObjectTypeMockFragment>(
  'hoverParamsObjectType',
  [
    () => ({
      __typename: 'hoverParamsObjectType',
      color: 'blue',
      background: 'yellow',
      borderColor: 'red',
    }),
  ],
);
