// import
import mock from '../mock';

// graphql typescript
import { landingPageModuleMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<landingPageModuleMockFragment>('LandingPageModule', [
  () => ({
    __typename: 'LandingPageModule',
    width: 100,
  }),
  () => ({
    __typename: 'LandingPageModule',
    width: 50,
  }),
]);
