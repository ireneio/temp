// import
import gql from 'graphql-tag';

// graphql import
import { facebookFragment } from './facebook';
import { ecfitFragment } from './ecfit';
import { gaViewIdFragment } from './gaViewId';

// definition
export const useBlocksFragment = gql`
  fragment useBlocksFragment on Store {
    experiment {
      ecfitEnabled
    }

    facebookSetting {
      ...facebookFragment
      isLoginEnabled
    }

    storeEcfitSettings {
      ...ecfitFragment
      isEnabled
    }

    ...gaViewIdFragment
  }

  ${facebookFragment}
  ${ecfitFragment}
  ${gaViewIdFragment}
`;
