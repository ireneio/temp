import React from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { withRouter } from 'next/router';
import { Spin, Icon, Modal, Input, Button, notification } from 'antd';

import { contextProvider } from 'context';

import { DEFAULT_MESSAGE } from './constants';
import styles from './styles/index.less';
import * as LOCALE from './locale';

const { enhancer } = contextProvider(['storeSetting', 'locale']);
const { TextArea } = Input;

@enhancer
class MemberOrderPayNotify extends React.PureComponent {
  static propTypes = {
    order: PropTypes.shape({
      paidMessage: PropTypes.arrayOf(PropTypes.shape({}).isRequired),
    }).isRequired,
  };

  state = {
    message:
      // eslint-disable-next-line react/destructuring-assignment
      this.props.order.paidMessage?.slice(-1)[0].note ||
      // eslint-disable-next-line react/destructuring-assignment
      this.props.storeSetting.paidMessage ||
      DEFAULT_MESSAGE,
    disabled:
      // eslint-disable-next-line react/destructuring-assignment
      (this.props.order.paidMessage || []).length > 0,
  };

  send = snedOrderPayNotify => {
    const {
      /** context */
      transformLocale,
      storeSetting: { paidMessage: customDefaultMessage },

      /** props */
      order: { id, paidMessage },
    } = this.props;
    const { message } = this.state;
    const prevMessage =
      paidMessage?.slice(-1)[0].note || customDefaultMessage || DEFAULT_MESSAGE;

    if (message !== prevMessage)
      snedOrderPayNotify({
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
        title: transformLocale(LOCALE.PLEASE_EDIT_PAY_NOTIFICATION),
        maskClosable: true,
      });
  };

  updateMessages = () => {
    const { transformLocale } = this.props;

    notification.success({
      message: transformLocale(LOCALE.SEND_OK),
    });
    this.setState({ disabled: true });
  };

  render() {
    const {
      /** context */
      transformLocale,
      storeSetting: { colors },

      /** props */
      order: { orderNo },
    } = this.props;
    const { message, disabled } = this.state;

    return (
      <div className={styles.root}>
        <div>
          <h1>
            {transformLocale(LOCALE.ORDER_NO)}
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
            <Mutation
              mutation={gql`
                mutation snedOrderPayNotify($newMessage: [UpdateOrder]) {
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
              {snedOrderPayNotify => (
                <Button
                  size="large"
                  onClick={() =>
                    disabled
                      ? this.setState({ disabled: false })
                      : this.send(snedOrderPayNotify)
                  }
                  style={{ color: colors[3], borderColor: colors[3] }}
                >
                  {transformLocale(disabled ? LOCALE.EDIT_AGAIN : LOCALE.SEND)}
                </Button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(({ router: { query: { orderId } } }) => (
  <Query
    query={gql`
      query getMemberOrderPayNotify($orderId: ID!) {
        viewer {
          id
          order(orderId: $orderId) {
            id
            orderNo
            paidMessage {
              note
            }
          }
        }
      }
    `}
    variables={{ orderId }}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return <Spin indicator={<Icon type="loading" spin />} />;

      const {
        viewer: { order },
      } = data;

      return <MemberOrderPayNotify order={order} />;
    }}
  </Query>
));
