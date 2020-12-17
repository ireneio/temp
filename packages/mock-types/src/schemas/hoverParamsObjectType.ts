// import
import mock from '../mock';

// graphql typescript
import { hoverParamsObjectTypeMockFragment } from './gqls/__generated__/hoverParamsObjectTypeMockFragment';

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
