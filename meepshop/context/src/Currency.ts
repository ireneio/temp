// import
import React from 'react';
import { emptyFunction } from 'fbjs';

// typescript definition
export interface CurrencyType {
  c: (price: number) => string;
  setCurrency: (currency: string) => void;
  currency: string;
}

// definition
export const defaultCurrency = 'TWD';

export const format = (currency: string, price: number): string =>
  (() => {
    switch (currency) {
      case 'TWD':
        return `NT$ ${price.toFixed(0)}`;
      case 'CNY':
        return `RMB￥${price.toFixed(2)}`;
      case 'USD':
        return `US$ ${price.toFixed(2)}`;
      case 'JPY':
        return `JPY￥${price.toFixed(0)}`;
      case 'EUR':
        return `€ ${price.toFixed(2)}`;
      case 'VND':
        return `₫ ${price.toFixed(0)}`;
      case 'KRW':
        return `₩ ${price.toFixed(0)}`;
      case 'HKD':
        return `HK$ ${price.toFixed(1)}`;
      case 'MYR':
        return `RM ${price.toFixed(2)}`;
      case 'SGD':
        return `S$ ${price.toFixed(2)}`;
      default:
        return price.toString();
    }
  })().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export default React.createContext<CurrencyType>({
  c: (price: number) => format('TWD', price),
  setCurrency: emptyFunction,
  currency: defaultCurrency,
});
