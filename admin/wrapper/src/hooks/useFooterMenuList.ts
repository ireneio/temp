// typescript import
import { IconProps } from 'antd/lib/icon';

// import
import { useMemo, useEffect } from 'react';
import {
  LogoutIcon,
  AccountIcon,
  BillingIcon,
  ForwardStoreIcon,
} from '@meepshop/icons';
import { useRouter } from '@meepshop/link';

// graphql typescript
import { useFooterMenuListFragment as useFooterMenuListFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface FooterMenuListType {
  selectedKeys: string[];
  menuList: {
    key: string;
    Icon: React.ComponentType<IconProps>;
    url: string;
    target?: string;
  }[];
}

// definition
export default (
  store: useFooterMenuListFragmentType | null,
  isMerchant: boolean,
): FooterMenuListType => {
  const router = useRouter();
  const enabledList: { [key: string]: boolean } = useMemo(
    () => ({
      'account-setting': isMerchant,
      'bill-payment': isMerchant,
    }),
    [isMerchant],
  );
  const menuList = useMemo(
    () =>
      [
        {
          key: 'logout',
          Icon: LogoutIcon,
          url: '/api/auth/logout',
        },
        {
          key: 'account-setting',
          Icon: AccountIcon,
          url: '/account-setting',
        },
        {
          key: 'bill-payment',
          Icon: BillingIcon,
          url: '/bill-payment',
        },
        {
          key: 'go-to-store',
          Icon: ForwardStoreIcon,
          url: `//${store?.domain?.[0] || store?.defaultDomain}`,
          target: '_blank',
        },
      ].filter(({ key }) =>
        enabledList[key] === undefined ? true : enabledList[key],
      ),
    [store, enabledList],
  );

  useEffect(() => {
    if (enabledList[router.pathname.slice(1)] === false) router.push('/');
  }, [enabledList, router]);

  return {
    selectedKeys: useMemo(
      () =>
        [
          menuList.find(({ url }) =>
            new RegExp(`^${url}`).test(router.pathname),
          )?.key,
        ].filter(Boolean) as string[],
      [menuList, router],
    ),
    menuList,
  };
};
