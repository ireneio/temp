// import
import uuid from 'uuid/v4';

// definition
export default {
  variant: {
    __typename: 'Variant' as const,
    id: uuid(),
    currentMinPurchasableQty: 0,
    currentMaxPurchasableQty: 50,
  },
};
