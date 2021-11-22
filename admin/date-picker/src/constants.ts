// typescript definition
export type DateType =
  | 'today'
  | 'yesterday'
  | 'lastWeek'
  | 'lastMonth'
  | 'last7Days'
  | 'last30Days'
  | 'custom';

// definition
export const DATE_TYPE: DateType[] = [
  'today',
  'yesterday',
  'lastWeek',
  'lastMonth',
  'last7Days',
  'last30Days',
  'custom',
];
