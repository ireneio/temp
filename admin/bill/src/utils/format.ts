// import
import { format, parse } from 'date-fns';

import { format as currencyFormat } from '@meepshop/context/lib/Currency';

// definition
export const formatMonth = (value: string | undefined | null): string =>
  !value ? '' : format(parse(value, 'yyyyMM', new Date()), 'yyyy.MM');

export const formatMoney = (
  value: number | undefined | null,
  isTWD?: boolean,
): string => currencyFormat(isTWD ? 'TWD' : 'USD', value || 0).split(' ')[1];
