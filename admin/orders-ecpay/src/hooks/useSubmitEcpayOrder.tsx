// import
import { useCallback, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Modal, notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import {
  submitOrderToEcpayLogisticsService as submitOrderToEcpayLogisticsServiceType,
  submitOrderToEcpayLogisticsServiceVariables as submitOrderToEcpayLogisticsServiceVariablesType,
  useSubmitEcpayOrderOrderFragment as useSubmitEcpayOrderOrderFragmentType,
  OrderLogisticTrackingStatusEnum,
} from '@meepshop/types/gqls/admin';

// graphql import
import {
  submitOrderToEcpayLogisticsService,
  useSubmitEcpayOrderOrderFragment,
} from '../gqls/useSubmitEcpayOrder';

// definition
export default (): {
  runningIds: string[];
  submitEcpayOrder: (selectedIds: string[]) => Promise<void>;
} => {
  const [runningIds, setRunningIds] = useState<string[]>([]);
  const [submitOrder] = useMutation<
    submitOrderToEcpayLogisticsServiceType,
    submitOrderToEcpayLogisticsServiceVariablesType
  >(submitOrderToEcpayLogisticsService);
  const { t } = useTranslation('orders-ecpay');

  const submitEcpayOrder = useCallback(
    async (selectedIds: string[]) => {
      setRunningIds(selectedIds);

      await submitOrder({
        variables: {
          input: { orderIds: selectedIds },
        },
        update: (cache, result) => {
          if (
            result.data?.submitOrderToEcpayLogisticsService.__typename ===
            'OkResponse'
          ) {
            selectedIds.forEach(id => {
              cache.writeFragment<useSubmitEcpayOrderOrderFragmentType>({
                id,
                fragment: useSubmitEcpayOrderOrderFragment,
                data: {
                  __typename: 'Order',
                  id,
                  latestLogisticTracking: {
                    __typename: 'OrderLogisticTracking',
                    status: 'PLACING' as OrderLogisticTrackingStatusEnum,
                  },
                },
              });
            });

            notification.success({
              message: t('success', {
                amount: selectedIds.length,
              }),
            });
          } else
            Modal.error({
              title: t('fail'),
              content: t('error'),
              okText: t('confirm'),
            });
        },
      });

      setRunningIds([]);
    },
    [submitOrder, t],
  );

  return {
    runningIds,
    submitEcpayOrder: useCallback(
      (selectedIds: string[]) => submitEcpayOrder(selectedIds),
      [submitEcpayOrder],
    ),
  };
};
