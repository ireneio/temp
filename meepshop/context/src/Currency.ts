// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// typescript definition
export interface CurrencyType {
  c: (price: number, disableSymbol?: boolean) => string;
  setCurrency: (currency: string) => void;
  currency: string;
}

// definition
export const defaultCurrency = 'TWD';

export const format = (
  currency: string,
  price: number,
  disableSymbol = false,
): string =>
  (() => {
    switch (currency) {
      case 'TWD':
        return [!disableSymbol && 'NT$', price.toFixed(0)];
      case 'CNY':
        return [!disableSymbol && 'RMB￥', price.toFixed(2)];
      case 'USD':
        return [!disableSymbol && 'US$', price.toFixed(2)];
      case 'JPY':
        return [!disableSymbol && 'JPY￥', price.toFixed(0)];
      case 'EUR':
        return [!disableSymbol && '€', price.toFixed(2)];
      case 'VND':
        return [!disableSymbol && '₫', price.toFixed(0)];
      case 'KRW':
        return [!disableSymbol && '₩', price.toFixed(0)];
      case 'HKD':
        return [!disableSymbol && 'HK$', price.toFixed(1)];
      case 'MYR':
        return [!disableSymbol && 'RM', price.toFixed(2)];
      case 'SGD':
        return [!disableSymbol && 'S$', price.toFixed(2)];
      default:
        return [price.toString()];
    }
  })()
    .filter(Boolean)
    .join(' ')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default React.createContext<CurrencyType>({
  c: (price: number, disableSymbol?: boolean) =>
    format('TWD', price, disableSymbol),
  setCurrency: emptyFunction,
  currency: defaultCurrency,
});
