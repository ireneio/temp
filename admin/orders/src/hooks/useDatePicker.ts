// typescript import
import { PropsType as DataPickerPropsType } from '@admin/date-picker';

import { OrdersQueryResult } from '../constants';

// import
import { useMemo, useCallback } from 'react';
import { formatRFC3339 } from 'date-fns';

// definition
export default ({
  refetch,
  variables,
}: Pick<OrdersQueryResult, 'variables' | 'refetch'>): {
  datepickerValue: [Date, Date] | undefined;
  changeDatePicker: (createdAtRange: DataPickerPropsType['value']) => void;
} => ({
  datepickerValue: useMemo(() => {
    const {
      start = undefined,
      end = undefined,
    }: {
      start?: number;
      end?: number;
    } = variables?.filter?.createdAtRange || {};

    return !start || !end ? undefined : [new Date(start), new Date(end)];
  }, [variables]),
  changeDatePicker: useCallback(
    (createdAtRange: DataPickerPropsType['value']) => {
      const [start = undefined, end = undefined] = createdAtRange || [];

      refetch({
        ...variables,
        filter: {
          ...variables.filter,
          createdAtRange:
            !start || !end
              ? undefined
              : {
                  start: formatRFC3339(start),
                  end: formatRFC3339(end),
                },
        },
      });
    },
    [refetch, variables],
  ),
});
