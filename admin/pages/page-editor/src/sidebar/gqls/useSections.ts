// import
import { gql } from '@apollo/client';

// definition
export const useSectionsFragment = gql`
  fragment useSectionsFragment on Store {
    isLandingPageModuleEnabled: checkUnleashToggle(
      name: "storeCnameIsolationlistForShowingLandingPageModule_Enabled"
    )
    page(input: $input) {
      id
      pageType
    }
  }
`;
