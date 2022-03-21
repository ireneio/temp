// import
import { useCallback, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import message from '@admin/message';

// graphql typescript
import {
  requestBatchUpdateProductsFile as requestBatchUpdateProductsFileType,
  exportBatchUpdateProductsFileService as exportBatchUpdateProductsFileServiceType,
  ExportStatusEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import { exportBatchUpdateProductsFileService } from './gqls/useExportFileService';

// definition
export default (): {
  loading: boolean;
  exportStatus?: ExportStatusEnum;
  getExportFileService: (data: requestBatchUpdateProductsFileType) => void;
} => {
  const [getExportFileService, { data, loading, refetch }] = useLazyQuery<
    exportBatchUpdateProductsFileServiceType
  >(exportBatchUpdateProductsFileService, {
    fetchPolicy: 'no-cache',
  });
  const status = data?.exportFileService?.status;
  const uri = data?.exportFileService?.uri;

  useEffect(() => {
    if (!status) return;

    switch (status) {
      case 'PROCESSING':
        setTimeout(() => {
          if (refetch) refetch();
        }, 1000);
        break;

      case 'SUCCESS': {
        const downloadLink = document.createElement('a');
        downloadLink.href = uri || '';
        downloadLink.click();
        break;
      }

      default:
        message.error(status);
        break;
    }
  }, [refetch, status, uri]);

  return {
    loading: loading || status === 'PROCESSING',
    exportStatus: status,
    getExportFileService: useCallback(
      ({ requestExportFile }) => {
        getExportFileService({ variables: { queryId: requestExportFile } });
      },
      [getExportFileService],
    ),
  };
};
