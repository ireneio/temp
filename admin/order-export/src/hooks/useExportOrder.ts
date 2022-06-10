// import
import { useCallback, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import { useTranslation } from '@meepshop/locales';

import message from '@admin/message';

// graphql typescript
import {
  exportOrder as exportOrderType,
  FileTypeEnum as FileTypeEnumType,
  ExportDataEnum as ExportDataEnumType,
  exportOrderVariables as exportOrderVariablesType,
  exportOderFileService as exportOderFileServiceType,
  exportOderFileServiceVariables as exportOderFileServiceVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { exportOrder, exportOderFileService } from '../gqls/useExportOrder';

// typescript definition
interface ValuesType {
  exportFormatId: ExportDataEnumType;
  fileName: string;
  fileType: FileTypeEnumType;
}

// definition
export default (ids: string[]): ((value: ValuesType) => void) => {
  const { t } = useTranslation('order-export');
  const [query, { data, startPolling, stopPolling }] = useLazyQuery<
    exportOderFileServiceType,
    exportOderFileServiceVariablesType
  >(exportOderFileService);
  const [mutation] = useMutation<exportOrderType, exportOrderVariablesType>(
    exportOrder,
    {
      onCompleted: responseData => {
        if (!responseData.requestExportFile) return;

        query({
          variables: {
            queryId: responseData.requestExportFile,
          },
        });
      },
    },
  );

  useEffect(() => {
    const status = data?.exportFileService.status;

    switch (status) {
      case 'PROCESSING': {
        if (startPolling) startPolling(1000);
        break;
      }
      case 'SUCCESS': {
        message.success(t('success'));

        const a = document.createElement('a');
        a.href = data?.exportFileService.uri || '';
        a.click();
        if (stopPolling) stopPolling();
        break;
      }

      case 'FAIL':
      case 'FILE_NOT_EXISTED':
        message.error(`exportFileService：${status}`);

        if (stopPolling) stopPolling();
        break;
      default:
        break;
    }

    return () => stopPolling?.();
  }, [data, startPolling, stopPolling, t]);

  return useCallback(
    ({ exportFormatId, fileName, fileType }) => {
      mutation({
        variables: {
          input: {
            ids,
            fileName,
            fileType,
            exportFormatId:
              exportFormatId === 'ECPAY_ORDER' ||
              exportFormatId === 'TCAT_ORDER'
                ? null
                : exportFormatId,
            dataType:
              exportFormatId === 'ECPAY_ORDER' ||
              exportFormatId === 'TCAT_ORDER'
                ? exportFormatId
                : ('ORDER' as ExportDataEnumType),
          },
        },
      });
    },
    [ids, mutation],
  );
};
