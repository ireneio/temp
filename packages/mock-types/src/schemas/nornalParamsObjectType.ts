// import
import mock from '../mock';

// graphql typescript
import { nornalParamsObjectTypeMockFragment } from './gqls/__generated__/nornalParamsObjectTypeMockFragment';

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
