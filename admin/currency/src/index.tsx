// import
import React, { useMemo, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
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
  const c = useCallback(
    (price: number, disableSymbol?: boolean) =>
      format(currency, price, disableSymbol),
    [currency],
  );

  if (!data) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <CurrencyContext.Provider
      value={{ c, setCurrency: emptyFunction, currency }}
    >
      {children}
    </CurrencyContext.Provider>
  );
});
