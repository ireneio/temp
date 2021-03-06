// typescript import
import { CurrencyType } from '@meepshop/context';

// import
import { useCallback } from 'react';
import fx from 'money';

import { format } from '@meepshop/context/lib/Currency';

// graphql typescript
import { useFormatFragment as useFormatFragmentType } from '@meepshop/types/gqls/store';

// definition
export default (
  customerCurrency: string,
  store: useFormatFragmentType | null,
): CurrencyType['c'] =>
  useCallback(
    (price: number) => {
      const storeCurrency = store?.currency || 'TWD';

      return format(
        customerCurrency,
        fx(price)
          .from(storeCurrency)
          .to(customerCurrency),
      );
    },
    [customerCurrency, store],
  );
