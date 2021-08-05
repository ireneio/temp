// import
import {
  sub,
  startOfToday,
  endOfToday,
  startOfYesterday,
  endOfYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfDay,
} from 'date-fns';

import { DATE_TYPE } from '../constants';

// typescript definition
type ValueType = [Date, Date];

// definition
export default (key: typeof DATE_TYPE[number]): ValueType =>
  ({
    today: [startOfToday(), endOfToday()],
    yesterday: [startOfYesterday(), endOfYesterday()],
    lastWeek: [
      startOfWeek(sub(new Date(), { weeks: 1 })),
      endOfWeek(sub(new Date(), { weeks: 1 })),
    ],
    lastMonth: [
      startOfMonth(sub(new Date(), { months: 1 })),
      endOfMonth(sub(new Date(), { months: 1 })),
    ],
    last7Days: [startOfDay(sub(new Date(), { days: 6 })), endOfToday()],
    last30Days: [startOfDay(sub(new Date(), { days: 29 })), endOfToday()],
    custom: [startOfToday(), endOfToday()],
  }[key] as ValueType);
