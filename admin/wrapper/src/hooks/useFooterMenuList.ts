// typescript import
import { IconProps } from 'antd/lib/icon';

// import
import { useMemo } from 'react';
import gql from 'graphql-tag';

import {
  LogoutIcon,
  AccountIcon,
  BillingIcon,
  ForwardStoreIcon,
} from '@meepshop/icons';
import { useRouter } from '@admin/link';

// graphql typescript
import { useFooterMenuListFragment as useFooterMenuListFragmentType } from './__generated__/useFooterMenuListFragment';

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
export const useFooterMenuListFragment = gql`
  fragment useFooterMenuListFragment on Store {
    domain
    defaultDomain
  }
`;

export default (
  store: useFooterMenuListFragmentType | null,
): FooterMenuListType => {
  const router = useRouter();
  const menuList = useMemo(
    () => [
      {
        key: 'signout',
        Icon: LogoutIcon,
        url: '/signout',
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
    ],
    [store],
  );

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
