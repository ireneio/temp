// import
import mock from '../mock';

// graphql typescript
import { unavailableModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<unavailableModuleMockFragment>('UnavailableModule', [
  () => ({
    __typename: 'UnavailableModule',
  }),
]);
