// import
import { buildWithApollo } from '@meepshop/apollo';

import * as User from './User';
import * as Order from './Order';
import * as productsObjectType from './productsObjectType';
import * as validatedConvenienceStoreCities from './validatedConvenienceStoreCities';
import * as createOrderApplyWithOrder from './createOrderApplyWithOrder';

// definition
export default buildWithApollo({
  name: 'store',
  resolvers: [
    User.resolvers,
    Order.resolvers,
    productsObjectType.resolvers,
    validatedConvenienceStoreCities.resolvers,
    createOrderApplyWithOrder.resolvers,
  ],
  errorFilter: ({ message }: Error) =>
    message !== '[repository] getOrderWithProductsByIdProtectedScope error',
});
