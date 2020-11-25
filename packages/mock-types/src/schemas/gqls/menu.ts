// import
import gql from 'graphql-tag';

// definition
export const menuMenuPageObjectTypeMockFragment = gql`
  fragment menuMenuPageObjectTypeMockFragment on MenuPageObjectType {
    action
    newWindow
    imagePosition
  }
`;

export const menuMenuMockFragment = gql`
  fragment menuMenuMockFragment on Menu {
    pages {
      ...menuMenuPageObjectTypeMockFragment
      pages {
        ...menuMenuPageObjectTypeMockFragment
        pages {
          ...menuMenuPageObjectTypeMockFragment
        }
      }
    }
  }

  ${menuMenuPageObjectTypeMockFragment}
`;
