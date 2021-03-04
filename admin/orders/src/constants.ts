// typescript import
import { QueryResult } from '@apollo/react-common';

// graphql typescript
import {
  getEcfitList,
  getEcfitListVariables,
} from '@meepshop/types/gqls/admin';

// typescript definition
export type OrdersQueryResult = Pick<
  QueryResult<getEcfitList, getEcfitListVariables>,
  'data' | 'variables' | 'fetchMore' | 'refetch'
>;

// definition
export const ORDERS = [
  {
    key: 'common:orders',
    path: '/orders',
  },
  {
    key: 'orders-ecfit:title',
    path: '/orders/ecfit',
    useIcon: true,
  },
];

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
    '',
    'DATA_ERROR',
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

export const TAGS_KEYS = [
  'orderStatusList',
  'paymentStatusList',
  'paymentIdList',
  'shipmentStatusList',
  'shipmentIdList',
] as const;
