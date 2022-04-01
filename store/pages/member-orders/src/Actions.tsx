// import
import React, { useContext } from 'react';

import { useTranslation } from '@meepshop/locales';
import { Apps as AppsContext } from '@meepshop/context';
import Link from '@meepshop/link';
import filter from '@meepshop/utils/lib/filter';

import styles from './styles/actions.less';
import usePayOrderAgain from './hooks/usePayOrderAgain';

// graphql typescript
import { actionsFragment as actionsFragmentType } from '@meepshop/types/gqls/store';

// graphql import
import { usePayOrderAgainFragment } from './gqls/usePayOrderAgain';

// typescript definition
interface PropsType {
  order: actionsFragmentType;
}

// definition
export default React.memo(
  ({
    order: {
      id,
      status,
      isAvailableForPayLater,
      isAvailableForOrderApply,
      isOrderApplied,
      paymentInfo,
      shipmentInfo,
      choosePayLaterWhenPlaced,
    },
  }: PropsType) => {
    const { t } = useTranslation('member-orders');
    const apps = useContext(AppsContext);
    const payOrderAgain = usePayOrderAgain(
      filter(usePayOrderAgainFragment, {
        __typename: 'Order',
        id,
        paymentInfo,
      }),
    );

    const isSkipOtherAction = ![0, 3].includes(status === null ? -1 : status); // SHOULD_NOT_BE_NULL

    // SHOULD_NOT_BE_NULL
    const template = paymentInfo?.list?.[0]?.template;
    return (
      <div className={styles.root}>
        {!choosePayLaterWhenPlaced ||
        isSkipOtherAction ||
        !isAvailableForPayLater ||
        (paymentInfo || { status: -1 }).status !== 0 ? null : (
          <div onClick={() => payOrderAgain()}>{t('pay-again.title')}</div>
        )}

        {!isOrderApplied ? null : (
          <Link href={`/orderApplyList/${id}`}>
            <a href={`/orderApplyList/${id}`}>{t('order.apply-list')}</a>
          </Link>
        )}

        {isSkipOtherAction ||
        (shipmentInfo || { status: -1 }).status !== 3 ? null : (
          <>
            {!isAvailableForOrderApply ? null : (
              <>
                {!apps.returnOrder.isInstalled ? null : (
                  <Link href={`/orderRefund/${id}`}>
                    <a href={`/orderRefund/${id}`}>{t('order.return')}</a>
                  </Link>
                )}

                {!apps.replacement.isInstalled ? null : (
                  <Link href={`/orderExchange/${id}`}>
                    <a href={`/orderExchange/${id}`}>{t('order.replace')}</a>
                  </Link>
                )}
              </>
            )}
          </>
        )}

        {isSkipOtherAction ||
        (paymentInfo || { status: -1 }).status === 2 ||
        template !== 'custom' ? null : (
          <Link href={`/payNotify/${id}`}>
            <a href={`/payNotify/${id}`}>{t('order.pay-notify')}</a>
          </Link>
        )}

        <Link href={`/order/${id}#qa`}>
          <a href={`/order/${id}#qa`}>{t('order.qa')}</a>
        </Link>
      </div>
    );
  },
);
