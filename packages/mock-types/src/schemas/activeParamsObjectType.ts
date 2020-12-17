// import
import mock from '../mock';

// graphql typescript
import { activeParamsObjectTypeMockFragment } from './gqls/__generated__/activeParamsObjectTypeMockFragment';

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
