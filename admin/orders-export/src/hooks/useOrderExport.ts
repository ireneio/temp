// import
import { useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import useExportFileService from './useExportFileService';

// graphql typescript
import {
  getExportFormat as getExportFormatType,
  requestExportFile as requestExportFileType,
  requestExportFileVariables as requestExportFileVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getExportFormat, requestExportFile } from '../gqls/useOrderExport';

// definition
export default (
  selectedIds: string[],
): {
  loading: boolean;
  options: {
    [key: string]: ({ id: string | null; name: string | null } | null)[];
  };
  exportStatus: string;
  requestExportFile: (input: requestExportFileVariablesType) => void;
} => {
  const { data, loading } = useQuery<getExportFormatType>(getExportFormat);
  const { exportStatus, getExportFileService } = useExportFileService();

  const [mutation] = useMutation<requestExportFileType>(requestExportFile, {
    onCompleted: requestExportFileResponse => {
      if (requestExportFileResponse.requestExportFile)
        getExportFileService(requestExportFileResponse.requestExportFile);
    },
  });

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
        mutation({
          variables: {
            input: {
              ...input.input,
              ids: selectedIds,
            },
          },
        });
      },
      [mutation, selectedIds],
    ),
  };
};
