// import
import gql from 'graphql-tag';

// graphql import
import { modalFragmet } from './modal';

// definition
export const getRedirects = gql`
  query getRedirects {
    viewer {
      id
      store {
        id
        ...modalFragmet
      }
    }
  }

  ${modalFragmet}
`;
