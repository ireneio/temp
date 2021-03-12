// import
import { useState, useMemo, useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// graphql typescript
import { useOptionsVariantFragment as useOptionsVariantFragmentType } from '@meepshop/types/gqls/meepshop';

// typescropt
interface OptionsType {
  options: {
    value: number;
    disabled: boolean;
    text: string | number;
  }[];
  onSearch: (value: string) => void;
  setSearchValue: (searchValue: number | null) => void;
}

// definition
const formatNumber = (
  value: number | null | undefined,
  initialValue: number,
): number => (value === null || value === undefined ? initialValue : value);

// FIXME: should check minPurchaseItems, maxPurchaseLimit, stock in the backend
export const getQuantityRange = (
  variant: useOptionsVariantFragmentType | null,
): { min: number; max: number } => {
  const stock = formatNumber(variant?.stock, 0);
  const minPurchaseItems = formatNumber(variant?.minPurchaseItems, 1);
  const maxPurchaseLimit = formatNumber(variant?.maxPurchaseLimit, stock);

  if (stock < 1)
    return {
      min: 0,
      max: 0,
    };

  return {
    min: minPurchaseItems > 0 ? minPurchaseItems : 1,
    max: (() => {
      if (minPurchaseItems > maxPurchaseLimit)
        return minPurchaseItems < stock ? minPurchaseItems : stock;

      return maxPurchaseLimit < stock ? maxPurchaseLimit : stock;
    })(),
  };
};

export default (variant: useOptionsVariantFragmentType | null): OptionsType => {
  const { t } = useTranslation('product-amount-selector');
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const { min, max } = useMemo(() => getQuantityRange(variant), [variant]);

  return {
    options: useMemo(() => {
      if (min === 0 && max === 0) return [];

      if (searchValue)
        return [
          {
            value: searchValue,
            disabled: false,
            text: searchValue,
          },
        ];

      const amount = max - min + 1;

      return [].constructor
        .apply({}, new Array(amount >= 100 ? 101 : amount))
        .map((_: unknown, index: number) => {
          const value = index + min;

          return {
            value,
            disabled: index >= 100,
            text: index >= 100 ? t('more-options') : value,
          };
        });
    }, [t, min, max, searchValue]),
    onSearch: useCallback(
      valueStr => {
        const value = parseInt(valueStr, 10);

        setSearchValue(min <= value && value <= max ? value : null);
      },
      [min, max],
    ),
    setSearchValue,
  };
};
