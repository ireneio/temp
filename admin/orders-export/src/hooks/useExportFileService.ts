// import
import { useCallback, useMemo } from 'react';
import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';
import { Modal } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';

// graphql typescript
import { exportFileService as exportFileServiceType } from './__generated__/exportFileService';

// definition
const query = gql`
  query exportFileService($queryId: ID!) {
    exportFileService(queryId: $queryId) {
      status
      uri
    }
  }
`;

export default (): {
  exportStatus: string;
  getExportFileService: (queryId: string) => void;
} => {
  const { t } = useTranslation('orders-export');

  const [getExportFileService, { data, refetch }] = useLazyQuery<
    exportFileServiceType
  >(query, {
    fetchPolicy: 'no-cache',
  });

  return {
    exportStatus: useMemo(() => {
      const status = data?.exportFileService?.status;
      const uri = data?.exportFileService?.uri;

      switch (status) {
        case 'PROCESSING':
          setTimeout(() => refetch(), 1000);
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
      (queryId: string) => {
        getExportFileService({ variables: { queryId } });
      },
      [getExportFileService],
    ),
  };
};
