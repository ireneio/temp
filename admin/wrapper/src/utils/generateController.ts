// typescript import
import { MenuItemType } from '../constants';

// definition
export default ({
  isMerchant,
  domain,
}: {
  isMerchant: boolean;
  domain?: string | null;
}): MenuItemType[] => [
  {
    src: '/images/menu/logo.svg',
    title: 'controller',
    sub: [
      ...(isMerchant
        ? [
            {
              path: '/account-setting',
              src: '/images/menu/account-setting.svg',
              title: 'account-setting',
            },
          ]
        : []),
      ...(isMerchant
        ? [
            {
              path: '/bill-payment',
              src: '/images/menu/bill-payment.svg',
              title: 'bill-payment',
            },
          ]
        : []),
      {
        path: `//${domain}`,
        src: '/images/menu/go-to-store.svg',
        title: 'go-to-store',
        target: '_blank',
      },
      {
        path: '/signout',
        src: '/images/menu/logout.svg',
        title: 'signout',
      },
    ],
  },
];
