// typescript import
import { DataProxy } from 'apollo-cache';
import { MutationFunction } from '@apollo/react-common';

import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from '@apollo/react-components';
import { Select, Modal, Icon, notification } from 'antd';

import { withTranslation } from '@admin/utils/lib/i18n';

import { STATUS_LIST } from './constants';
import styles from './styles/changeStatus.less';

// graphql typescript
import { changeStatusOrderConnectionFragment as changeStatusOrderConnectionFragmentType } from './__generated__/changeStatusOrderConnectionFragment';
import { updateOrder, updateOrderVariables } from './__generated__/updateOrder';
import { changeStatusOrderFragment } from './__generated__/changeStatusOrderFragment';
import { UpdateOrder } from '../../../__generated__/admin';

// typescript definition
interface PropsType extends I18nPropsType {
  runningIds: string[];
  selectedOrders: changeStatusOrderConnectionFragmentType;
}

type StatusType =
  | 'orderStatusList'
  | 'paymentStatusList'
  | 'shipmentStatusList';

// definition
const { Option } = Select;

export const changeStatusOrderConnectionFragment = gql`
  fragment changeStatusOrderConnectionFragment on OrderConnection {
    edges {
      node {
        id
      }
    }
    total
  }
`;

class ChangeTypes extends React.PureComponent<PropsType> {
  private countErrors = 0;

  private newStatus?: string;

  private selectChangeStatusType = (
    updateOrderMutation: MutationFunction<updateOrder, updateOrderVariables>,
  ) => (statusType: StatusType) => {
    const { t } = this.props;

    this.countErrors = 0;
    this.newStatus = undefined;

    Modal.confirm({
      title: `${t('change')}${t(`change-status.${statusType}`)}`,
      content: (
        <div className={styles.content}>
          {t(`change-status.${statusType}`)}

          <Select
            placeholder={t('change-status.choose')}
            onChange={(status: string) => {
              this.newStatus = status;
            }}
          >
            {STATUS_LIST[statusType].map(status =>
              statusType === 'orderStatusList' &&
              ['PROCESSING', 'RETURN'].includes(status) ? null : (
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
          this.changeOrderStatusWarning(statusType, updateOrderMutation);
        else this.updateOrders(statusType, updateOrderMutation);
      },
      centered: true,
      icon: null,
    });
  };

  private changeOrderStatusWarning = (
    statusType: StatusType,
    updateOrderMutation: MutationFunction<updateOrder, updateOrderVariables>,
  ): void => {
    const { t } = this.props;

    if (this.newStatus === 'CANCELED')
      Modal.confirm({
        title: t('change-status.order-change.cancel.title'),
        content: t('change-status.order-change.cancel.description'),
        cancelText: t(`change-status.cancel`),
        okText: t(`change-status.confirm`),
        onOk: () => this.updateOrders(statusType, updateOrderMutation),
        icon: <Icon type="info-circle" />,
        centered: true,
      });
    else if (this.newStatus === 'CLOSED')
      Modal.confirm({
        title: t('change-status.order-change.closed.title'),
        content: t('change-status.order-change.closed.description'),
        cancelText: t(`change-status.cancel`),
        okText: t(`change-status.confirm`),
        onOk: () => this.updateOrders(statusType, updateOrderMutation),
        icon: <Icon type="info-circle" />,
        centered: true,
      });
    else this.updateOrders(statusType, updateOrderMutation);
  };

  private updateOrders = async (
    statusType: StatusType,
    updateOrderMutation: MutationFunction<updateOrder, updateOrderVariables>,
  ): Promise<void> => {
    const {
      // HOC
      t,

      // props
      runningIds,
      selectedOrders: { edges, total },
    } = this.props;
    const newOrderStatus: Pick<
      UpdateOrder,
      'status' | 'paymentInfo' | 'shipmentInfo'
    > = {};

    if (!this.newStatus) return;

    switch (statusType) {
      case 'orderStatusList':
        newOrderStatus.status = STATUS_LIST[statusType].indexOf(this.newStatus);
        break;

      case 'paymentStatusList':
        newOrderStatus.paymentInfo = {
          status: STATUS_LIST[statusType].indexOf(this.newStatus),
        };
        break;

      case 'shipmentStatusList':
        newOrderStatus.shipmentInfo = {
          status: STATUS_LIST[statusType].indexOf(this.newStatus),
        };
        break;

      default:
        break;
    }

    await Promise.all(
      edges.map(async ({ node: { id } }) => {
        // TODO: should not be null
        if (!id || runningIds.includes(id)) return;

        await updateOrderMutation({
          variables: {
            updateOrder: {
              ...newOrderStatus,
              id,
            },
          },
        });
      }),
    );

    if (this.countErrors !== 0)
      notification.error({
        message: t('change-status.error.title'),
        description: t('change-status.error.description', {
          amount: this.countErrors,
          status: t(`change-status.${statusType}`),
        }),
      });

    if (total - this.countErrors !== 0)
      notification.success({
        message: t('change-status.success.title'),
        description: t('change-status.success.description', {
          amount: total - this.countErrors,
          status: t(`change-status.${statusType}`),
          newStatus: t(`${statusType}.${this.newStatus}`),
        }),
      });
  };

  private updateOrderStatus = (
    cache: DataProxy,
    { data: { updateOrder: newOrder } }: { data: updateOrder },
  ): void => {
    if (!newOrder) {
      this.countErrors += 1;
      return;
    }

    const fragment = {
      // TODO: should not be null id
      id: newOrder?.id || 'null id',
      fragment: gql`
        fragment changeStatusOrderFragment on Order {
          id
          status
          shipmentInfo {
            status
          }
          paymentInfo {
            status
          }
        }
      `,
    };
    const order = cache.readFragment<changeStatusOrderFragment>(fragment);

    if (!order) return;

    cache.writeFragment({
      ...fragment,
      data: {
        ...order,
        status: newOrder?.status,
        shipmentInfo: {
          ...order?.shipmentInfo,
          ...newOrder?.shipmentInfo,
        },
        paymentInfo: {
          ...order?.paymentInfo,
          ...newOrder?.paymentInfo,
        },
      },
    });
  };

  public render(): React.ReactNode {
    const { t } = this.props;

    return (
      <Mutation<updateOrder, updateOrderVariables>
        mutation={gql`
          mutation updateOrder($updateOrder: UpdateOrder) {
            updateOrder(updateOrder: $updateOrder) {
              id
              status
              shipmentInfo {
                status
              }
              paymentInfo {
                status
              }
            }
          }
        `}
        update={this.updateOrderStatus}
      >
        {updateOrderMutation => (
          <Select<StatusType | string>
            value={t('change-status.title')}
            onChange={this.selectChangeStatusType(updateOrderMutation)}
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
        )}
      </Mutation>
    );
  }
}

export default withTranslation('orders-ecfit')(ChangeTypes);
