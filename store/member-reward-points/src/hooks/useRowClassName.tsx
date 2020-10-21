// import
import { useCallback } from 'react';
import moment from 'moment';

import styles from '../styles/useRowClassName.less';

// graphql typescript
import { getUserRewardPotins_getValidUserPointList_data as getUserRewardPotinsGetValidUserPointListDataType } from '../gqls/__generated__/getUserRewardPotins';

// definition
export default (): ((
  record: getUserRewardPotinsGetValidUserPointListDataType,
) => string) =>
  useCallback(
    ({
      points,
      endTime,
    }: getUserRewardPotinsGetValidUserPointListDataType): string => {
      if (
        (endTime && moment().diff(moment.unix(endTime)) > 0) ||
        (points || 0) /** SHOULD_NOT_BE_NULL */ <= 0
      )
        return styles.outdate;

      if (
        endTime &&
        moment()
          .add(1, 'months')
          .diff(moment.unix(endTime)) > 0
      )
        return styles.expireSoon;

      return '';
    },
    [],
  );
