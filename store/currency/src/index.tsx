// import
import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Spin, Icon } from 'antd';
import idx from 'idx';
import { emptyFunction } from 'fbjs';

import generateConverter from './utils/generateConverter';
import initFx from './utils/initFx';
import { DEFAULT_FX } from './constants';

// graphql typescript
import { getStoreCurrency } from './__generated__/getStoreCurrency';

// typescript definition
interface PropsType {
  cookieCurrency: string;
  children: React.ReactNode;
}

export interface CurrencyType {
  c: (price: number) => string;
  setCurrency: (currency: string) => void;
  currency: string;
}

// definition
const CurrencyContext = React.createContext<CurrencyType>({
  c: generateConverter('TWD', 'TWD'),
  setCurrency: emptyFunction,
  currency: 'TWD',
});

export const CurrencyProvider = React.memo(
  ({ cookieCurrency, children }: PropsType) => {
    const { loading, error, data } = useQuery<getStoreCurrency>(
      gql`
        query getStoreCurrency {
          viewer {
            id
            store {
              id
              currency
            }
          }

          exchangeRateService {
            base
            rates
            timestamp
          }
        }
      `,
    );
    const [currency, setCurrency] = useState<string>(cookieCurrency);

    if (loading || error)
      return <Spin indicator={<Icon type="loading" spin />} />;

    const storeCurrency = idx(data, _ => _.viewer.store.currency) || 'TWD';

    initFx(idx(data, _ => _.exchangeRateService) || DEFAULT_FX);

    return (
      <CurrencyContext.Provider
        value={{
          c: generateConverter(storeCurrency, currency),
          setCurrency,
          currency,
        }}
      >
        {children}
      </CurrencyContext.Provider>
    );
  },
);

export default CurrencyContext;
