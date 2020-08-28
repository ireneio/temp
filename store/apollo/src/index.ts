// import
import { buildWithApollo } from '@meepshop/apollo';

import * as User from './User';
import * as validatedConvenienceStoreCities from './validatedConvenienceStoreCities';
import * as viewer from './viewer';

// definition
export default buildWithApollo({
  name: 'store',
  resolvers: [
    User.resolvers,
    validatedConvenienceStoreCities.resolvers,
    viewer.resolvers,
  ],
  errorFilter: ({ message }: Error) =>
    message !== '[repository] getOrderWithProductsByIdProtectedScope error',
});
