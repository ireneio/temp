// import
import { useState, useCallback } from 'react';

import { useRouter } from '@meepshop/link';

import styles from '../styles/products.less';

// graphql import
import { useProductsColumnsFragment as useProductsColumnsFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface ReturnType {
  hasError: boolean;
  checkErrors: () => void;
}

// definition
export default (
  products: (useProductsColumnsFragmentType | null)[],
): ReturnType => {
  const [hasError, setHasError] = useState(false);
  const { push } = useRouter();

  return {
    hasError,
    checkErrors: useCallback(() => {
      if (
        products.some(product => product?.type === 'product' && product?.error)
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
