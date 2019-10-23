// typescript import
import { MenuItemType } from '../constants';

// import
import idx from 'idx';

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
    src: '/static/images/menu/dashboard.svg',
    title: 'dashboard',
  },
  ...(isMerchant || idx(permission, _ => _.order.index)
    ? [
        {
          path: '/orders',
          src: '/static/images/menu/orders.svg',
          title: 'orders',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.product.index)
    ? [
        {
          path: '/products',
          src: '/static/images/menu/products.svg',
          title: 'products',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.service.product)
    ? [
        {
          path: '/product-service',
          src: '/static/images/menu/product-service.svg',
          title: 'product-service',
        },
      ]
    : []),
  ...(isMerchant && storeAppList.analytics
    ? [
        {
          path: '/analytics',
          src: '/static/images/menu/analytics.svg',
          title: 'analytics',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.user.index)
    ? [
        {
          src: '/static/images/menu/member.svg',
          title: 'member',
          sub: [
            {
              path: '/users',
              src: '/static/images/menu/members.svg',
              title: 'members',
            },
            ...(storeAppList.memberGroup
              ? [
                  {
                    path: '/member-group',
                    src: '/static/images/menu/member-group.svg',
                    title: 'member-group',
                  },
                ]
              : []),
            ...(storeAppList.memberGroupCode
              ? [
                  {
                    path: '/member-group-code',
                    src: '/static/images/menu/member-group-code.svg',
                    title: 'member-group-code',
                  },
                ]
              : []),
          ],
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.design.index)
    ? [
        {
          src: '/static/images/menu/design.svg',
          title: 'design',
          sub: [
            {
              path: '/page-manager',
              src: '/static/images/menu/page-manager.svg',
              title: 'page-manager',
            },
            {
              path: '/color-manager',
              src: '/static/images/menu/color-manager.svg',
              title: 'color-manager',
            },
            {
              path: '/menus',
              src: '/static/images/menu/menu-manager.svg',
              title: 'menu-manager',
            },
          ],
        },
      ]
    : []),
  {
    src: '/static/images/menu/marketing.svg',
    title: 'marketing',
    sub: [
      {
        path: '/marketing-activities',
        src: '/static/images/menu/discount.svg',
        title: 'discount',
      },
      ...(storeAppList.newsletters
        ? [
            {
              path: '/newsletter',
              src: '/static/images/menu/newsletter.svg',
              title: 'newsletter',
            },
          ]
        : []),
      ...(storeAppList.webTrack
        ? [
            {
              path: '/ads-analytics',
              src: '/static/images/menu/ads-analytics.svg',
              title: 'ads-analytics',
            },
          ]
        : []),
    ],
  },
  ...(isMerchant || idx(permission, _ => _.file.index)
    ? [
        {
          path: '/file-manager',
          src: '/static/images/menu/file-manager.svg',
          title: 'file-manager',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.store.index)
    ? [
        {
          path: '/setting',
          src: '/static/images/menu/setting.svg',
          title: 'setting',
        },
      ]
    : []),
];
