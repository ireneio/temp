// import
import mock from '../mock';

// graphql typescript
import { dashboardInfoMockFragment } from '@meepshop/types/gqls/meepshop';

// definition
export default mock.add<dashboardInfoMockFragment>('DashboardInfo', [
  () => ({
    __typename: 'DashboardInfo',
    pendingOrder: 1,
    notShipped: 2,
    orderQA: 3,
    productQA: 4,
    userCount: 5,
    orderMonthly: 6,
    revenueMonthly: 7,
    numberOfReminderSentMonthly: 8,
  }),
]);
