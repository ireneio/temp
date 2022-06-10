// import
import { gql } from '@apollo/client';

// definition
export const getExportFormatList = gql`
  query getExportFormatList($search: searchInputObjectType) {
    getExportFormatList(search: $search) {
      data {
        id
        name
      }
    }

    orderDefaultExportFormats {
      id
      name
    }
  }
`;
