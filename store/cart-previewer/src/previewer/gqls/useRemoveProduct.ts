// import
import gql from 'graphql-tag';

// graphql import
import { previewerFragment } from './index';

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
