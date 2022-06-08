// import
import { gql } from '@apollo/client';

// graphql import
import { localeFragment } from '@meepshop/utils/lib/gqls/locale';

// definition
export const useItemsStoreBillFragment = gql`
  fragment useItemsStoreBillFragment on StoreBill {
    id
    planItem {
      name {
        ...localeFragment
      }
      month
      fee
      feeType
      id
    }
    dataItem {
      dailyUsageFileUrl
      usedAmount
      freeAmount
      overAmount
      feeRatePerOverAmount
      month
      fee
    }
    orderItem {
      listFileUrl
      count
      sum
      month
      feeRate
      fee
    }
    extensionItem {
      month
      fee
    }
    affiliateItem {
      billingStartDate
      billingEndDate
      month
      fee
    }
    edmItem {
      count
      feeRatePerCount
      month
      fee
    }
    pointReminderItem {
      count
      feeRatePerCount
      month
      fee
    }
    customItem {
      name
      description
      month
      fee
    }
  }

  ${localeFragment}
`;
