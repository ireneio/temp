// import
import gql from 'graphql-tag';

// graphql import
import { goodDealFragment } from './goodDeal';

// definition
export const updateGoodDealSettings = gql`
  mutation updateGoodDealSettings($updateStoreList: [UpdateStore]) {
    updateStoreList(updateStoreList: $updateStoreList) {
      id
      setting {
        storeGoodDealSettings: gooddeal {
          ...goodDealFragment
          status
        }
      }
    }
  }

  ${goodDealFragment}
`;
