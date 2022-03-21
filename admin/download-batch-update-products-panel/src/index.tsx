// import
import React from 'react';
import { Drawer, Button } from 'antd';

import { useTranslation } from '@meepshop/locales';
import {
  downloadBatchUpdateProducts,
  downloadBatchUpdateProductsComplete,
} from '@meepshop/images';

import useProductsExport from './hooks/useProductsExport';
import styles from './styles/index.less';

// typescript definition
interface PropsType {
  onClose: () => void;
  goToUpload: () => void;
  selectedIds: string[];
}

// definition
export default React.memo(({ onClose, goToUpload, selectedIds }: PropsType) => {
  const { t } = useTranslation('download-batch-update-products-panel');
  const { loading, exportStatus, requestExportFile } = useProductsExport(
    selectedIds,
  );
  const isCompleted = exportStatus === 'SUCCESS';

  return (
    <Drawer
      className={styles.root}
      destroyOnClose
      visible
      width={688}
      onClose={onClose}
      title={<div className={styles.title}>{t('title')}</div>}
    >
      <div className={styles.content}>
        <img
          src={
            isCompleted
              ? downloadBatchUpdateProductsComplete
              : downloadBatchUpdateProducts
          }
          alt="download-batch-update-products"
        />

        <div>
          {isCompleted ? (
            t('complete')
          ) : (
            <>
              {t('chosen')}
              <span>{selectedIds.length}</span>
              {t('data')}
            </>
          )}
        </div>

        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={isCompleted ? goToUpload : requestExportFile}
        >
          {isCompleted ? t('upload') : t('download')}
        </Button>
      </div>
    </Drawer>
  );
});
