// import
import React from 'react';
import { Select } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useChangeStatus from './hooks/useChangeStatus';

// typescript definition
interface PropsType {
  runningIds: string[];
  selectedIds: string[];
}

// definition
const { Option } = Select;

export default React.memo(({ runningIds, selectedIds }: PropsType) => {
  const { t } = useTranslation('orders');
  const changeStatus = useChangeStatus({ runningIds, selectedIds });

  return (
    <Select
      value={t('change-status.title')}
      onChange={changeStatus}
      size="large"
    >
      {['paymentStatusList', 'shipmentStatusList', 'orderStatusList'].map(
        status => (
          <Option key={status} value={status}>
            {t(`change-status.${status}`)}
          </Option>
        ),
      )}
    </Select>
  );
});
