// import
import { useMemo } from 'react';

// graphql typescript
import {
  useActivitiesFragment as useActivitiesFragmentType,
  useActivitiesFragment_activityInfo as useActivitiesFragmentActivityInfoType,
} from '@meepshop/types/gqls/store';

// definition
export default (
  order: useActivitiesFragmentType,
): useActivitiesFragmentActivityInfoType[] =>
  useMemo(
    () =>
      (order?.activityInfo || []).reduce((result, activity) => {
        if (!activity) return result;

        const { id, plugin, discountPrice } = activity;

        if (plugin === 'freeShipping') return result;

        const existActivity = result.find(
          ({ id: activityId }) => activityId === id,
        );

        if (existActivity) {
          const newDiscountPrice =
            (existActivity.discountPrice || 0) + (discountPrice || 0);

          existActivity.discountPrice = newDiscountPrice;

          return result;
        }

        return [...result, activity];
      }, [] as useActivitiesFragmentActivityInfoType[]),
    [order],
  );
