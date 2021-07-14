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
export default (variant: useOptionsVariantFragmentType | null): OptionsType => {
  const { t } = useTranslation('product-amount-selector');
  const [searchValue, setSearchValue] = useState<number | null>(null);
  const currentMinPurchasableQty = variant?.currentMinPurchasableQty || 0;
  const currentMaxPurchasableQty = variant?.currentMaxPurchasableQty || 0;

  return {
    options: useMemo(() => {
      if (currentMinPurchasableQty === 0 && currentMaxPurchasableQty === 0)
        return [];

      if (searchValue)
        return [
          {
            value: searchValue,
            disabled: false,
            text: searchValue,
          },
        ];

      const amount =
        currentMaxPurchasableQty >= currentMinPurchasableQty
          ? currentMaxPurchasableQty - currentMinPurchasableQty + 1
          : 0;

      return [].constructor
        .apply({}, new Array(amount >= 100 ? 101 : amount))
        .map((_: unknown, index: number) => {
          const value = index + currentMinPurchasableQty;

          return {
            value,
            disabled: index >= 100,
            text: index >= 100 ? t('more-options') : value,
          };
        });
    }, [t, currentMinPurchasableQty, currentMaxPurchasableQty, searchValue]),
    onSearch: useCallback(
      valueStr => {
        const value = parseInt(valueStr, 10);

        setSearchValue(
          currentMinPurchasableQty <= value && value <= currentMaxPurchasableQty
            ? value
            : null,
        );
      },
      [currentMinPurchasableQty, currentMaxPurchasableQty],
    ),
    setSearchValue,
  };
};
