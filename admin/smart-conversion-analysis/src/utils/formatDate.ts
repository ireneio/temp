// import
import { format } from 'date-fns';

import setTimezone from '@admin/utils/lib/setTimezone';

// definition
export default (date: string | Date, timezone: number): string =>
  format(setTimezone(date, timezone), 'yyyy/MM/dd HH:mm');
