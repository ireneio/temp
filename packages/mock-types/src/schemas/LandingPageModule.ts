// import
import mock from '../mock';

// graphql typescript
import { landingPageModuleMockFragment } from './gqls/__generated__/landingPageModuleMockFragment';

// definition
export default mock.add<landingPageModuleMockFragment>('LandingPageModule', [
  () =>
    ({
      __typename: 'LandingPageModule',
      width: 100,
    } as landingPageModuleMockFragment),
  () =>
    ({
      __typename: 'LandingPageModule',
      width: 50,
    } as landingPageModuleMockFragment),
]);
