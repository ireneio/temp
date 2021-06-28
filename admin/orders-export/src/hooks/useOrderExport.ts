// import
import { useMemo, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import useExportFileService from './useExportFileService';

// graphql typescript
import {
  getExportFormat as getExportFormatType,
  requestExportFile as requestExportFileType,
  requestExportFileVariables,
  FileTypeEnum,
  ExportDataEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import { getExportFormat, requestExportFile } from '../gqls/useOrderExport';

// typescript definition
interface ValuesType {
  exportFormatId: string;
  fileType: FileTypeEnum;
  fileName: string;
}

// definition
export default (
  selectedIds: string[],
): {
  loading: boolean;
  options: {
    [key: string]: ({ id: string | null; name: string | null } | null)[];
  };
  exportStatus: string;
  requestExportFile: (value: ValuesType) => void;
} => {
  const { data, loading } = useQuery<getExportFormatType>(getExportFormat);
  const { exportStatus, getExportFileService } = useExportFileService();
  const [mutation] = useMutation<
    requestExportFileType,
    requestExportFileVariables
  >(requestExportFile, {
    onCompleted: getExportFileService,
  });

  return {
    loading,
    options: useMemo(
      () => ({
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
      }),
      [data],
    ),
    exportStatus,
    requestExportFile: useCallback(
      input => {
        mutation({
          variables: {
            input: {
              ...input,
              ids: selectedIds,
              dataType: 'ORDER' as ExportDataEnum,
            },
          },
        });
      },
      [mutation, selectedIds],
    ),
  };
};
