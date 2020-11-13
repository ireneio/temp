// typescript import
import { PropsType as DataPickerPropsType } from '@admin/date-picker';

import { getEcfitListQueryPropsType } from '../constants';

// import
import { useMemo, useCallback } from 'react';
import moment from 'moment';

// definition
export default ({
  refetch,
  variables,
}: Pick<getEcfitListQueryPropsType, 'variables' | 'refetch'>): {
  datepickerValue: [moment.Moment, moment.Moment] | undefined;
  changeDatePicker: (timeRange: DataPickerPropsType['value']) => void;
} => ({
  datepickerValue: useMemo(() => {
    const {
      start = undefined,
      end = undefined,
    }: {
      start?: number;
      end?: number;
    } = variables?.filter?.timeRange || {};

    return !start || !end ? undefined : [moment.unix(start), moment.unix(end)];
  }, [variables]),
  changeDatePicker: useCallback(
    (timeRange: DataPickerPropsType['value']) => {
      const [start = undefined, end = undefined] = timeRange || [];

      refetch({
        ...variables,
        filter: {
          ...variables.filter,
          timeRange:
            !start || !end
              ? undefined
              : {
                  start: moment(start).format('X'),
                  end: moment(end).format('X'),
                },
        },
      });
    },
    [refetch, variables],
  ),
});
