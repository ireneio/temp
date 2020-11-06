// import
import moment from 'moment';

import { DATE_TYPE } from '../constants';

// typescript definition
type ValueType = [moment.Moment, moment.Moment];

// definition
export default (key: typeof DATE_TYPE[number]): ValueType =>
  ({
    today: [moment().startOf('day'), moment().endOf('day')],
    yesterday: [
      moment()
        .subtract(1, 'days')
        .startOf('day'),
      moment()
        .subtract(1, 'days')
        .endOf('day'),
    ],
    lastWeek: [
      moment()
        .subtract(1, 'weeks')
        .startOf('week')
        .startOf('day'),
      moment()
        .subtract(1, 'weeks')
        .endOf('week')
        .endOf('day'),
    ],
    lastMonth: [
      moment()
        .subtract(1, 'months')
        .startOf('month')
        .startOf('day'),
      moment()
        .subtract(1, 'months')
        .endOf('month')
        .endOf('day'),
    ],
    last7Days: [
      moment()
        .subtract(6, 'days')
        .startOf('day'),
      moment().endOf('day'),
    ],
    last30Days: [
      moment()
        .subtract(29, 'days')
        .startOf('day'),
      moment().endOf('day'),
    ],
    custom: [moment().startOf('day'), moment().endOf('day')],
  }[key] as ValueType);
