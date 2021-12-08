// import
import { buildWithApollo } from '@meepshop/apollo';

import * as applyForReturnOrExchangeWithOrder from './applyForReturnOrExchangeWithOrder';
import * as Order from './Order';
import * as productsObjectType from './productsObjectType';
import * as UpdateShopperInfoResponse from './UpdateShopperInfoResponse';
import * as User from './User';

// definition
export default buildWithApollo({
  name: 'store',
  resolvers: [
    applyForReturnOrExchangeWithOrder.resolvers,
    Order.resolvers,
    productsObjectType.resolvers,
    UpdateShopperInfoResponse.resolvers,
    User.resolvers,
  ],
  errorFilter: ({ message }: Error) =>
    message !== '[repository] getOrderWithProductsByIdProtectedScope error',
});
