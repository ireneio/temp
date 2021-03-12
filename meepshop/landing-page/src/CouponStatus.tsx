// import
import React, { useContext } from 'react';
import moment from 'moment';
import transformColor from 'color';

import {
  Currency as CurrencyContext,
  Colors as ColorsContext,
} from '@meepshop/context';
import { useTranslation } from '@meepshop/locales';

import styles from './styles/couponStatus.less';

// graphql typescript
import { couponStatusFragment } from '@meepshop/types/gqls/meepshop';

// definition
const TIME_FORMAT = 'YYYY/MM/DD';

export default React.memo(
  ({ order }: { order: couponStatusFragment | null }) => {
    const { c } = useContext(CurrencyContext);
    const colors = useContext(ColorsContext);
    const { t } = useTranslation('landing-page');

    if (order?.errorObj) {
      const { code, params: originalParams } = order.errorObj;
      const params = originalParams?.reduce(
        (paramResult, param) => {
          if (!param) return paramResult;
          return {
            ...paramResult,
            [param.name || '']: param.value,
          };
        },
        {} as {
          startTime?: number;
          endTime?: number;
          type?: string;
          condition?: number;
        },
      );

      switch (code) {
        case 4015:
          return (
            <div>{`${t('coupon.this-code-not-exist')}${t(
              'coupon.plz-ask-service-or-delete',
            )}`}</div>
          );

        case 4016: {
          return (
            <div>{`${t('coupon.this-code-activity-period')} ${moment(
              (params?.startTime || 0) * 1000,
            ).format(TIME_FORMAT)}-${moment((params?.endTime || 0) * 1000)
              .subtract(1, 'days')
              .format(TIME_FORMAT)} ${t(
              'coupon.plz-delete-then-checkout',
            )}`}</div>
          );
        }

        case 4017:
          return (
            <div>{`${t('coupon.your-member-group-can-not-use-this-code')}${t(
              'coupon.plz-delete-then-checkout',
            )}`}</div>
          );

        case 4018:
          return (
            <div>{`${t('coupon.this-code-usetimes-full')}${t(
              'coupon.plz-ask-service-or-delete',
            )}`}</div>
          );

        case 4019: {
          if (params?.type === '2')
            return (
              <div>{`${t('coupon.this-code-has-to-buy-specific-products')}${t(
                'coupon.plz-delete-then-checkout',
              )}`}</div>
            );

          return (
            <div>{`${t('coupon.this-code-has-to-satisfy', {
              currency:
                params?.type === '1'
                  ? `${params?.condition || 0}${t('coupon.amount-of-products')}` // TODO: need to remove?
                  : c(params?.condition || 0),
            })}${t('coupon.plz-delete-then-checkout')}`}</div>
          );
        }

        case 4020:
          return (
            <div>{`${t('coupon.this-code-is-the-same')}${t(
              'coupon.plz-delete-then-checkout',
            )}`}</div>
          );

        default:
          return null;
      }
    }

    if (order?.activityInfo) {
      const { activityInfo } = order;
      const couponActivity = activityInfo.find(activity =>
        ['productCoupon', 'orderCoupon'].includes(activity?.plugin || ''),
      );

      if (!couponActivity) return null;

      const { startTime, endTime, rule, unlimitedDate } = couponActivity;
      const [discount] = rule?.discount || [];

      return (
        <div className={styles.root}>
          <div>{`${t('coupon.this-code-can-discount', {
            currency:
              discount?.method === 1
                ? `${discount?.value || ''} %OFF`
                : c(discount?.value || 0),
          })}`}</div>
          <div>
            {unlimitedDate
              ? ''
              : `${t('coupon.activity-period-is')} ${moment(
                  (startTime || 0) * 1000,
                ).format(TIME_FORMAT)}-${moment((endTime || 0) * 1000)
                  .subtract(1, 'days')
                  .format(TIME_FORMAT)}`}
          </div>

          <style
            dangerouslySetInnerHTML={{
              __html: `
              .${styles.root} {
                background: ${transformColor(colors[5]).alpha(0.15)};
                color: ${colors[2]},
              }
            `,
            }}
          />
        </div>
      );
    }

    return null;
  },
);
