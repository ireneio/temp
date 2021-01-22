// import
import gql from 'graphql-tag';

// graphql import
import { tutorialSettingObjectTypeFragment } from './tutorial';

// definition
export const getDashboard = gql`
  query getDashboard($info: DashboardInfoInput) {
    getDashboardInfo(getDashboardInfo: $info) {
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
        setting {
          ...tutorialSettingObjectTypeFragment
        }
      }
    }
  }

  ${tutorialSettingObjectTypeFragment}
`;

export const getTimezone = gql`
  query getTimezone {
    viewer {
      id
      store {
        id
        timezone
      }
    }
  }
`;
