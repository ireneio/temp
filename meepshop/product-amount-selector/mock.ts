// import
import uuid from 'uuid/v4';

// definition
export default {
  variant: {
    __typename: 'Variant' as const,
    id: uuid(),
    minPurchaseItems: 0,
    maxPurchaseLimit: 50,
    stock: 100,
  },
};
