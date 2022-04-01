// import
import React, { useContext, useRef, useEffect } from 'react';
import transformColor from 'color';
import { Button } from 'antd';
import { format } from 'date-fns';

import { useRouter } from '@meepshop/link';
import { useAutoLinker } from '@meepshop/hooks';
import { useTranslation } from '@meepshop/locales';
import { Colors as ColorsContext } from '@meepshop/context';
import filter from '@meepshop/utils/lib/filter';

import useAddNewMessage from './hooks/useAddNewMessage';
import styles from './styles/qa.less';

// graphql typescript
import {
  qaOrderFragment as qaOrderFragmentType,
  qaOrderFragment_messages as qaOrderFragmentMessagesType,
  useAddNewMessageFragment as useAddNewMessageFragmentType,
} from '@meepshop/types/gqls/store';

// graphql import
import { useAddNewMessageFragment } from './gqls/useAddNewMessage';

// typescript definition
interface PropsType {
  order: qaOrderFragmentType;
}

// definition
export default React.memo(({ order }: PropsType) => {
  const { hash } = useRouter();
  const { t } = useTranslation('member-order');
  const colors = useContext(ColorsContext);
  const autoLinker = useAutoLinker();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { newMessage, setNewMessage, addNewMessage } = useAddNewMessage(
    filter<useAddNewMessageFragmentType>(useAddNewMessageFragment, order),
  );

  useEffect(() => {
    if (hash === 'qa' && textareaRef.current) {
      textareaRef.current.scrollIntoView();
    }
  }, [hash]);

  const filterMessages = order.messages.filter(
    Boolean,
  ) as qaOrderFragmentMessagesType[];

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
        {filterMessages.map(({ bearer, text, createdAt }, index) => (
          <div
            key={createdAt}
            className={`${
              filterMessages.length - 1 === index ? styles.last : ''
            } ${bearer === 'CUSTOMER' ? styles.customer : ''}`}
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
                {format(new Date(createdAt), 'yyyy/MM/dd HH:mm')}
              </p>
            </div>
          </div>
        ))}

        <textarea
          ref={textareaRef}
          style={{
            border: `1px solid ${colors[5]}`,
          }}
          placeholder={t('qa.placeholder')}
          value={newMessage}
          onChange={({ target: { value } }) => setNewMessage(value)}
        />

        <Button
          style={{
            color: colors[3],
            border: `1px solid ${colors[3]}`,
          }}
          onClick={addNewMessage}
          disabled={!newMessage}
        >
          {t('qa.send')}
        </Button>
      </div>
    </div>
  );
});
