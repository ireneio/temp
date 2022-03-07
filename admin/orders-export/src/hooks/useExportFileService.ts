// import
import { useCallback, useMemo } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  requestExportFile as requestExportFileType,
  exportFileService as exportFileServiceType,
} from '@meepshop/types/gqls/admin';

// graphql import
import { exportFileService } from '../gqls/useExportFileService';

// definition
export default (): {
  exportStatus: string;
  getExportFileService: (data: requestExportFileType) => void;
} => {
  const { t } = useTranslation('orders-export');
  const [getExportFileService, { data, refetch }] = useLazyQuery<
    exportFileServiceType
  >(exportFileService, {
    fetchPolicy: 'no-cache',
  });

  return {
    exportStatus: useMemo(() => {
      const status = data?.exportFileService?.status;
      const uri = data?.exportFileService?.uri;

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

        case 'FAIL':
        case 'FILE_NOT_EXISTED':
          Modal.error({
            title: t('error.title'),
            content: t('error.content'),
          });
          break;

        default:
          break;
      }

      return status || '';
    }, [data, refetch, t]),
    getExportFileService: useCallback(
      ({ requestExportFile }) => {
        getExportFileService({ variables: { queryId: requestExportFile } });
      },
      [getExportFileService],
    ),
  };
};
