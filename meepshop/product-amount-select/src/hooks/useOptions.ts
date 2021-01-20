// import
import { useState, useMemo, useCallback } from 'react';

import { useTranslation } from '@meepshop/utils/lib/i18n';

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
const formatNumber = (value: number | null | undefined): number =>
  !value ? 0 : value;

export default (variant: useOptionsVariantFragmentType | null): OptionsType => {
  const { t } = useTranslation('product-amount-select');
  const [searchValue, setSearchValue] = useState<number | null>(null);

  // FIXME: should check minPurchaseItems, maxPurchaseLimit, stock in the backend
  const { min, max } = useMemo(() => {
    const minPurchaseItems = formatNumber(variant?.minPurchaseItems);
    const maxPurchaseLimit = formatNumber(variant?.maxPurchaseLimit);
    const stock = formatNumber(variant?.stock);

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
  }, [variant]);

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
