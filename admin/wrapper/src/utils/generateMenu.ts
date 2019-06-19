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
  isOldActivityVersion,
}: {
  isMerchant: boolean;
  permission: initAdminGetAuthorityListDataPermission | null;
  storeAppList: { [plugin: string]: boolean };
  isOldActivityVersion: boolean;
}): MenuItemType[] => [
  {
    path: '/dashboard',
    src: '/static/images/menu/dashboard.png',
    title: 'dashboard',
  },
  ...(isMerchant || idx(permission, _ => _.order.index)
    ? [
        {
          path: '/orders',
          src: '/static/images/menu/orders.png',
          title: 'orders',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.product.index)
    ? [
        {
          path: '/products',
          src: '/static/images/menu/products.png',
          title: 'products',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.service.index)
    ? [
        {
          src: '/static/images/menu/questions.png',
          title: 'questions',
          sub: [
            ...(isMerchant || idx(permission, _ => _.service.product)
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
  ...(isMerchant && storeAppList.analytics
    ? [
        {
          path: '/analytics',
          src: '/static/images/menu/analytics.png',
          title: 'analytics',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.user.index)
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
            ...(storeAppList.memberGroup
              ? [
                  {
                    path: '/member-group',
                    src: '/static/images/menu/member-group.png',
                    title: 'member-group',
                  },
                ]
              : []),
            ...(storeAppList.memberGroupCode
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
  ...(isMerchant || idx(permission, _ => _.design.index)
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
      ...(storeAppList.points && isOldActivityVersion
        ? [
            {
              path: '/reward-points',
              src: '/static/images/menu/reward.png',
              title: 'reward',
            },
          ]
        : []),
      ...(storeAppList.newsletters
        ? [
            {
              path: '/newsletter',
              src: '/static/images/menu/newsletter.png',
              title: 'newsletter',
            },
          ]
        : []),
      ...(storeAppList.webTrack
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
  ...(isMerchant || idx(permission, _ => _.file.index)
    ? [
        {
          path: '/file-manager',
          src: '/static/images/menu/file-manager.png',
          title: 'file-manager',
        },
      ]
    : []),
  ...(isMerchant || idx(permission, _ => _.store.index)
    ? [
        {
          path: '/setting',
          src: '/static/images/menu/setting.png',
          title: 'setting',
        },
      ]
    : []),
];
