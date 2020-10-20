// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';

import useExportFileService from './useExportFileService';

// graphql typescript
import { getExportFormat } from './__generated__/getExportFormat';
import {
  requestExportFile as requestExportFileType,
  requestExportFileVariables as requestExportFileVariablesType,
} from './__generated__/requestExportFile';

// definition
const query = gql`
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

    selectedOrders @client {
      edges {
        node {
          id
        }
      }
    }
  }
`;

export default (): {
  loading: boolean;
  options: {
    [key: string]: ({ id: string | null; name: string | null } | null)[];
  };
  exportStatus: string;
  requestExportFile: (input: requestExportFileVariablesType) => void;
} => {
  const { data, loading } = useQuery<getExportFormat>(query);
  const { exportStatus, getExportFileService } = useExportFileService();

  const [requestExportFile] = useMutation<requestExportFileType>(
    gql`
      mutation requestExportFile($input: RequestExportFileInput!) {
        requestExportFile(input: $input)
      }
    `,
    {
      onCompleted: requestExportFileResponse => {
        if (requestExportFileResponse.requestExportFile)
          getExportFileService(requestExportFileResponse.requestExportFile);
      },
    },
  );

  return {
    loading,
    options: {
      exportFormatId: [
        ...(data?.orderDefaultExportFormats || []),
        ...(data?.getExportFormatList?.data?.filter(Boolean) || []),
      ],
      fileType: [
        {
          id: 'csv',
          name: 'CSV',
        },
        {
          id: 'xlsx',
          name: 'Excel (XLSX)',
        },
      ],
    },
    exportStatus,
    requestExportFile: useCallback(
      (input: requestExportFileVariablesType) => {
        requestExportFile({
          variables: {
            input: {
              ...input.input,
              ids: !data?.selectedOrders
                ? []
                : data.selectedOrders.edges.map(
                    ({ node: { id } }) => id || 'null-id',
                  ),
            },
          },
        });
      },
      [data, requestExportFile],
    ),
  };
};
