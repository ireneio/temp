// import
import { gql } from '@apollo/client';

// definition
export const assignDefaultProductTemplatePage = gql`
  mutation assignDefaultProductTemplatePage(
    $input: AssignDefaultProductTemplatePageInput!
  ) {
    assignDefaultProductTemplatePage(input: $input) {
      status
    }
  }
`;

export const useAssignDefaultProductTemplatePageReadCache = gql`
  query useAssignDefaultProductTemplatePageReadCache {
    viewer {
      id
      store {
        id
        defaultProductTemplatePage {
          id
        }
      }
    }
  }
`;

export const useAssignDefaultProductTemplatePageFragment = gql`
  fragment useAssignDefaultProductTemplatePageFragment on Store {
    id
    defaultProductTemplatePage {
      id
    }
  }
`;

export const useAssignDefaultProductTemplatePageUpdateNewPageFragment = gql`
  fragment useAssignDefaultProductTemplatePageUpdateNewPageFragment on Page {
    id
    isDefaultProductTemplatePage
  }
`;

export const useAssignDefaultProductTemplatePageUpdatePrevPageFragment = gql`
  fragment useAssignDefaultProductTemplatePageUpdatePrevPageFragment on Page {
    id
    isDefaultProductTemplatePage
  }
`;
