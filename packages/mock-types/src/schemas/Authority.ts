// import
import mock from '../mock';

// graphql typescript
import { authorityMockFragment } from './gqls/__generated__/authorityMockFragment';

// definition
export default mock.add<authorityMockFragment>('Authority', [
  () => ({
    __typename: 'Authority',
    id: 'helper-permission',
  }),
]);
