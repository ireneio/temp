// typescript import
import { PropsType as DataPickerPropsType } from '@admin/date-picker';

import { OrdersQueryResult } from '../constants';

// import
import { useMemo, useCallback } from 'react';
import moment from 'moment';

// definition
export default ({
  refetch,
  variables,
}: Pick<OrdersQueryResult, 'variables' | 'refetch'>): {
  datepickerValue: [moment.Moment, moment.Moment] | undefined;
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

    return !start || !end ? undefined : [moment(start), moment(end)];
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
                  start: start.format(),
                  end: end.format(),
                },
        },
      });
    },
    [refetch, variables],
  ),
});
