export default ({ isMerchant, domain }) => [
  {
    src: '/static/images/menu/logo.png',
    title: 'controller',
    sub: [
      ...(isMerchant
        ? [
            {
              path: '/account-setting',
              src: '/static/images/menu/account-setting.png',
              title: 'account-setting',
            },
          ]
        : []),
      {
        path: '/bill-setting',
        src: '/static/images/menu/bill-setting.png',
        title: 'bill-setting',
      },
      {
        path: `//${domain}`,
        src: '/static/images/menu/go-to-store.png',
        title: 'go-to-store',
        target: '_blank',
      },
      {
        path: '/signout',
        src: '/static/images/menu/signout.png',
        title: 'signout',
      },
    ],
  },
];
