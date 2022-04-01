// import
import React, { useState, useContext, useRef, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { Currency as CurrencyContext } from '@meepshop/context';
import { defaultCurrency } from '@meepshop/context/lib/Currency';
import CookiesContext from '@meepshop/cookies';
import filter from '@meepshop/utils/lib/filter';

import useInitFx from './hooks/useInitFx';
import useFormat from './hooks/useFormat';

// graphql typescript
import { getStoreCurrency as getStoreCurrencyType } from '@meepshop/types/gqls/store';

// graphql import
import { getStoreCurrency } from './gqls';
import { useInitFxFragment } from './gqls/useInitFx';
import { useFormatFragment } from './gqls/useFormat';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
export default React.memo(({ children }: PropsType) => {
  const { cookies, setCookie } = useContext(CookiesContext);
  const { loading, error, data } = useQuery<getStoreCurrencyType>(
    getStoreCurrency,
  );
  const prevCookiesCurrencyRef = useRef(cookies.currency);
  const [currency, setCurrency] = useState<string>(
    cookies.currency || defaultCurrency,
  );
  const c = useFormat(
    currency,
    filter(useFormatFragment, data?.viewer?.store || null),
  );
  const value = useMemo(
    () => ({
      c,
      setCurrency: (newCurrency: string) => {
        setCurrency(newCurrency);
        setCookie('currency', newCurrency);
      },
      currency,
    }),
    [c, currency, setCookie],
  );

  useInitFx(filter(useInitFxFragment, data?.exchangeRateService || null));
  useEffect(() => {
    if (cookies.currency && prevCookiesCurrencyRef.current !== cookies.currency)
      setCurrency(cookies.currency || defaultCurrency);

    prevCookiesCurrencyRef.current = cookies.currency;
  }, [cookies]);

  if (loading || error) return <Spin indicator={<LoadingOutlined spin />} />;

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
});
