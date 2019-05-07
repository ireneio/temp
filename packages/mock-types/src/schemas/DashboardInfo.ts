// import
import { gql } from 'apollo-boost';

import mock from '../mock';

// graphql typescript
import { DashboardInfoMock } from './__generated__/DashboardInfoMock';

// definition
// eslint-disable-next-line no-unused-expressions
gql`
  fragment DashboardInfoMock on DashboardInfo {
    pendingOrder
    notShipped
    orderQA
    productQA
    userCount
    orderMonthly
    revenueMonthly
    costMonthly
  }
`;

export default mock.add<DashboardInfoMock>('DashboardInfo', [
  () => ({
    __typename: 'DashboardInfo',
    pendingOrder: 1,
    notShipped: 2,
    orderQA: 3,
    productQA: 4,
    userCount: 5,
    orderMonthly: 6,
    revenueMonthly: 7,
    costMonthly: 8,
  }),
]);
