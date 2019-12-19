// typescript import
import { I18nPropsType } from '@store/utils/lib/i18n';
import { MutationFunction } from '@apollo/react-common';

// import
import React from 'react';
import { Query, Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import { Spin, Icon, Input, Button, Modal, notification } from 'antd';

import { withTranslation } from '@store/utils/lib/i18n';

import { DEFAULT_MESSAGE } from './constants';
import styles from './styles/index.less';

// graphql typescript
import {
  getMemberOrderPayNotify,
  getMemberOrderPayNotify_viewer_order as getMemberOrderPayNotifyViewerOrder,
  getMemberOrderPayNotify_getColorList as getMemberOrderPayNotifyGetColorList,
} from './__generated__/getMemberOrderPayNotify';
import { sendOrderPayNotify as sendOrderPayNotifyType } from './__generated__/sendOrderPayNotify';

// graphql import
import { colorListFragment } from '@store/apollo-client-resolvers/lib/ColorList';

// typescript definition
interface PropsType extends I18nPropsType {
  paidMessage: string;
  order: getMemberOrderPayNotifyViewerOrder;
  colors: getMemberOrderPayNotifyGetColorList['colors'];
}

// definition
const { TextArea } = Input;

class MemberOrderPayNotify extends React.PureComponent<PropsType> {
  public state = {
    message:
      // eslint-disable-next-line react/destructuring-assignment
      (this.props.order?.paidMessage?.slice(-1)[0] || {}).note ||
      // eslint-disable-next-line react/destructuring-assignment
      this.props.paidMessage ||
      DEFAULT_MESSAGE,
    disabled:
      // eslint-disable-next-line react/destructuring-assignment
      (this.props.order?.paidMessage?.length || 0) > 0,
  };

  private send = (
    sendOrderPayNotify: MutationFunction<sendOrderPayNotifyType>,
  ): void => {
    const {
      // HOC
      t,
      paidMessage: customDefaultMessage,

      // props
      order: { id, paidMessage },
    } = this.props;
    const { message } = this.state;

    const prevMessage =
      ((paidMessage || []).slice(-1)[0] || { note: '' }).note ||
      customDefaultMessage ||
      DEFAULT_MESSAGE;

    if (message !== prevMessage)
      sendOrderPayNotify({
        variables: {
          newMessage: {
            id,
            paidMessage: {
              createData: { note: message },
            },
          },
        },
      });
    else
      Modal.error({
        title: t('pleaseEditPayNotification'),
        maskClosable: true,
      });
  };

  private updateMessages = (): void => {
    const { t } = this.props;

    notification.success({ message: t('sendSuccess') });
    this.setState({ disabled: true });
  };

  public render(): React.ReactNode {
    const {
      // HOC
      t,

      // props
      order: { orderNo },
      colors,
    } = this.props;
    const { message, disabled } = this.state;

    return (
      <div className={styles.root}>
        <div>
          <h1>
            {t('orderNo')}
            {orderNo}
          </h1>

          <TextArea
            value={message}
            onChange={({ target: { value } }) =>
              this.setState({ message: value })
            }
            disabled={disabled}
            rows={12}
          />

          <div>
            <Mutation<sendOrderPayNotifyType>
              mutation={gql`
                mutation sendOrderPayNotify($newMessage: [UpdateOrder]) {
                  updateOrderList(updateOrderList: $newMessage) {
                    id
                    paidMessage {
                      note
                    }
                  }
                }
              `}
              update={this.updateMessages}
            >
              {sendOrderPayNotify => (
                <Button
                  size="large"
                  onClick={() =>
                    disabled
                      ? this.setState({ disabled: false })
                      : this.send(sendOrderPayNotify)
                  }
                  style={{ color: colors[3], borderColor: colors[3] }}
                >
                  {t(disabled ? 'editAgain' : 'send')}
                </Button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

const EnhancedMemberOrderPayNotify = withTranslation('member-order-pay-notify')(
  MemberOrderPayNotify,
);

export default React.memo(({ orderId }: { orderId: string }) => (
  <Query<getMemberOrderPayNotify>
    query={gql`
      query getMemberOrderPayNotify($orderId: ID!) {
        viewer {
          id
          store {
            id
            setting {
              paidMessage
            }
          }
          order(orderId: $orderId) {
            id
            orderNo
            paidMessage {
              note
            }
          }
        }

        getColorList {
          ...colorListFragment
        }
      }

      ${colorListFragment}
    `}
    variables={{ orderId }}
  >
    {({ loading, error, data }) => {
      if (loading || error || !data)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const { viewer, getColorList } = data;

      const order = viewer?.order;
      const paidMessage = viewer?.store?.setting?.paidMessage || '';

      if (!order || !getColorList)
        return <Spin indicator={<Icon type="loading" spin />} />;

      return (
        <EnhancedMemberOrderPayNotify
          paidMessage={paidMessage}
          order={order}
          colors={getColorList.colors}
        />
      );
    }}
  </Query>
));
