// import
import gql from 'graphql-tag';

// definition
export const usePageSettingItemsStoreFragment = gql`
  fragment usePageSettingItemsStoreFragment on Store {
    id
    defaultHomePage {
      id
    }
    defaultProductTemplatePage {
      id
    }
  }
`;

export const usePageSettingItemsPageFragment = gql`
  fragment usePageSettingItemsPageFragment on Page {
    id
    pageType
    isDefaultHomePage @client
    isDefaultProductTemplatePage @client
  }
`;
