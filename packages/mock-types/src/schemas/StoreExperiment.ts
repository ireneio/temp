// import
import gql from 'graphql-tag';

import mock from '../mock';

// graphql typescript
import { StoreExperimentMock } from './__generated__/StoreExperimentMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment StoreExperimentMock on StoreExperiment {
    ecfitEnabled
    hiddingMeepshopMaxInFooterEnabled
    isGoodDealEnabled
  }
`;

export default mock.add<StoreExperimentMock>('StoreExperiment', [
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
