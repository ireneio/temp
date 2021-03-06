// import
import React, { useContext } from 'react';
import { List } from 'antd';
import { format } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';
import { HistoryDotIcon } from '@meepshop/icons';
import filter from '@meepshop/utils/lib/filter';

import Detail from './Detail';
import styles from './styles/record.less';

// graphql typescript
import { recordFragment as recordFragmentType } from '@meepshop/types/gqls/admin';

// graphql import
import { detailFragment } from './gqls/detail';

// typescript definition
interface PropsType {
  orderHistoryRecord: recordFragmentType;
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
}

// definition
const { Item } = List;

export default React.memo(
  ({ orderHistoryRecord, isOpened, setIsOpened }: PropsType) => {
    const { createdAt, operator, totalAmountDelta } = orderHistoryRecord;
    const { t } = useTranslation('order-history-records');
    const { c } = useContext(CurrencyContext);

    return (
      <Item className={styles.root}>
        <div>
          <div>{format(new Date(createdAt), 'yyyy/MM/dd')}</div>

          <div className={styles.time}>
            {format(new Date(createdAt), 'HH:mm:ss')}
          </div>
        </div>

        <div className={styles.border}>
          <HistoryDotIcon />

          <div />
        </div>

        <div className={styles.detail}>
          <div>
            {t('total-changed')}

            <span className={styles.before}>{c(totalAmountDelta.before)}</span>

            {' ＞ '}

            {c(totalAmountDelta.after)}

            <span
              className={styles.action}
              onClick={() => setIsOpened(!isOpened)}
            >
              {t(!isOpened ? 'detail.open' : 'detail.close')}
            </span>
          </div>

          <div className={styles.operator}>
            {operator.type === 'MERCHANT'
              ? t('merchant')
              : operator.name || operator.email}
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
