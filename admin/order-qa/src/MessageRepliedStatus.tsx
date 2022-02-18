// import
import React from 'react';
import { Button } from 'antd';

import { useTranslation } from '@meepshop/locales';

import useSetOrderMessageReplied from './hooks/useSetOrderMessageReplied';
import styles from './styles/messageRepliedStatus.less';

// definition
export default React.memo(
  ({
    orderId,
    messageReplied,
  }: {
    orderId: string;
    messageReplied?: boolean | null;
  }) => {
    const { t } = useTranslation('order-qa');
    const setOrderMessageReplied = useSetOrderMessageReplied(orderId);

    switch (messageReplied) {
      case true:
        return <div className={styles.replied}>{t('replied')}</div>;
      case false:
        return (
          <Button className={styles.markReply} onClick={setOrderMessageReplied}>
            {t('mark-reply')}
          </Button>
        );
      default:
        return null;
    }
  },
);
