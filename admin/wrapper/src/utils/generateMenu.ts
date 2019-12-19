// typescript import
import { MenuItemType } from '../constants';

// graphql typescript
import { initAdmin_getAuthorityList_data_permission as initAdminGetAuthorityListDataPermission } from '../__generated__/initAdmin';

// definition
export default ({
  isMerchant,
  permission,
  storeAppList,
}: {
  isMerchant: boolean;
  permission: initAdminGetAuthorityListDataPermission | null;
  storeAppList: { [plugin: string]: boolean };
}): MenuItemType[] => [
  {
    path: '/dashboard',
    src: '/images/menu/dashboard.svg',
    title: 'dashboard',
  },
  ...(isMerchant || permission?.order?.index
    ? [
        {
          path: '/orders',
          src: '/images/menu/orders.svg',
          title: 'orders',
        },
      ]
    : []),
  ...(isMerchant || permission?.product?.index
    ? [
        {
          path: '/products',
          src: '/images/menu/products.svg',
          title: 'products',
        },
      ]
    : []),
  ...(isMerchant || permission?.service?.product
    ? [
        {
          path: '/product-service',
          src: '/images/menu/product-service.svg',
          title: 'product-service',
        },
      ]
    : []),
  ...(isMerchant && storeAppList.analytics
    ? [
        {
          path: '/analytics',
          src: '/images/menu/analytics.svg',
          title: 'analytics',
        },
      ]
    : []),
  ...(isMerchant || permission?.user?.index
    ? [
        {
          src: '/images/menu/member.svg',
          title: 'member',
          sub: [
            {
              path: '/users',
              src: '/images/menu/members.svg',
              title: 'members',
            },
            ...(storeAppList.memberGroup
              ? [
                  {
                    path: '/member-group',
                    src: '/images/menu/member-group.svg',
                    title: 'member-group',
                  },
                ]
              : []),
            ...(storeAppList.memberGroupCode
              ? [
                  {
                    path: '/member-group-code',
                    src: '/images/menu/member-group-code.svg',
                    title: 'member-group-code',
                  },
                ]
              : []),
          ],
        },
      ]
    : []),
  ...(isMerchant || permission?.design?.index
    ? [
        {
          src: '/images/menu/design.svg',
          title: 'design',
          sub: [
            {
              path: '/page-manager',
              src: '/images/menu/page-manager.svg',
              title: 'page-manager',
            },
            {
              path: '/color-manager',
              src: '/images/menu/color-manager.svg',
              title: 'color-manager',
            },
            {
              path: '/menus',
              src: '/images/menu/menu-manager.svg',
              title: 'menu-manager',
            },
          ],
        },
      ]
    : []),
  {
    src: '/images/menu/marketing.svg',
    title: 'marketing',
    sub: [
      {
        path: '/marketing-activities',
        src: '/images/menu/discount.svg',
        title: 'discount',
      },
      ...(storeAppList.newsletters
        ? [
            {
              path: '/newsletter',
              src: '/images/menu/newsletter.svg',
              title: 'newsletter',
            },
          ]
        : []),
      ...(storeAppList.webTrack
        ? [
            {
              path: '/ads-analytics',
              src: '/images/menu/ads-analytics.svg',
              title: 'ads-analytics',
            },
          ]
        : []),
    ],
  },
  ...(isMerchant || permission?.file?.index
    ? [
        {
          path: '/file-manager',
          src: '/images/menu/file-manager.svg',
          title: 'file-manager',
        },
      ]
    : []),
  ...(isMerchant || permission?.store?.index
    ? [
        {
          path: '/setting',
          src: '/images/menu/setting.svg',
          title: 'setting',
        },
      ]
    : []),
];
