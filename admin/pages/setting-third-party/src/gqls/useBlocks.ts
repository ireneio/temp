// import
import { gql } from '@apollo/client';

// graphql import
import { facebookFragment } from './facebook';
import { ecfitFragment } from './ecfit';
import { gaViewIdFragment } from './gaViewId';

// definition
export const useBlocksFragment = gql`
  fragment useBlocksFragment on Store {
    ecfitEnabled: checkUnleashToggle(
      name: "T2235_storeCnameWhitelistForECFIT_Enabled"
    )

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
