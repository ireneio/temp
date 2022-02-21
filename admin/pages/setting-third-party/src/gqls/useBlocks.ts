// import
import { gql } from '@apollo/client';

// graphql import
import { facebookFragment } from './facebook';
import { ecfitFragment } from './ecfit';
import { gaViewIdFragment } from './gaViewId';
import { lineLineLoginSettingFragment } from './line';

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

    lineLoginSetting {
      ...lineLineLoginSettingFragment
      isLoginEnabled
    }

    ...gaViewIdFragment
  }

  ${facebookFragment}
  ${ecfitFragment}
  ${gaViewIdFragment}
  ${lineLineLoginSettingFragment}
`;
