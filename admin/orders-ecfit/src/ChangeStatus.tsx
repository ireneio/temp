// typescript import
import { DataProxy } from 'apollo-cache';

import { I18nPropsType } from '@admin/utils/lib/i18n';

// import
import React from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Select, Modal, Icon, notification } from 'antd';
import idx from 'idx';

import { withNamespaces } from '@admin/utils/lib/i18n';

import { STATUS_LIST } from './constants';
import styles from './styles/changeStatus.less';

// graphql typescript
import { updateOrder, updateOrderVariables } from './__generated__/updateOrder';
import { updateOrderStatus } from './__generated__/updateOrderStatus';
import { UpdateOrder } from '../../../__generated__/admin';

// typescript definition
interface PropsType extends I18nPropsType {
  selected: string[];
}

type StatusType =
  | 'orderStatusList'
  | 'paymentStatusList'
  | 'shipmentStatusList';

type updateOrderType = (options: {
  variables: updateOrderVariables;
}) => Promise<{ data: updateOrder }>;

// definition
const { Option } = Select;

class ChangeTypes extends React.PureComponent<PropsType> {
  private countErrors = 0;

  private newStatus?: string;

  private selectChangeStatusType = (updateOrderMutation: updateOrderType) => (
    statusType: StatusType,
  ) => {
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
    updateOrderMutation: updateOrderType,
  ) => {
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
    updateOrderMutation: updateOrderType,
  ) => {
    const {
      // HOC
      t,

      // props
      selected,
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
      selected.map(id =>
        updateOrderMutation({
          variables: {
            updateOrder: {
              ...newOrderStatus,
              id,
            },
          },
        }),
      ),
    );

    if (this.countErrors !== 0)
      notification.error({
        message: t('change-status.error.title'),
        description: `${this.countErrors}${t(
          'change-status.error.description.0',
        )}${t(`change-status.${statusType}`)}${t(
          'change-status.error.description.1',
        )}`,
      });

    if (selected.length - this.countErrors !== 0)
      notification.success({
        message: t('change-status.success.title'),
        description: `${selected.length - this.countErrors}${t(
          'change-status.success.description.0',
        )}${t(`change-status.${statusType}`)}${t(
          'change-status.success.description.1',
        )}${t(`${statusType}.${this.newStatus}`)}${t(
          'change-status.success.description.2',
        )}`,
      });
  };

  private updateOrderStatus = (
    cache: DataProxy,
    { data: { updateOrder: newOrder } }: { data: updateOrder },
  ) => {
    const fragment = {
      // TODO: should not be null id
      id: idx(newOrder, _ => _.id) || 'null id',
      fragment: gql`
        fragment updateOrderStatus on Order {
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
    const order = cache.readFragment<updateOrderStatus>(fragment);

    if (!order) return;

    cache.writeFragment({
      ...fragment,
      data: {
        ...order,
        status: idx(newOrder, _ => _.status),
        shipmentInfo: {
          ...idx(order, _ => _.shipmentInfo),
          ...idx(newOrder, _ => _.shipmentInfo),
        },
        paymentInfo: {
          ...idx(order, _ => _.paymentInfo),
          ...idx(newOrder, _ => _.paymentInfo),
        },
      },
    });
  };

  public render(): React.ReactNode {
    const { t } = this.props;

    return (
      <Mutation
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
        onError={() => {
          this.countErrors += 1;
        }}
      >
        {(updateOrderMutation: updateOrderType) => (
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

export default withNamespaces('orders-ecfit')(ChangeTypes);
