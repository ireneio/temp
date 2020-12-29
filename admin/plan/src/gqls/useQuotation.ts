// import
import gql from 'graphql-tag';

// definition
const storeBillFeeAmountFragment = gql`
  fragment storeBillFeeAmountFragment on StoreBillFeeAmount {
    usd
    twd
    local
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
