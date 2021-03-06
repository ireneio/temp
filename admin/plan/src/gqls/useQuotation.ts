// import
import { gql } from '@apollo/client';

// definition
const storeBillFeeAmountFragment = gql`
  fragment storeBillFeeAmountFragment on Money {
    amount
    currency
  }
`;

const quotationContentFragment = gql`
  fragment quotationContentFragment on QuotationContent {
    billingStartAt
    billingEndAt
    total {
      ...storeBillFeeAmountFragment
    }
    discount {
      title
      desc
      amount {
        ...storeBillFeeAmountFragment
      }
    }
  }

  ${storeBillFeeAmountFragment}
`;

export const quotation = gql`
  query quotation($planId: String!) {
    quotation(planId: $planId) {
      fxRate {
        local
        twd
      }
      monthly {
        ...quotationContentFragment
      }
      yearly {
        ...quotationContentFragment
      }
    }
  }

  ${quotationContentFragment}
`;
