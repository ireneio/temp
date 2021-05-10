// import
import gql from 'graphql-tag';

// graphql import
import { facebookFragment } from './facebook';
import { ecfitFragment } from './ecfit';
import { goodDealFragment } from './goodDeal';
import { gaViewIdFragment } from './gaViewId';

// definition
export const useBlocksFragment = gql`
  fragment useBlocksFragment on Store {
    experiment {
      ecfitEnabled
      isGoodDealEnabled
    }

    facebookSetting {
      ...facebookFragment
      isLoginEnabled
    }

    storeEcfitSettings {
      ...ecfitFragment
      isEnabled
    }

    setting {
      storeGoodDealSettings: gooddeal {
        ...goodDealFragment
        status
      }
    }

    ...gaViewIdFragment
  }

  ${facebookFragment}
  ${ecfitFragment}
  ${goodDealFragment}
  ${gaViewIdFragment}
`;
