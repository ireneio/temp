// import
import gql from 'graphql-tag';

// definition
export const storeMockFragment = gql`
  fragment storeMockFragment on Store {
    adminStatus
    domain
    currency
    unpaidBills {
      totalCount
    }

    defaultHomePage {
      id
      pageType
      title {
        zh_TW
      }
    }

    defaultProductListPage {
      id
      pageType
      title {
        zh_TW
      }
    }
  }
`;
