// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';

import useActivityInfoList from './hooks/useActivityInfoList';
import styles from './styles/totalSheet.less';

// graphql typescript
import {
  totalSheetFragment as totalSheetFragmentType,
  useActivityInfoListFragment as useActivityInfoListFragmentType,
} from '@meepshop/types/gqls/store';

import { useActivityInfoListFragment } from './gqls/useActivityInfoList';

// typescript definition
interface PropsType {
  order: totalSheetFragmentType;
}

// definition
export default React.memo(({ order }: PropsType) => {
  const { priceInfo, activityInfo } = order;
  const { t } = useTranslation('member-order');
  const { c } = useContext(CurrencyContext);

  const productPrice = priceInfo?.productPrice || 0;
  const shipmentFee = priceInfo?.shipmentFee || 0;
  const paymentFee = priceInfo?.paymentFee || 0;
  const adjust = priceInfo?.adjust || 0;
  const total = priceInfo?.total || 0;

  const activityInfoList = useActivityInfoList(
    filter<useActivityInfoListFragmentType>(useActivityInfoListFragment, order),
  );

  return (
    <div className={styles.root}>
      <div>
        <div>{t('sheet.product')}</div>

        <div>{c(productPrice)}</div>
      </div>

      {activityInfoList.map(({ activityId, title, discountPrice }) => (
        // SHOULD_NOT_BE_NULL
        <div key={activityId || 'null id'}>
          <div>{title}</div>
          <div>{c(-1 * discountPrice)}</div>
        </div>
      ))}

      <div>
        <div>{t('sheet.shipment')}</div>
        <div>
          {(activityInfo || []).find(
            activity => activity?.plugin === 'freeShipping',
          )
            ? t('sheet.free-shipment')
            : c(shipmentFee)}
        </div>
      </div>

      {!paymentFee ? null : (
        <div>
          <div>{t('sheet.payment')}</div>
          <div>{`${paymentFee < 0 ? '-' : ''} ${c(Math.abs(paymentFee))}`}</div>
        </div>
      )}

      {!adjust ? null : (
        <div>
          <div>{t('sheet.adjustment')}</div>
          <div>{`${adjust < 0 ? '-' : '+'} ${c(Math.abs(adjust))}`}</div>
        </div>
      )}

      <div className={styles.total}>
        <div>{t('sheet.total')}</div>
        <div>{c(total)}</div>
      </div>
    </div>
  );
});
