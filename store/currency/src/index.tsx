// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Spin, Icon } from 'antd';

import { Currency as CurrencyContext } from '@meepshop/context';

import useInitFx from './hooks/useInitFx';
import useFormat from './hooks/useFormat';

// graphql typescript
import { getStoreCurrency } from './__generated__/getStoreCurrency';

// graphql import
import { useInitFxFragment } from './hooks/useInitFx';
import { useFormatFragment } from './hooks/useFormat';

// typescript definition
interface PropsType {
  cookieCurrency: string;
  children: React.ReactNode;
}

// definition
export default React.memo(({ cookieCurrency, children }: PropsType) => {
  const { loading, error, data } = useQuery<getStoreCurrency>(
    gql`
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
    `,
  );
  const [currency, setCurrency] = useState<string>(cookieCurrency);
  const c = useFormat(
    currency,
    !data?.viewer?.store ? null : filter(useFormatFragment, data.viewer.store),
  );

  useInitFx(
    !data?.exchangeRateService
      ? null
      : filter(useInitFxFragment, data.exchangeRateService),
  );

  if (loading || error)
    return <Spin indicator={<Icon type="loading" spin />} />;

  return (
    <CurrencyContext.Provider
      value={{
        c,
        setCurrency,
        currency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
});
