// import
import gql from 'graphql-tag';

// graphql import
import { backToTopFragment } from './backToTop';
import { goToButtonFragment } from './goToButton';

// definition
export const getActionButtonSetting = gql`
  query getActionButtonSetting {
    viewer {
      id
      store {
        id
        ...backToTopFragment
      }
    }
  }

  ${backToTopFragment}
`;

export const getHomePageActionButtonSetting = gql`
  query getHomePageActionButtonSetting {
    viewer {
      id
      store {
        id
        ...backToTopFragment
        page: defaultHomePage {
          id
          ...goToButtonFragment
        }
      }
    }
  }

  ${backToTopFragment}
  ${goToButtonFragment}
`;

export const getCustomPageActionButtonSetting = gql`
  query getCustomPageActionButtonSetting($path: String!) {
    viewer {
      id
      store {
        id
        ...backToTopFragment
        page: customPage(path: $path) {
          id
          ...goToButtonFragment
        }
      }
    }
  }

  ${backToTopFragment}
  ${goToButtonFragment}
`;
