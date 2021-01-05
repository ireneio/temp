// import
import mock from '../mock';

// graphql typescript
import { unavailableModuleMockFragment } from './gqls/__generated__/unavailableModuleMockFragment';

// definition
export default mock.add<unavailableModuleMockFragment>('UnavailableModule', [
  () => ({
    __typename: 'UnavailableModule',
  }),
]);
