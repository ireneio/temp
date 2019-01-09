import React from 'react';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import { Button, notification } from 'antd';
import moment from 'moment';
import transformColor from 'color';

import { contextProvider } from 'context';
import { ID_TYPE } from 'constants/propTypes';
import findDOMTop from 'utils/findDOMTop';

import * as LOCALE from './locale';
import styles from './styles/qa.less';

const { enhancer } = contextProvider(['storeSetting', 'locale', 'location']);

export const qaFragment = gql`
  fragment qaFragment on OrderMessage {
    bearer
    text
    createdAt
  }
`;

@enhancer
export default class Qa extends React.PureComponent {
  textareaRef = React.createRef();

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    orderId: ID_TYPE.isRequired,
  };

  state = {
    newMessage: '',
  };

  componentDidMount() {
    const {
      location: { hash },
    } = this.props;

    if (hash === '#qa') {
      setTimeout(() => {
        window.scrollTo(0, findDOMTop(this.textareaRef.current));
      }, 0);
    }
  }

  updateMessages = (
    cache,
    {
      data: {
        addOrderMessage: { success, reason },
      },
    },
  ) => {
    const { transformLocale, orderId } = this.props;

    if (!success) {
      notification.error({
        message: transformLocale(LOCALE.ADD_ORDER_MESSAGE_FAILURE_MESSAGE),
        description: reason,
      });
      return;
    }

    const { newMessage } = this.state;
    const fragment = {
      id: orderId,
      fragment: gql`
        fragment readMessagesFragment on Order {
          messages {
            bearer
            text
            createdAt
          }
        }
      `,
    };
    const { messages } = cache.readFragment(fragment);

    messages.push({
      text: newMessage,
      bearer: 'CUSTOMER',
      createdAt: moment().format(),
      __typename: 'OrderMessage',
    });

    cache.writeFragment({
      ...fragment,
      data: {
        __typename: 'Order',
        messages,
      },
    });

    this.setState({ newMessage: '' }, () =>
      notification.success({
        message: transformLocale(LOCALE.ADD_ORDER_MESSAGE_SUCCESS),
      }),
    );
  };

  render() {
    const {
      /** context */
      storeSetting: { colors },
      transformLocale,

      /** props */
      messages,
      orderId,
    } = this.props;
    const { newMessage } = this.state;

    return (
      <div className={styles.root}>
        <h1>{transformLocale(LOCALE.QA)}</h1>

        <div className={styles.messages}>
          {messages.map(({ bearer, text, createdAt }, index) => (
            <div
              key={createdAt}
              className={`${messages.length - 1 === index ? styles.last : ''} ${
                bearer === 'CUSTOMER' ? styles.customer : ''
              }`}
            >
              <div
                style={{
                  background: transformColor(
                    colors[bearer === 'CUSTOMER' ? 5 : 4],
                  ).alpha(0.1),
                }}
              >
                <p>{text}</p>

                <p style={{ color: transformColor(colors[2]).alpha(0.5) }}>
                  {moment(createdAt).format('YYYY/MM/DD HH:mm')}
                </p>
              </div>
            </div>
          ))}

          <textarea
            ref={this.textareaRef}
            placeholder={transformLocale(LOCALE.PLEASE_WRITE_MESSAGE)}
            value={newMessage}
            onChange={({ target: { value } }) =>
              this.setState({ newMessage: value })
            }
          />

          <Mutation
            mutation={gql`
              mutation addNewMessage($input: AddOrderMessageInput!) {
                addOrderMessage(input: $input) {
                  success
                  reason
                }
              }
            `}
            update={this.updateMessages}
          >
            {addOrderMessage => (
              <Button
                onClick={() =>
                  addOrderMessage({
                    variables: {
                      input: {
                        orderId,
                        text: newMessage,
                      },
                    },
                  })
                }
                disabled={newMessage === ''}
              >
                {transformLocale(LOCALE.SEND)}
              </Button>
            )}
          </Mutation>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              .${styles.root} h1 {
                border-top: 1px solid ${colors[5]};
                border-bottom: 1px solid ${colors[5]};
              }

              .${styles.root} textarea {
                border: 1px solid ${colors[5]};
              }

              .${styles.root} .ant-btn:not([disabled]),
              .${styles.root} .ant-btn:not([disabled]):hover {
                color: ${colors[3]};
                border: 1px solid ${colors[3]};
              }
            `,
          }}
        />
      </div>
    );
  }
}
