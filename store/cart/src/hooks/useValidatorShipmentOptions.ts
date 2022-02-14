// typescription import
import { OptionType } from './useSpecificShipmentOption';

// import
import { useCallback } from 'react';

import { useTranslation } from '@meepshop/locales';

// definition
export default (options: OptionType): (() => void) => {
  const { t } = useTranslation('cart');

  return useCallback(async () => {
    if (!options.length)
      throw new Error(t('specific-shipment.no-shipment-tip'));
  }, [options.length, t]);
};
