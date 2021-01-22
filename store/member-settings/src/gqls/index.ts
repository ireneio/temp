// import
import gql from 'graphql-tag';

// definition
export const getUserInfo = gql`
  query getUserInfo {
    viewer {
      id
      group {
        startDate
        expireDate
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
      tel @client
      mobile @client
      additionalInfo {
        # for client
        tel
        mobile
      }
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
        experiment {
          gmoRememberCardEnabled
        }
      }
      hasGmoCreditCard
    }
  }
`;
