// import
import React, { useState, useCallback } from 'react';
import { Select } from 'antd';
import moment from 'moment';

import { useRouter } from '@meepshop/link';
import { useTranslation } from '@meepshop/locales';
import OrdersExport from '@admin/orders-export';

// definition
const { Option } = Select;

export default React.memo(
  ({ pageId, selectedIds }: { pageId: string; selectedIds: string[] }) => {
    const { t } = useTranslation('orders');
    const { push } = useRouter();
    const [showExport, setShowExport] = useState(false);
    const changeOperating = useCallback(
      (type: 'export' | 'print') => {
        if (type === 'print') {
          // TODO: remove after orderlist move to next-admin
          localStorage.setItem('selectedOrders', JSON.stringify(selectedIds));
          localStorage.setItem('selectedOrders-timeout', moment().format());
          push(`/orders/print?ref=${pageId}`);
          return;
        }

        setShowExport(true);
      },
      [pageId, push, selectedIds],
    );

    return (
      <>
        <Select
          value={t('more-operating.title')}
          onChange={changeOperating}
          size="large"
        >
          {['export', 'print'].map(status => (
            <Option key={status} value={status}>
              {t(`more-operating.${status}`)}
            </Option>
          ))}
        </Select>

        <OrdersExport
          visible={showExport}
          onClose={() => setShowExport(false)}
          selectedIds={selectedIds}
        />
      </>
    );
  },
);
