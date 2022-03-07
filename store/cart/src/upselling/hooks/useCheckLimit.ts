// import
import { useMemo } from 'react';

// graphql typescript
import {
  useCheckLimitActiveUpsellingAreaFragment as useCheckLimitActiveUpsellingAreaFragmentType,
  useCheckLimitLineItemFragment as useCheckLimitLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  upselling: useCheckLimitActiveUpsellingAreaFragmentType | null;
  cartItems: (useCheckLimitLineItemFragmentType | null)[];
}

interface ReturnType {
  isOverLimit: boolean;
  isWithProducts: boolean;
}

// definition
export default ({ upselling, cartItems }: PropsType): ReturnType => {
  const upsellingQuantityInCart = useMemo(
    () =>
      cartItems.reduce(
        (prev, item) =>
          item?.type === 'UPSELLING_PRODUCT'
            ? prev + (item.quantity || 0)
            : prev,
        0,
      ),
    [cartItems],
  );
  return {
    isOverLimit:
      Boolean(upselling?.hasLimitPerOrder) &&
      upsellingQuantityInCart >= (upselling?.limitPerOrder || 0),
    isWithProducts: useMemo(
      () => cartItems.some(item => item?.type === 'PRODUCT'),
      [cartItems],
    ),
  };
};
