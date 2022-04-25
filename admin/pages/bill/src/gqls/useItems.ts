// import
import { gql } from '@apollo/client';

// definition
export const useItemsStoreBillFragment = gql`
  fragment useItemsStoreBillFragment on StoreBill {
    id
    planItem {
      name {
        zh_TW
        en_US
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
`;
