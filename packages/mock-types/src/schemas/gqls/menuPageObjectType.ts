// import
import gql from 'graphql-tag';

// definition
export const menuPageObjectTypeMockFragment = gql`
  fragment menuPageObjectTypeMockFragment on MenuPageObjectType {
    action
    title {
      zh_TW
    }
    imagePosition
    newWindow
  }
`;
