// import
import { useEffect } from 'react';
import gql from 'graphql-tag';
import fx from 'money';

// graphql typescript
import { useInitFxFragment as useInitFxFragmentType } from '@meepshop/types/gqls/store';

// definition
export const useInitFxFragment = gql`
  fragment useInitFxFragment on ExchangeRate {
    base
    rates
    updatedAt
  }
`;

fx.base = 'USD';
fx.rates = {
  EUR: 0.902088,
  HKD: 7.82205,
  USD: 1,
  SGD: 1.358151,
  TWD: 30.512287,
  JPY: 108.63175,
  VND: 23142.582444,
  KRW: 1174.74,
  MYR: 4.1695,
  CNY: 7.0274,
};

export default (exchangeRates: useInitFxFragmentType | null): void => {
  useEffect(() => {
    const { base, rates, updatedAt } = exchangeRates || {};

    if (!base || !rates || !updatedAt) return;

    fx.base = base;
    fx.rates = rates;
    fx.updatedAt = updatedAt;
  }, [exchangeRates]);
};
