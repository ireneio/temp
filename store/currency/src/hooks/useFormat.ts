// typescript import
import { CurrencyType } from '@meepshop/context';

// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import fx from 'money';

import { format } from '@meepshop/context/lib/Currency';

// graphql typescript
import { useFormatFragment as useFormatFragmentType } from './__generated__/useFormatFragment';

// definition
export const useFormatFragment = gql`
  fragment useFormatFragment on Store {
    id
    currency
  }
`;

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
