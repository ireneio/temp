// import
import { useMemo } from 'react';

import { useTranslation, useGetLanguage } from '@meepshop/locales';

// graphql typescript
import {
  useActivityInfoListFragment as useActivityInfoListFragmentType,
  useActivityInfoListFragment_activityInfo as useActivityInfoListFragmentActivityInfoType,
} from '@meepshop/types/gqls/store';

// definition
export default ({
  activityInfo,
}: useActivityInfoListFragmentType): {
  id: string | null;
  title: string | null;
  discountPrice: number;
}[] => {
  const { t } = useTranslation('member-order');
  const getLanguage = useGetLanguage();

  return useMemo(() => {
    if (!activityInfo) return [];

    const filterActivityInfo = activityInfo.filter(
      Boolean,
    ) as useActivityInfoListFragmentActivityInfoType[];

    return filterActivityInfo.reduce(
      (result, { id, plugin, discountPrice, title }) => {
        // filter
        if (!discountPrice || plugin === 'freeShipping') return result;

        const activity = result.find(
          ({ id: activityId }) => activityId === id,
        ) as { discountPrice: number } | undefined;

        // fisrt add
        if (!activity) {
          switch (plugin) {
            case 'usePoints':
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title: t('sheet.reward'),
                },
              ];
            case 'productCoupon':
            case 'orderCoupon':
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title: t('sheet.coupon'),
                },
              ];
            default:
              return [
                ...result,
                {
                  id,
                  discountPrice,
                  title: getLanguage(title),
                },
              ];
          }
        }

        // count discountPrice
        activity.discountPrice += discountPrice;
        return result;
      },
      [],
    );
  }, [activityInfo, getLanguage, t]);
};
