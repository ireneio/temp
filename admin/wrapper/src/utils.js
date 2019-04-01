export const generateMenu = ({
  isMerchant,
  permission,
  storeAppList,
  isOldActivityVersion,
}) => [
  {
    path: '/dashboard',
    src: '/static/images/menu/dashboard.png',
    title: 'dashboard',
  },
  ...(isMerchant || permission?.order.index
    ? [
        {
          path: '/orders',
          src: '/static/images/menu/orders.png',
          title: 'orders',
        },
      ]
    : []),
  ...(isMerchant || permission?.product.index
    ? [
        {
          path: '/products',
          src: '/static/images/menu/products.png',
          title: 'products',
        },
      ]
    : []),
  ...(isMerchant || permission?.service.index
    ? [
        {
          src: '/static/images/menu/questions.png',
          title: 'questions',
          sub: [
            ...(isMerchant || permission?.service.product
              ? [
                  {
                    path: '/product-service',
                    src: '/static/images/menu/product-service.png',
                    title: 'product-service',
                  },
                ]
              : []),
          ],
        },
      ]
    : []),
  ...(storeAppList?.analytics
    ? [
        {
          path: '/analytics',
          src: '/static/images/menu/analytics.png',
          title: 'analytics',
        },
      ]
    : []),
  ...(isMerchant || permission?.user.index
    ? [
        {
          src: '/static/images/menu/member.png',
          title: 'member',
          sub: [
            {
              path: '/users',
              src: '/static/images/menu/members.png',
              title: 'members',
            },
            ...(storeAppList?.memberGroup
              ? [
                  {
                    path: '/member-group',
                    src: '/static/images/menu/member-group.png',
                    title: 'member-group',
                  },
                ]
              : []),
            ...(storeAppList?.memberGroupCode
              ? [
                  {
                    path: '/member-group-code',
                    src: '/static/images/menu/member-group-code.png',
                    title: 'member-group-code',
                  },
                ]
              : []),
          ],
        },
      ]
    : []),
  ...(isMerchant || permission?.design.index
    ? [
        {
          src: '/static/images/menu/design.png',
          title: 'design',
          sub: [
            {
              path: '/page-manager',
              src: '/static/images/menu/page-manager.png',
              title: 'page-manager',
            },
            {
              path: '/color-manager',
              src: '/static/images/menu/color-manager.png',
              title: 'color-manager',
            },
            {
              path: '/menus',
              src: '/static/images/menu/menu-manager.png',
              title: 'menu-manager',
            },
          ],
        },
      ]
    : []),
  {
    src: '/static/images/menu/marketing.png',
    title: 'marketing',
    sub: [
      {
        path: isOldActivityVersion
          ? '/marketing-activities-old'
          : '/marketing-activities',
        src: '/static/images/menu/discount.png',
        title: 'discount',
      },
      ...(storeAppList?.points && isOldActivityVersion
        ? [
            {
              path: '/reward-points',
              src: '/static/images/menu/reward.png',
              title: 'reward',
            },
          ]
        : []),
      ...(storeAppList?.newsletters
        ? [
            {
              path: '/newsletter',
              src: '/static/images/menu/newsletter.png',
              title: 'newsletter',
            },
          ]
        : []),
      ...(storeAppList?.webTrack
        ? [
            {
              path: '/ads-analytics',
              src: '/static/images/menu/ads-analytics.png',
              title: 'ads-analytics',
            },
          ]
        : []),
    ],
  },
  ...(isMerchant || permission?.file.index
    ? [
        {
          path: '/file-manager',
          src: '/static/images/menu/file-manager.png',
          title: 'file-manager',
        },
      ]
    : []),
  ...(isMerchant || permission?.store.index
    ? [
        {
          src: '/static/images/menu/setting.png',
          title: 'setting',
          sub: [
            {
              path: '/store-setting',
              src: '/static/images/menu/store-setting.png',
              title: 'store-setting',
            },
            ...(isMerchant || permission?.store.payment
              ? [
                  {
                    path: '/payments',
                    src: '/static/images/menu/payments.png',
                    title: 'payments',
                  },
                ]
              : []),
            ...(isMerchant || permission?.store.shipment
              ? [
                  {
                    path: '/shippings',
                    src: '/static/images/menu/shipments.png',
                    title: 'shipments',
                  },
                ]
              : []),
            ...(isMerchant || permission?.store.exportSetting
              ? [
                  {
                    path: '/export-setting',
                    src: '/static/images/menu/export-setting.png',
                    title: 'export-setting',
                  },
                ]
              : []),
            ...(isMerchant
              ? [
                  {
                    path: '/authorization',
                    src: '/static/images/menu/authorization.png',
                    title: 'authorization',
                  },
                ]
              : []),
            ...(storeAppList?.gooddeal || storeAppList?.fbLogin
              ? [
                  {
                    path: '/login-setting',
                    src: '/static/images/menu/login-setting.png',
                    title: 'login-setting',
                  },
                ]
              : []),
            {
              path: '/app-store',
              src: '/static/images/menu/app-store.png',
              title: 'app-store',
            },
          ],
        },
      ]
    : []),
];

export const generateController = ({ isMerchant, domain }) => [
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
