// import
import { useContext, useMemo } from 'react';
import { format, subDays } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useCouponInfoFragment as useCouponInfoFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  activityInfo: (useCouponInfoFragmentType | null)[] | null,
): { discount: string; period: string } | null => {
  const { t } = useTranslation('checkout');
  const { c } = useContext(CurrencyContext);

  const activity = activityInfo?.find(data =>
    ['productCoupon', 'orderCoupon'].includes(data?.plugin || ''),
  );

  return useMemo(() => {
    if (!activity) return null;

    const { method, value } = activity.rule?.discount?.[0] || {};

    return {
      discount: `${t('coupon.this-code-can-discount', {
        currency: method === 1 ? `${value} %OFF` : c(value || 0),
      })}`,
      period: activity.unlimitedDate
        ? ''
        : `${t('coupon.activity-period-is')} ${format(
            new Date((activity.startTime || 0) * 1000),
            'yyyy/MM/dd',
          )}
          -${format(
            subDays(new Date((activity.endTime || 0) * 1000), 1),
            'yyyy/MM/dd',
          )}`,
    };
  }, [activity, t, c]);
};
