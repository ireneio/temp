// import
import { gql } from '@apollo/client';

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
