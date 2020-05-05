// typescript import
import { IconProps } from 'antd/lib/icon';

// import
import { useMemo } from 'react';
import gql from 'graphql-tag';

import {
  HomeIcon,
  OrderIcon,
  PackageIcon,
  MessageCircleIcon,
  BarChartIcon,
  UsersIcon,
  StoreIcon,
  MarketingIcon,
  FolderIcon,
  SettingIcon,
} from '@meepshop/icons';

// graphql typescript
import { useMenuListpermissionObjFragment as useMenuListpermissionObjFragmentType } from './__generated__/useMenuListpermissionObjFragment';
import { useMenuListpermissionStoreAppFragment as useMenuListpermissionStoreAppFragmentType } from './__generated__/useMenuListpermissionStoreAppFragment';

// typescript definition
export type MenuListType = (string | [string, MenuListType])[];

interface MenuType {
  key: string;
  Icon?: React.ComponentType<IconProps>;
  url?: string;
  items?: MenuType[];
}

// definition
export const useMenuListpermissionObjFragment = gql`
  fragment useMenuListpermissionObjFragment on permissionObj {
    orders: order {
      isEnabled: index
    }
    products: product {
      isEnabled: index
    }
    productService: service {
      isEnabled: product
    }
    member: user {
      isEnabled: index
    }
    design {
      isEnabled: index
    }
    fileManager: file {
      isEnabled: index
    }
    setting: store {
      isEnabled: index
    }
  }
`;

export const useMenuListpermissionStoreAppFragment = gql`
  fragment useMenuListpermissionStoreAppFragment on StoreApp {
    id
    plugin
    isInstalled
  }
`;

export const MENU_LIST: MenuListType = [
  'dashboard',
  'orders',
  'products',
  ['messager', ['product-service']],
  'analytics',
  ['member', ['members', 'member-group', 'member-group-code']],
  ['design', ['page-manager', 'color-manager', 'menu-manager']],
  ['marketing', ['discount', 'newsletter', 'ads-analytics']],
  'file-manager',
  'setting',
];

const ICONS: { [key: string]: MenuType['Icon'] } = {
  dashboard: HomeIcon,
  orders: OrderIcon,
  products: PackageIcon,
  messager: MessageCircleIcon,
  analytics: BarChartIcon,
  member: UsersIcon,
  design: StoreIcon,
  marketing: MarketingIcon,
  'file-manager': FolderIcon,
  setting: SettingIcon,
};

export const URLS: { [key: string]: string } = {
  dashboard: '/dashboard',
  orders: '/orders',
  products: '/products',
  'product-service': '/product-service',
  analytics: '/analytics',
  members: '/users',
  'member-group': '/member-group',
  'member-group-code': '/member-group-code',
  'page-manager': '/page-manager',
  'color-manager': '/color-manager',
  'menu-manager': '/menus',
  discount: '/marketing-activities',
  newsletter: '/newsletter',
  'ads-analytics': '/ads-analytics',
  'file-manager': '/file-manager',
  setting: '/setting',
};

const getMenuList = (
  enabledList: { [key: string]: boolean },
  menuList: typeof MENU_LIST = MENU_LIST,
): MenuType[] =>
  menuList
    .map((key: string | [string, string[]]) =>
      typeof key === 'string'
        ? {
            key,
            Icon: ICONS[key],
            url: URLS[key],
          }
        : {
            key: key[0],
            Icon: ICONS[key[0]],
            url: URLS[key[0]],
            items: getMenuList(enabledList, key[1]),
          },
    )
    .filter(({ key }) =>
      enabledList[key] === undefined ? true : enabledList[key],
    );

export default (
  isMerchant: boolean,
  permission: useMenuListpermissionObjFragmentType | null,
  storeApps: (useMenuListpermissionStoreAppFragmentType | null)[] | null,
): MenuType[] => {
  const apps: { [plugin: string]: boolean } = useMemo(
    () =>
      (storeApps || []).reduce(
        (result, storeApp) =>
          !storeApp
            ? result
            : {
                ...result,
                [storeApp.plugin as string]: storeApp.isInstalled,
              },
        {},
      ),
    [storeApps],
  );
  const enabledList = useMemo(
    () => ({
      orders: Boolean(isMerchant || permission?.orders?.isEnabled),
      products: Boolean(isMerchant || permission?.products?.isEnabled),
      'product-service': Boolean(
        isMerchant || permission?.productService?.isEnabled,
      ),
      analytics: Boolean(isMerchant || apps.analytics),
      member: Boolean(isMerchant || permission?.member?.isEnabled),
      'member-group': Boolean(apps.memberGroup),
      'member-group-code': Boolean(apps.memberGroupCode),
      design: Boolean(isMerchant || permission?.design?.isEnabled),
      newsletter: Boolean(apps.newsletters),
      'ads-analytics': Boolean(apps.webTrack),
      'file-manager': Boolean(isMerchant || permission?.fileManager?.isEnabled),
      setting: Boolean(isMerchant || permission?.setting?.isEnabled),
    }),
    [isMerchant, permission, apps],
  );

  return useMemo(() => getMenuList(enabledList), [enabledList]);
};
