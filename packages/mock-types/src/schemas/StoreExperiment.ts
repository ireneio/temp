// import
import mock from '../mock';

// graphql typescript
import { storeExperimentMockFragment } from './gqls/__generated__/storeExperimentMockFragment';

// definition
export default mock.add<storeExperimentMockFragment>('StoreExperiment', [
  () => ({
    __typename: 'StoreExperiment',
    ecfitEnabled: true,
    hiddingMeepshopMaxInFooterEnabled: true,
    isGoodDealEnabled: true,
  }),
  () => ({
    __typename: 'StoreExperiment',
    ecfitEnabled: false,
    hiddingMeepshopMaxInFooterEnabled: false,
    isGoodDealEnabled: false,
  }),
]);
