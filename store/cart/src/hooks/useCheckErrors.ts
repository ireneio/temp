// import
import { useState, useCallback, useMemo } from 'react';

import { useRouter } from '@meepshop/link';

import alertStyles from '../styles/alert.less';
import productsStyles from '../styles/products.less';

// graphql typescript
import { useCheckErrorsFragment as useCheckErrorsFragmentType } from '@meepshop/types/gqls/store';

// typescript definition
interface PropsType {
  lineItems: useCheckErrorsFragmentType[];
}
interface ReturnType {
  hasError: boolean;
  isUpsellingOverLimit: boolean;
  isOnlyUpselling: boolean;
  checkErrors: () => void;
}

// definition
export default ({ lineItems }: PropsType): ReturnType => {
  const [hasError, setHasError] = useState(false);
  const { push } = useRouter();
  const isUpsellingOverLimit = useMemo(
    () => lineItems.some(item => item?.status === 'EXCEED_LIMIT_PER_ORDER'),
    [lineItems],
  );
  const isOnlyUpselling = useMemo(
    () =>
      lineItems.length > 0 && !lineItems.some(item => item?.type === 'PRODUCT'),
    [lineItems],
  );

  return {
    hasError,
    isUpsellingOverLimit,
    isOnlyUpselling,
    checkErrors: useCallback(() => {
      if (isUpsellingOverLimit || isOnlyUpselling) {
        setHasError(true);
        const dom = document.querySelector(`.${alertStyles.error}`);
        if (dom) dom.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (
        lineItems.some(
          lineItem =>
            lineItem.type !== 'GIFT' && lineItem.status !== 'PURCHASABLE',
        )
      ) {
        setHasError(true);
        const dom = document.querySelector(`.${productsStyles.error}`);
        if (dom) dom.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      push('/checkout');
    }, [isOnlyUpselling, isUpsellingOverLimit, lineItems, push]),
  };
};
