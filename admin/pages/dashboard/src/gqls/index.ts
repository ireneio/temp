// import
import { gql } from '@apollo/client';

// graphql import
import { tutorialSettingObjectTypeFragment } from './tutorial';

// definition
export const getDashboard = gql`
  query getDashboard {
    getDashboardInfo(
      getDashboardInfo: {
        pendingOrder: true
        notShipped: true
        orderQA: true
        productQA: true
        userCount: true
        orderMonthly: true
        revenueMonthly: true
        costMonthly: true
        numberOfReminderSentMonthly: true
      }
    ) {
      pendingOrder
      notShipped
      orderQA
      productQA
      userCount
      orderMonthly
      revenueMonthly
      numberOfReminderSentMonthly
    }

    viewer {
      id
      role
      store {
        id
        description {
          name
        }
        unpaidBills {
          totalCount
        }
        bills(first: 1) {
          edges {
            node {
              id
              payment {
                status
              }
            }
          }
        }
        setting {
          ...tutorialSettingObjectTypeFragment
        }
      }
    }
  }

  ${tutorialSettingObjectTypeFragment}
`;
