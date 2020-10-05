// import
import { buildWithApollo } from '@meepshop/apollo';

import * as createOrderApplyWithOrder from './createOrderApplyWithOrder';
import * as Order from './Order';
import * as productsObjectType from './productsObjectType';
import * as UpdateShopperInfoResponse from './UpdateShopperInfoResponse';
import * as User from './User';
import * as validatedConvenienceStoreCities from './validatedConvenienceStoreCities';

// definition
export default buildWithApollo({
  name: 'store',
  resolvers: [
    createOrderApplyWithOrder.resolvers,
    Order.resolvers,
    productsObjectType.resolvers,
    UpdateShopperInfoResponse.resolvers,
    User.resolvers,
    validatedConvenienceStoreCities.resolvers,
  ],
  errorFilter: ({ message }: Error) =>
    message !== '[repository] getOrderWithProductsByIdProtectedScope error',
});
