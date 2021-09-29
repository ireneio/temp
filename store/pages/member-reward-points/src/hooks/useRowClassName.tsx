// import
import { useCallback } from 'react';
import { differenceInSeconds, addMonths } from 'date-fns';

import styles from '../styles/useRowClassName.less';

// graphql typescript
import { getUserRewardPotins_getValidUserPointList_data as getUserRewardPotinsGetValidUserPointListDataType } from '@meepshop/types/gqls/store';

// definition
export default (): ((
  record: getUserRewardPotinsGetValidUserPointListDataType,
) => string) =>
  useCallback(
    ({
      points,
      endAt,
    }: getUserRewardPotinsGetValidUserPointListDataType): string => {
      if (
        (endAt && differenceInSeconds(new Date(), new Date(endAt)) > 0) ||
        (points || 0) /** SHOULD_NOT_BE_NULL */ <= 0
      )
        return styles.outdate;

      if (
        endAt &&
        differenceInSeconds(addMonths(new Date(), 1), new Date(endAt)) > 0
      )
        return styles.expireSoon;

      return '';
    },
    [],
  );
