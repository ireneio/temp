// import
import { HttpLink } from '@apollo/client';

import { buildWithApollo } from '@meepshop/apollo';

import * as applyForReturnOrExchangeWithOrder from './applyForReturnOrExchangeWithOrder';
import * as Order from './Order';
import * as productsObjectType from './productsObjectType';

// definition
export const resolvers = [
  applyForReturnOrExchangeWithOrder.resolvers,
  Order.resolvers,
  productsObjectType.resolvers,
];

export default buildWithApollo({
  name: 'store',
  resolvers,
  terminatingLink: new HttpLink(),
  errorFilter: ({ message }: Error) =>
    message !== '[repository] getOrderWithProductsByIdProtectedScope error',
});
