// import
import { emptyFunction } from 'fbjs';

// definition
export default {
  loading: false,
  pagination: {
    total: 0,
    current: 0,
    pageSize: 10,
    pageSizeOptions: ['10', '20', '50', '100', '500'],
    onChange: emptyFunction,
  },
  columns: [],
  dataSource: [],
  locale: { emptyText: '無重新導向資料' },
};
