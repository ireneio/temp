// import
import React, { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Spin, Icon } from 'antd';
import { emptyFunction } from 'fbjs';

import { Currency as CurrencyContext } from '@meepshop/context';
import { format } from '@meepshop/context/lib/Currency';

// graphql typescript
import { getAdminCurrency as getAdminCurrencyType } from '@meepshop/types/gqls/admin';

// graphql import
import { getAdminCurrency } from './gqls';

// definition
export default React.memo(({ children }) => {
  const { data } = useQuery<getAdminCurrencyType>(getAdminCurrency);
  const currency = useMemo(() => data?.viewer?.store?.currency || 'TWD', [
    data,
  ]);
  const c = useCallback((price: number) => format(currency, price), [currency]);

  if (!data) return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <CurrencyContext.Provider
      value={{ c, setCurrency: emptyFunction, currency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
});
