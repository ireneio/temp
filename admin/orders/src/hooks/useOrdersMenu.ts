// import
import { useMemo } from 'react';

import { useTranslation } from '@meepshop/locales';

// typescript definition
interface OrderMenuItem {
  key: string;
  title: string;
  path: string;
}

// definition
export default (
  isEcfitEnabled: boolean,
): {
  groupTitle: 'all-orders' | 'shipment-orders';
  items: OrderMenuItem[];
}[] => {
  const { t } = useTranslation('orders');

  return useMemo(
    () => [
      {
        groupTitle: 'all-orders',
        items: [
          {
            key: 'orders',
            title: t('title.orders'),
            path: '/orders',
          },
          {
            key: 'archived',
            title: t('title.archive-orders'),
            path: '/orders?type=archived',
          },
        ],
      },
      {
        groupTitle: 'shipment-orders',
        items: [
          {
            key: 'ecpay',
            title: t('title.ecpay'),
            path: '/orders/ecpay',
          },
          ...(isEcfitEnabled
            ? [
                {
                  key: 'ecfit',
                  title: t('title.ecfit'),
                  path: '/orders/ecfit',
                },
              ]
            : []),
        ],
      },
    ],
    [isEcfitEnabled, t],
  );
};
