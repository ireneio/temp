// import
import { useContext, useCallback } from 'react';
import { format, subDays } from 'date-fns';

import { useTranslation } from '@meepshop/locales';
import { Currency as CurrencyContext } from '@meepshop/context';

// graphql typescript
import { useCouponValidatorFragment as useCouponValidatorFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  errorObj: useCouponValidatorFragmentType | null,
): (() => void) => {
  const { t } = useTranslation('checkout');
  const { c } = useContext(CurrencyContext);

  return useCallback(async () => {
    const { code, params } = errorObj || {};

    const errorReason = (params || []).reduce(
      (result, param) => ({
        ...result,
        ...(param?.name ? { [param.name]: param.value } : {}),
      }),
      {
        startTime: 0,
        endTime: 0,
        type: '',
        condition: 0,
      },
    );

    switch (code) {
      case 4015:
        throw new Error(
          `${t('coupon.this-code-not-exist')}${t(
            'coupon.plz-ask-service-or-delete',
          )}`,
        );

      case 4016:
        throw new Error(`${t('coupon.this-code-activity-period')} ${format(
          new Date(errorReason.startTime * 1000),
          'yyyy/MM/dd',
        )}-${format(
          subDays(new Date(errorReason.endTime * 1000), 1),
          'yyyy/MM/dd',
        )}
          ${t('coupon.plz-delete-then-checkout')}`);

      case 4017:
        throw new Error(
          `${t('coupon.your-member-group-can-not-use-this-code')}${t(
            'coupon.plz-delete-then-checkout',
          )}`,
        );

      case 4018:
        throw new Error(
          `${t('coupon.this-code-usetimes-full')}${t(
            'coupon.plz-ask-service-or-delete',
          )}`,
        );

      case 4019:
        if (errorReason.type === '2')
          throw new Error(
            `${t('coupon.this-code-has-to-buy-specific-products')}${t(
              'coupon.plz-delete-then-checkout',
            )}`,
          );

        throw new Error(
          `${t('coupon.this-code-has-to-satisfy', {
            currency:
              errorReason.type === '1'
                ? `${errorReason.condition}${t('coupon.amount-of-products')}`
                : c(errorReason.condition),
          })}${t('coupon.plz-delete-then-checkout')}`,
        );

      case 4020:
        throw new Error(
          `${t('coupon.this-code-is-the-same')}${t(
            'coupon.plz-delete-then-checkout',
          )}`,
        );

      default:
        break;
    }
  }, [t, c, errorObj]);
};
