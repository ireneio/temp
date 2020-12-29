// import
import gql from 'graphql-tag';

// definition
export const publicPlans = gql`
  query publicPlans {
    publicPlans {
      id
      name {
        zh_TW
        en_US
      }
      monthlyFee
      yearlyFee
      freeDataGB
      avlProductNum
      orderFeeRate
    }
  }
`;
