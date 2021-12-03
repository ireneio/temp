// import
import { gql } from '@apollo/client';

// definition
export const viewTrackingModuleMockFragment = gql`
  fragment viewTrackingModuleMockFragment on ViewTrackingModule {
    tracking {
      name
      category
    }
  }
`;
