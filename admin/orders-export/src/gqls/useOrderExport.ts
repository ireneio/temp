// import
import gql from 'graphql-tag';

// definition
export const getExportFormat = gql`
  query getExportFormat {
    getExportFormatList(
      search: {
        filter: {
          or: [
            { type: "exact", field: "type", query: "order_custom" }
            { type: "exact", field: "type", query: "order_system_default" }
          ]
        }
      }
    ) {
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

export const requestExportFile = gql`
  mutation requestExportFile($input: RequestExportFileInput!) {
    requestExportFile(input: $input)
  }
`;
