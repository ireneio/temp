// typescript import
import { DataProxy } from 'apollo-cache';

// import
import React, { useCallback, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Select, Modal, Icon, notification } from 'antd';

import { useTranslation } from '@meepshop/locales';

import { STATUS_LIST } from '../constants';
import styles from '../styles/changeStatus.less';

// graphql typescript
import {
  changeStatusOrderConnectionFragment,
  updateOrder as updateOrderType,
  updateOrderVariables as updateOrderVariablesType,
  changeStatusOrderFragment as changeStatusOrderFragmentType,
  UpdateOrder,
} from '@meepshop/types/gqls/admin';

// graphql import
import { changeStatusOrderFragment, updateOrder } from '../gqls/changeStatus';

// typescript definition
interface PropsType {
  runningIds: string[];
  selectedOrders: changeStatusOrderConnectionFragment;
}

type StatusType =
  | 'orderStatusList'
  | 'paymentStatusList'
  | 'shipmentStatusList';

// definition
const { Option } = Select;

export default ({
  runningIds,
  selectedOrders,
}: PropsType): ((statusType: StatusType) => void) => {
  const { t } = useTranslation('orders');
  const newStatus = useRef<string | null>(null);
  const countErrors = useRef(0);
  const [mutation] = useMutation<updateOrderType, updateOrderVariablesType>(
    updateOrder,
    {
      update: (
        cache: DataProxy,
        { data: { updateOrder: newOrder } }: { data: updateOrderType },
      ): void => {
        if (!newOrder?.id) {
          countErrors.current += 1;
          return;
        }

        cache.writeFragment<changeStatusOrderFragmentType>({
          id: newOrder.id,
          fragment: changeStatusOrderFragment,
          data: {
            __typename: 'Order',
            id: newOrder.id,
            status: newOrder.status,
            shipmentInfo: {
              __typename: 'shipmentInfoType',
              status: newOrder.shipmentInfo?.status ?? null,
            },
            paymentInfo: {
              __typename: 'paymentInfoType',
              status: newOrder.paymentInfo?.status ?? null,
            },
          },
        });
      },
    },
  );
  const updateOrders = useCallback(
    async (statusType: StatusType): Promise<void> => {
      const { edges, total } = selectedOrders;
      const newOrderStatus: Pick<
        UpdateOrder,
        'status' | 'paymentInfo' | 'shipmentInfo'
      > = {};

      if (!newStatus.current) return;

      switch (statusType) {
        case 'orderStatusList':
          newOrderStatus.status = STATUS_LIST[statusType].indexOf(
            newStatus.current,
          );
          break;

        case 'paymentStatusList':
          newOrderStatus.paymentInfo = {
            status: STATUS_LIST[statusType].indexOf(newStatus.current),
          };
          break;

        case 'shipmentStatusList':
          newOrderStatus.shipmentInfo = {
            status: STATUS_LIST[statusType].indexOf(newStatus.current),
          };
          break;

        default:
          break;
      }

      await Promise.all(
        edges.map(async ({ node: { id } }) => {
          // SHOULD_NOT_BE_NULL
          if (!id || runningIds.includes(id)) return;

          await mutation({
            variables: {
              updateOrder: {
                ...newOrderStatus,
                id,
              },
            },
          });
        }),
      );

      if (countErrors.current !== 0)
        notification.error({
          message: t('change-status.error.title'),
          description: t('change-status.error.description', {
            amount: countErrors.current,
            status: t(`change-status.${statusType}`),
          }),
        });

      if (total - countErrors.current !== 0)
        notification.success({
          message: t('change-status.success.title'),
          description: t('change-status.success.description', {
            amount: total - countErrors.current,
            status: t(`change-status.${statusType}`),
            newStatus: t(`${statusType}.${newStatus.current}`),
          }),
        });
    },
    [t, runningIds, selectedOrders, mutation],
  );
  const changeOrderStatusWarning = useCallback(
    (statusType: StatusType): void => {
      if (newStatus.current === 'CANCELED')
        Modal.confirm({
          title: t('change-status.order-change.cancel.title'),
          content: t('change-status.order-change.cancel.description'),
          cancelText: t(`change-status.cancel`),
          okText: t(`change-status.confirm`),
          onOk: () => updateOrders(statusType),
          icon: <Icon type="info-circle" />,
          centered: true,
        });
      else if (newStatus.current === 'CLOSED')
        Modal.confirm({
          title: t('change-status.order-change.closed.title'),
          content: t('change-status.order-change.closed.description'),
          cancelText: t(`change-status.cancel`),
          okText: t(`change-status.confirm`),
          onOk: () => updateOrders(statusType),
          icon: <Icon type="info-circle" />,
          centered: true,
        });
      else updateOrders(statusType);
    },
    [t, updateOrders],
  );

  return useCallback(
    (statusType: StatusType) => {
      newStatus.current = null;
      countErrors.current = 0;
      Modal.confirm({
        title: `${t('change')}${t(`change-status.${statusType}`)}`,
        content: (
          <div className={styles.content}>
            {t(`change-status.${statusType}`)}

            <Select
              placeholder={t('change-status.choose')}
              onChange={(status: string) => {
                newStatus.current = status;
              }}
            >
              {STATUS_LIST[statusType].map(status =>
                !status ||
                (statusType === 'orderStatusList' &&
                  ['PROCESSING', 'RETURN'].includes(status)) ? null : (
                  <Option key={status} value={status}>
                    {t(`${statusType}.${status}`)}
                  </Option>
                ),
              )}
            </Select>
          </div>
        ),
        cancelText: t(`change-status.cancel`),
        okText: t(`change-status.confirm`),
        onOk: () => {
          if (statusType === 'orderStatusList')
            changeOrderStatusWarning(statusType);
          else updateOrders(statusType);
        },
        centered: true,
        icon: null,
      });
    },
    [t, updateOrders, changeOrderStatusWarning],
  );
};
