// typescript import
import { DataProxy } from 'apollo-cache';
import { I18nPropsType } from '@store/utils/lib/i18n';

// import
import React from 'react';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import transformColor from 'color';
import { Button, notification } from 'antd';
import moment from 'moment';

import { withNamespaces } from '@store/utils/lib/i18n';

import styles from './styles/qa.less';

// graphql typescript
import { qaOrderMessageFragment as qaOrderMessageFragmentType } from './__generated__/qaOrderMessageFragment';
import {
  getMemberOrder_viewer_order as getMemberOrderViewerOrder,
  getMemberOrder_getColorList as getMemberOrderGetColorList,
} from './__generated__/getMemberOrder';
import {
  addNewMessage,
  addNewMessageVariables,
} from './__generated__/addNewMessage';
import { qaOrderFragment } from './__generated__/qaOrderFragment';

// typescript definition
interface PropsType extends I18nPropsType {
  messages: getMemberOrderViewerOrder['messages'];
  orderId: getMemberOrderViewerOrder['id'];
  colors: getMemberOrderGetColorList['colors'];
}

interface StateType {
  newMessage: string;
}

// definition
export const qaOrderMessageFragment = gql`
  fragment qaOrderMessageFragment on OrderMessage {
    bearer
    text
    createdAt
  }
`;

class Qa extends React.PureComponent<PropsType, StateType> {
  private textareaRef: React.RefObject<HTMLTextAreaElement> = React.createRef();

  public state = {
    newMessage: '',
  };

  public componentDidMount(): void {
    const {
      location: { hash },
    } = window;
    const { current } = this.textareaRef;

    if (hash === '#qa' && current) {
      current.scrollIntoView();
    }
  }

  private updateMessages = (
    cache: DataProxy,
    {
      data: {
        addOrderMessage: { success, reason },
      },
    }: { data: addNewMessage },
  ) => {
    const { t, orderId } = this.props;

    if (!success) {
      notification.error({
        message: t('qa.error'),
        description: reason,
      });
      return;
    }

    const { newMessage } = this.state;
    const fragment = {
      // TODO: id should not be null
      id: orderId || 'null id',
      fragment: gql`
        fragment qaOrderFragment on Order {
          messages {
            bearer
            text
            createdAt
          }
        }
      `,
    };
    const order = cache.readFragment<qaOrderFragment>(fragment);

    if (!order) return;

    cache.writeFragment({
      ...fragment,
      data: {
        __typename: 'Order',
        messages: [
          ...order.messages,
          {
            text: newMessage,
            bearer: 'CUSTOMER',
            createdAt: moment().format(),
            __typename: 'OrderMessage',
          },
        ],
      },
    });

    this.setState({ newMessage: '' }, () =>
      notification.success({
        message: t('qa.success'),
      }),
    );
  };

  public render(): React.ReactNode {
    const {
      /** HOC */
      t,

      /** props */
      colors,
      messages,
      orderId,
    } = this.props;
    const { newMessage } = this.state;
    // TODO: should not be null[]
    const filteredMessages = messages.filter(
      message => message,
    ) as qaOrderMessageFragmentType[];

    return (
      <div className={styles.root}>
        <h3
          style={{
            borderTop: `1px solid ${colors[5]}`,
            borderBottom: `1px solid ${colors[5]}`,
          }}
        >
          {t('qa.title')}
        </h3>

        <div className={styles.messages}>
          {filteredMessages.map(({ bearer, text, createdAt }, index) => (
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
                  )
                    .alpha(0.1)
                    .toString(),
                }}
              >
                <pre>{text}</pre>

                <p
                  style={{
                    color: transformColor(colors[2])
                      .alpha(0.5)
                      .toString(),
                  }}
                >
                  {moment(createdAt).format('YYYY/MM/DD HH:mm')}
                </p>
              </div>
            </div>
          ))}

          <textarea
            ref={this.textareaRef}
            style={{
              border: `1px solid ${colors[5]}`,
            }}
            placeholder={t('qa.placeholder')}
            value={newMessage}
            onChange={({ target: { value } }) =>
              this.setState({ newMessage: value })
            }
          />

          <Mutation<addNewMessage, addNewMessageVariables>
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
                style={{
                  color: colors[3],
                  border: `1px solid ${colors[3]}`,
                }}
                onClick={() =>
                  addOrderMessage({
                    variables: {
                      input: {
                        // TODO: id should not be null
                        orderId: orderId || 'null id',
                        text: newMessage,
                      },
                    },
                  })
                }
                disabled={newMessage === ''}
              >
                {t('qa.send')}
              </Button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default withNamespaces('member-order')(Qa);
