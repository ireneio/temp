// import
import { useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useExportFileService } from '@admin/hooks';

// graphql typescript
import {
  requestBatchUpdateProductsFile as requestBatchUpdateProductsFileType,
  requestBatchUpdateProductsFileVariables as requestBatchUpdateProductsFileVariablesType,
  ExportStatusEnum,
  ExportDataEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import { requestBatchUpdateProductsFile } from '../gqls/useProductsExport';

// typescript definition
interface ReturnType {
  loading: boolean;
  exportStatus?: ExportStatusEnum;
  requestExportFile: () => void;
}

// definition
export default (selectedIds: string[]): ReturnType => {
  const {
    loading: serviceLoading,
    exportStatus,
    getExportFileService,
  } = useExportFileService();
  const [mutation, { loading }] = useMutation<
    requestBatchUpdateProductsFileType,
    requestBatchUpdateProductsFileVariablesType
  >(requestBatchUpdateProductsFile, {
    onCompleted: getExportFileService,
  });

  return {
    loading: loading || serviceLoading,
    exportStatus,
    requestExportFile: useCallback(() => {
      mutation({
        variables: {
          input: {
            ids: selectedIds,
            dataType: 'BATCH_UPDATE_PRODUCTS' as ExportDataEnum,
          },
        },
      });
    }, [mutation, selectedIds]),
  };
};
