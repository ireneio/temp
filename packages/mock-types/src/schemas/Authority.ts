// import
import mock from '../mock';

// graphql typescript
import { authorityMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<authorityMockFragment>('Authority', [
  () => ({
    __typename: 'Authority',
    id: 'helper-permission',
  }),
]);
