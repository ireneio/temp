// graphql typescript
import { QueryResult } from 'react-apollo';

import {
  getEcfitList,
  getEcfitListVariables,
} from './__generated__/getEcfitList';

// typescript definition
export type getEcfitListQueryPropsType = QueryResult<
  getEcfitList,
  getEcfitListVariables
>;

// definition
export const STATUS_LIST = {
  orderStatusList: ['PROCESSING', 'CLOSED', 'CANCELED', 'RETURN'],
  paymentStatusList: [
    'WAITING',
    'NOTIFICATED',
    'RECONCILED',
    'DATA_ERROR',
    'FAILED',
    'REFUND',
  ],
  shipmentStatusList: [
    'NOT_YET',
    'PREPARING',
    'OUT_OF_STOCK',
    'SHIPPED',
    'PRE_ORDER',
    'EXCHANGE',
    'RETURN',
  ],
};

export const ADVANCED_SEARCH_ITEMS: {
  optionsKey:
    | 'orderStatusList'
    | 'paymentStatusList'
    | 'paymentIdList'
    | 'shipmentStatusList'
    | 'shipmentIdList'
    | 'divider';
  options?: string[];
}[] = [
  {
    optionsKey: 'orderStatusList',
    options: STATUS_LIST.orderStatusList,
  },
  {
    optionsKey: 'divider',
  },
  {
    optionsKey: 'paymentStatusList',
    options: STATUS_LIST.paymentStatusList,
  },
  {
    optionsKey: 'paymentIdList',
  },
  {
    optionsKey: 'divider',
  },
  {
    optionsKey: 'shipmentStatusList',
    options: STATUS_LIST.shipmentStatusList,
  },
  {
    optionsKey: 'shipmentIdList',
  },
];

export const TAGS_KEYS: [
  'orderStatusList',
  'paymentStatusList',
  'paymentIdList',
  'shipmentStatusList',
  'shipmentIdList'
] = [
  'orderStatusList',
  'paymentStatusList',
  'paymentIdList',
  'shipmentStatusList',
  'shipmentIdList',
];
