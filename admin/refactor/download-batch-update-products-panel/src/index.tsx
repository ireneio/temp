// typescript import
import { NextPage } from 'next';

// import
import React from 'react';

import { useCrossContextEvents } from '@admin/hooks';
import DownloadBatchUpdateProductsPanel from '@admin/download-batch-update-products-panel';

import './styles/index.less';

// typescript definition
interface PropsType {
  namespacesRequired: string[];
  noWrapper: true;
}

// definition
const RefactorDownloadBatchUpdateProductsPanel: NextPage<PropsType> = React.memo(
  () => {
    const [{ close, forward, selectedIds }, setProps] = useCrossContextEvents<{
      close?: boolean;
      forward?: boolean;
      selectedIds?: string[];
    }>('download-batch-update-products-panel', {});

    if (close || forward || !selectedIds) return null;

    return (
      <DownloadBatchUpdateProductsPanel
        onClose={() => {
          setProps({
            close: true,
          });
        }}
        goToUpload={() => {
          setProps({
            forward: true,
          });
        }}
        selectedIds={selectedIds}
      />
    );
  },
);

RefactorDownloadBatchUpdateProductsPanel.getInitialProps = async () => ({
  namespacesRequired: ['@meepshop/locales/namespacesRequired'],
  noWrapper: true,
});

export default RefactorDownloadBatchUpdateProductsPanel;
