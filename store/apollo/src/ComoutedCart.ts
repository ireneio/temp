// graphql typescript
import {
  computedCartLineItemFragment as computedCartLineItemFragmentType,
  computedCartLineItemFragment_discountAllocations as productDiscountType,
} from '@meepshop/types/gqls/store';

// definition
export const resolvers = {
  ComputedCart: {
    productActivity: ({
      computedLineItems,
    }: {
      computedLineItems: (computedCartLineItemFragmentType | null)[];
    }): productDiscountType[] =>
      computedLineItems.reduce(
        (result, item) =>
          [...result, ...(item?.discountAllocations || [])].reduce(
            (subResult, discount) => {
              if (!discount) return subResult;

              const index = subResult.findIndex(
                r => r.activityId === discount.activityId || '',
              );
              if (index === -1) return [...subResult, discount];

              const newSubResult = [...subResult];

              newSubResult[index] = {
                ...newSubResult[index],
                discountPrice:
                  (newSubResult[index]?.discountPrice || 0) +
                  (discount.discountPrice || 0),
              };

              return newSubResult;
            },
            [] as productDiscountType[],
          ),
        [] as productDiscountType[],
      ),
  },
};
