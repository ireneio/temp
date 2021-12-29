// import
import { gql } from '@apollo/client';

// graphql import
import { previewerFragment } from './useMapCartItem';

// definition
export const removeProductInPreviewer = gql`
  mutation removeProductInPreviewer($search: [ChangeCart]) {
    changeCartList(changeCartList: $search) {
      id
      ...previewerFragment
    }
  }

  ${previewerFragment}
`;
