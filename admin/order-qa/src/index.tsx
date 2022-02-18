// import
import React from 'react';
import { Drawer, Button, Input } from 'antd';
import { useQuery } from '@apollo/client';
import { MailOutlined } from '@ant-design/icons';
import { format } from 'date-fns';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import { useAutoLinker } from '@meepshop/hooks';

import MessageRepliedStatus from './MessageRepliedStatus';
import useAddNewMessage from './hooks/useAddNewMessage';
import styles from './styles/index.less';

// graphql typescript
import {
  getOrderMessage as getOrderMessageType,
  getOrderMessageVariables as getOrderMessageVariablesType,
} from '@meepshop/types/gqls/admin';

// graphql imoprt
import { getOrderMessage } from './gqls';
import { useAddNewMessageFragment } from './gqls/useAddNewMessage';

// definition
const { TextArea } = Input;

export default React.memo(
  ({ orderId, onClose }: { orderId: string; onClose: () => void }) => {
    const { t } = useTranslation('order-qa');
    const { data } = useQuery<
      getOrderMessageType,
      getOrderMessageVariablesType
    >(getOrderMessage, {
      variables: {
        orderId,
      },
    });
    const {
      messageContentRef,
      newMessage,
      setNewMessage,
      addNewMessage,
    } = useAddNewMessage(
      filter(useAddNewMessageFragment, data?.viewer?.order || null),
    );
    const autoLinker = useAutoLinker();

    if (!data) return null;

    const messageReplied = data.viewer?.order?.messageReplied;
    const messages = data.viewer?.order?.messages || [];

    return (
      <Drawer
        destroyOnClose
        className={styles.root}
        visible
        width={552}
        onClose={onClose}
        title={
          <>
            <div className={styles.title}>{t('title')}</div>
            <div className={styles.tags}>
              <MessageRepliedStatus
                orderId={orderId}
                messageReplied={messageReplied}
              />
            </div>
          </>
        }
      >
        <div ref={messageContentRef} className={styles.content}>
          {messages.map(message => {
            if (!message) return null;

            return (
              <div
                key={message.createdAt}
                className={`${styles.bearer} ${
                  message.bearer === 'CUSTOMER' ? styles.customer : styles.store
                }`}
              >
                <pre
                  dangerouslySetInnerHTML={{
                    __html: autoLinker.link(message.text),
                  }}
                />

                <div className={styles.time}>
                  {format(new Date(message.createdAt), 'yyyy/MM/dd HH:mm')}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.footer}>
          <TextArea
            value={newMessage}
            className={styles.textarea}
            rows={5}
            placeholder={t('placeholder')}
            onChange={e => setNewMessage(e.target.value)}
          />

          <Button
            className={styles.sendBtn}
            type="primary"
            icon={<MailOutlined />}
            onClick={addNewMessage}
          >
            {t('send')}
          </Button>
        </div>
      </Drawer>
    );
  },
);
