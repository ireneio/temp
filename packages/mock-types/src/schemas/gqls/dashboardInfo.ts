// import
import gql from 'graphql-tag';

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
    costMonthly
  }
`;
