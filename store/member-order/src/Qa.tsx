// typescript import
import { DataProxy } from 'apollo-cache';

import { I18nPropsType } from '@meepshop/utils/lib/i18n';
import { ColorsType } from '@meepshop/context';

// import
import React from 'react';
import { Mutation } from '@apollo/react-components';
import gql from 'graphql-tag';
import transformColor from 'color';
import { Button, notification } from 'antd';
import moment from 'moment';

import withHook from '@store/utils/lib/withHook';
import { useAutoLinker } from '@meepshop/hooks';
import { withTranslation } from '@meepshop/utils/lib/i18n';
import { Colors as ColorsContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import styles from './styles/qa.less';

// graphql typescript
import {
  MessageBearer,
  qaOrderMessageFragment as qaOrderMessageFragmentType,
  getMemberOrder_viewer_order as getMemberOrderViewerOrder,
  addNewMessage,
  addNewMessageVariables,
  qaOrderFragment,
} from '@meepshop/types/gqls/store';

// typescript definition
interface HooksProps {
  autoLinker: ReturnType<typeof useAutoLinker>;
}
interface PropsType extends I18nPropsType, HooksProps {
  messages: getMemberOrderViewerOrder['messages'];
  orderId: getMemberOrderViewerOrder['id'];
  colors: ColorsType;
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
  ): void => {
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
      // SHOULD_NOT_BE_NULL
      id: orderId || 'null id',
      fragment: gql`
        fragment qaOrderFragment on Order {
          id
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

    cache.writeFragment<qaOrderFragment>({
      ...fragment,
      data: {
        __typename: 'Order',
        id: fragment.id,
        messages: [
          ...order.messages,
          {
            __typename: 'OrderMessage',
            text: newMessage,
            bearer: 'CUSTOMER' as MessageBearer,
            createdAt: moment().format(),
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
      autoLinker,
    } = this.props;
    const { newMessage } = this.state;
    // SHOULD_NOT_BE_NULL
    const filteredMessages = messages.filter(
      Boolean,
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
                <pre
                  dangerouslySetInnerHTML={{ __html: autoLinker.link(text) }}
                />

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
                        // SHOULD_NOT_BE_NULL
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

export default withTranslation('member-order')(
  withContext(ColorsContext, colors => ({ colors }))(
    withHook<PropsType, HooksProps>(() => ({
      autoLinker: useAutoLinker(),
    }))(Qa),
  ),
);
