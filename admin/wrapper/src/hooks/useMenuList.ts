// typescript import
import { IconProps } from 'antd/lib/icon';

// import
import { useMemo, useContext, useEffect } from 'react';
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
import { Apps as AppsContext } from '@meepshop/context';
import { useRouter } from '@meepshop/link';

// graphql typescript
import { useMenuListFragment as useMenuListFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
export type MenuListType = (string | [string, MenuListType])[];

interface MenuType {
  key: string;
  Icon?: React.ComponentType<IconProps>;
  url?: string;
  items?: MenuType[];
}

// definition
export const MENU_LIST: MenuListType = [
  'dashboard',
  'orders',
  'products',
  ['messager', ['product-service']],
  'analytics',
  ['member', ['members', 'member-group', 'member-group-code']],
  ['design', ['page-manager', 'color-manager', 'menu-manager']],
  ['marketing', ['discount', 'newsletter', 'web-track']],
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
  'web-track': '/web-track',
  'file-manager': '/file-manager',
  setting: '/setting',
  'setting/notification': '/setting/notification',
  'setting/redirects': '/setting/redirects',
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
  permission: useMenuListFragmentType | null,
): MenuType[] => {
  const router = useRouter();
  const apps = useContext(AppsContext);
  const enabledList = useMemo(
    () => ({
      orders: Boolean(isMerchant || permission?.orders?.isEnabled),
      products: Boolean(isMerchant || permission?.products?.isEnabled),
      'product-service': Boolean(
        isMerchant || permission?.productService?.isEnabled,
      ),
      analytics: Boolean(isMerchant && apps.analytics.isInstalled),
      member: Boolean(isMerchant || permission?.member?.isEnabled),
      'member-group': Boolean(apps.memberGroup.isInstalled),
      'member-group-code': Boolean(apps.memberGroupCode.isInstalled),
      design: Boolean(isMerchant || permission?.design?.isEnabled),
      newsletter: Boolean(apps.newsletters.isInstalled),
      'web-track': Boolean(apps.webTrack.isInstalled),
      'file-manager': Boolean(isMerchant || permission?.fileManager?.isEnabled),
      setting: Boolean(isMerchant || permission?.setting?.isEnabled),
      'setting/notification': Boolean(
        isMerchant ||
          (permission?.setting?.isEnabled &&
            permission?.setting?.ableToEditNotificationSetting),
      ),
      'setting/redirects': Boolean(isMerchant),
    }),
    [isMerchant, permission, apps],
  );

  useEffect(() => {
    const currentKey = Object.keys(URLS).find(
      key => URLS[key] === router.pathname,
    ) as keyof typeof enabledList;

    if (currentKey && enabledList[currentKey] === false) router.push('/');
  }, [enabledList, router]);

  return useMemo(() => getMenuList(enabledList), [enabledList]);
};
