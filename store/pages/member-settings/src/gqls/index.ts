// import
import { gql } from '@apollo/client';

// definition
export const getUserInfo = gql`
  query getUserInfo {
    viewer {
      id
      group {
        startAt
        expireAt
        unlimitedDate
      }
      memberGroup {
        id
        type
        name
      }
      name
      email
      gender
      tel
      mobile
      address {
        country {
          id
        }
        city {
          id
        }
        area {
          id
        }
        street
        zipCode
      }
      birthday {
        year
        month
        day
      }
      notification {
        newsletters {
          cancelEmail
        }
        rewardPointReminderSubscription {
          cancelEmail
        }
      }
      store {
        id
        shippableCountries {
          id
        }
        setting {
          lockedBirthday
          rewardPointReminder {
            isEnabled
          }
        }
      }
      hasGmoCreditCard
    }
  }
`;
