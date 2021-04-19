// import
import gql from 'graphql-tag';

// definition
export const requestSetGAViewId = gql`
  mutation requestSetGAViewId($gaViewId: String) {
    requestSetGAViewId(gaViewId: $gaViewId) {
      status
      queryId
    }
  }
`;

export const requestSetGAViewIdProcessorService = gql`
  query requestSetGAViewIdProcessorService($queryId: ID!) {
    smartConversionModuleProcessorService(queryId: $queryId) {
      status
      result
      gaViewId
    }
  }
`;

export const useSetGAViewIdFragment = gql`
  fragment useSetGAViewIdFragment on Store {
    id
    gaViewId
  }
`;
