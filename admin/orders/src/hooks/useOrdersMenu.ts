// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';

// typescript definition
interface OrderMenuItem {
  key: string;
  title: string;
  path: string;
  useIcon?: boolean;
}

// definition
export default (isEcfitEnabled: boolean): OrderMenuItem[] => {
  const { t } = useTranslation('orders');

  return useMemo(
    () => [
      {
        key: 'orders',
        title: t('title.orders'),
        path: '/orders',
      },
      {
        key: 'ecpay',
        title: t('title.ecpay'),
        path: '/orders/ecpay',
        useIcon: true,
      },
      ...(isEcfitEnabled
        ? [
            {
              key: 'ecfit',
              title: t('title.ecfit'),
              path: '/orders/ecfit',
              useIcon: true,
            },
          ]
        : []),
    ],
    [isEcfitEnabled, t],
  );
};
