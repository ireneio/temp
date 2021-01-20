// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { List } from 'antd';
import moment from 'moment';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { Currency as CurrencyContext } from '@meepshop/context';
import { HistoryDotIcon } from '@meepshop/icons';

import Detail from './Detail';
import styles from './styles/record.less';

// graphql typescript
import { recordFragment } from '@meepshop/types/gqls/admin';

// graphql import
import { detailFragment } from './gqls/detail';

// typescript definition
interface PropsType {
  orderHistoryRecord: recordFragment;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

// definition
const { Item } = List;

export default React.memo(
  ({ orderHistoryRecord, isOpened, setIsOpened }: PropsType) => {
    const { createdAt, actor, orderTotalAmountDelta } = orderHistoryRecord;
    const { t } = useTranslation('order-history-records');
    const { c } = useContext(CurrencyContext);

    return (
      <Item className={styles.root}>
        <div>
          <div>{moment(createdAt).format('YYYY/MM/DD')}</div>

          <div className={styles.time}>
            {moment(createdAt).format('hh:mm:ss')}
          </div>
        </div>

        <div className={styles.border}>
          <HistoryDotIcon />

          <div />
        </div>

        <div className={styles.detail}>
          <div>
            {t('total-changed')}

            <span className={styles.before}>
              {c(orderTotalAmountDelta.before)}
            </span>

            {' ＞ '}

            {c(orderTotalAmountDelta.after)}

            <span
              className={styles.action}
              onClick={() => setIsOpened(!isOpened)}
            >
              {t(!isOpened ? 'detail.open' : 'detail.close')}
            </span>
          </div>

          <div className={styles.actor}>
            {actor.type === 'MERCHANT'
              ? t('merchant')
              : actor.name || actor.email}
          </div>

          {!isOpened ? null : (
            <Detail
              orderHistoryRecord={filter(detailFragment, orderHistoryRecord)}
            />
          )}
        </div>
      </Item>
    );
  },
);
