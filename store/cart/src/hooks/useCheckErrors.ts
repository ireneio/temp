// import
import { useState, useCallback } from 'react';

import { useRouter } from '@meepshop/link';

import styles from '../styles/products.less';

// graphql import
import { computedCart_computedCart_ComputedCart_computedLineItems as computedCartComputedCartComputedCartComputedLineItemsType } from '@meepshop/types/gqls/store';

// typescript definition
interface ReturnType {
  hasError: boolean;
  checkErrors: () => void;
}

// definition
export default (
  products: computedCartComputedCartComputedCartComputedLineItemsType[] | null,
): ReturnType => {
  const [hasError, setHasError] = useState(false);
  const { push } = useRouter();

  return {
    hasError,
    checkErrors: useCallback(() => {
      if (
        products?.some(
          product =>
            product.type === 'PRODUCT' && product.status !== 'PURCHASABLE',
        )
      ) {
        setHasError(true);
        const dom = document.querySelector(`.${styles.error}`);
        if (dom) dom.scrollIntoView({ behavior: 'smooth' });
      } else {
        push('/checkout');
      }
    }, [products, push]),
  };
};
