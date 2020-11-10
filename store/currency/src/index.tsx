// import
import React, { useState, useContext, useRef, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';

import { Currency as CurrencyContext } from '@meepshop/context';
import { defaultCurrency } from '@meepshop/context/lib/Currency';
import CookiesContext from '@meepshop/cookies';

import useInitFx from './hooks/useInitFx';
import useFormat from './hooks/useFormat';

// graphql typescript
import { getStoreCurrency } from './__generated__/getStoreCurrency';

// graphql import
import { useInitFxFragment } from './hooks/useInitFx';
import { useFormatFragment } from './hooks/useFormat';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
const query = gql`
  query getStoreCurrency {
    viewer {
      id
      store {
        id
        ...useFormatFragment
      }
    }

    exchangeRateService {
      ...useInitFxFragment
    }
  }

  ${useFormatFragment}
  ${useInitFxFragment}
`;

export default React.memo(({ children }: PropsType) => {
  const { cookies, setCookie } = useContext(CookiesContext);
  const { loading, error, data } = useQuery<getStoreCurrency>(query);
  const prevCookiesCurrencyRef = useRef(cookies.currency);
  const [currency, setCurrency] = useState<string>(
    cookies.currency || defaultCurrency,
  );
  const c = useFormat(
    currency,
    filter(useFormatFragment, data?.viewer?.store || null),
  );

  useInitFx(filter(useInitFxFragment, data?.exchangeRateService || null));
  useEffect(() => {
    if (cookies.currency && prevCookiesCurrencyRef.current !== cookies.currency)
      setCurrency(cookies.currency || defaultCurrency);

    prevCookiesCurrencyRef.current = cookies.currency;
  }, [cookies]);

  if (loading || error)
    return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <CurrencyContext.Provider
      value={{
        c,
        setCurrency: newCurrency => {
          setCurrency(newCurrency);
          setCookie('currency', newCurrency);
        },
        currency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
});
