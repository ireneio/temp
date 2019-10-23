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
    src: '/static/images/menu/logo.svg',
    title: 'controller',
    sub: [
      ...(isMerchant
        ? [
            {
              path: '/account-setting',
              src: '/static/images/menu/account-setting.svg',
              title: 'account-setting',
            },
          ]
        : []),
      ...(isMerchant
        ? [
            {
              path: '/bill-payment',
              src: '/static/images/menu/bill-payment.svg',
              title: 'bill-payment',
            },
          ]
        : []),
      {
        path: `//${domain}`,
        src: '/static/images/menu/go-to-store.svg',
        title: 'go-to-store',
        target: '_blank',
      },
      {
        path: '/signout',
        src: '/static/images/menu/logout.svg',
        title: 'signout',
      },
    ],
  },
];
