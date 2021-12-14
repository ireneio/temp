// import
import { useMemo } from 'react';

// graphql typescript
import {
  useCheckLimitActiveUpsellingAreaFragment as useCheckLimitActiveUpsellingAreaFragmentType,
  useCheckLimitLineItemFragment as useCheckLimitLineItemFragmentType,
} from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  upselling: useCheckLimitActiveUpsellingAreaFragmentType;
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
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore FIXME: wait for schema
          item?.type === 'UPSELLING' ? prev + item.quantity : prev,
        0,
      ),
    [cartItems],
  );
  return {
    isOverLimit:
      upselling.hasLimitPerOrder &&
      upsellingQuantityInCart >= (upselling.limitPerOrder || 0),
    isWithProducts: useMemo(
      () => cartItems.some(item => item?.type === 'PRODUCT'),
      [cartItems],
    ),
  };
};
