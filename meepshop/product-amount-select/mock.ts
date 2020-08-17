// import
import uuid from 'uuid/v4';

// graphql typescript
import { PropsType } from './src';

// definition
export default {
  variant: {
    __typename: 'Variant',
    id: uuid(),
    minPurchaseItems: 0,
    maxPurchaseLimit: 50,
    stock: 100,
  },
} as PropsType;
