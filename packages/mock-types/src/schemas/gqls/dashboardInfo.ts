// import
import { gql } from '@apollo/client';

// definition
export const dashboardInfoMockFragment = gql`
  fragment dashboardInfoMockFragment on DashboardInfo {
    pendingOrder
    notShipped
    orderQA
    productQA
    userCount
    orderMonthly
    revenueMonthly
    numberOfReminderSentMonthly
  }
`;
