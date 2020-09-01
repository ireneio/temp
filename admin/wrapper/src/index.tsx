// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Layout } from 'antd';

import Link from '@meepshop/link';
import { HamburgerIcon, DoubleRightIcon } from '@meepshop/icons';

import Menu from './Menu';
import Footer from './Footer';
import TextLogo from './images/TextLogo';
import ImgLogo from './images/ImgLogo';
import useCollapsed from './hooks/useCollapsed';
import useTransitionEnd from './hooks/useTransitionEnd';
import useCheckingAdminStatus from './hooks/useCheckingAdminStatus';
import styles from './styles/index.less';

// graphql typescript
import { initAdmin } from './__generated__/initAdmin';

// graphql import
import {
  userUserFragment,
  userAuthorityListFragment,
} from '@admin/apollo/lib/User';

import { useCheckingAdminStatusFragment } from './hooks/useCheckingAdminStatus';
import { useMenuListFragment } from './hooks/useMenuList';
import { useFooterMenuListFragment } from './hooks/useFooterMenuList';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
const { Content, Sider } = Layout;

const query = gql`
  query initAdmin {
    viewer {
      id
      role
      groupId
      store {
        id
        ...useCheckingAdminStatusFragment
        ...useFooterMenuListFragment
      }
      permission @client {
        ...useMenuListFragment
      }
      ...userUserFragment
    }

    getAuthorityList {
      ...userAuthorityListFragment
    }
  }

  ${userUserFragment}
  ${userAuthorityListFragment}

  ${useCheckingAdminStatusFragment}
  ${useMenuListFragment}
  ${useFooterMenuListFragment}
`;

export const CollapsedContext = React.createContext<boolean | null>(false);

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<initAdmin>(query);
  const { isDone, collapsed, onBreakpoint, setCollapsed } = useCollapsed();
  const [transitionLoading, transitionEnd] = useTransitionEnd(collapsed);
  const isMerchant = data?.viewer?.role === 'MERCHANT';
  const permission = data?.viewer?.permission;
  const isNotOpened = useCheckingAdminStatus(
    !data?.viewer?.store
      ? null
      : filter(useCheckingAdminStatusFragment, data.viewer.store),
  );
  const LogoTriggerIcon = collapsed ? DoubleRightIcon : HamburgerIcon;

  return (
    <Layout className={styles.root} hasSider>
      <Sider
        className={`${styles.sider} ${!isDone ? styles.hidden : ''}`}
        collapsed={collapsed}
        onBreakpoint={onBreakpoint}
        onTransitionEnd={transitionEnd}
        breakpoint="lg"
        width={240}
        collapsedWidth={64}
        trigger={null}
        collapsible
      >
        <div
          className={`${styles.logo} ${collapsed ? styles.collapsed : ''} ${
            transitionLoading ? styles.loading : ''
          }`}
        >
          <Link href="/" disabled={isNotOpened}>
            <a className={!isNotOpened ? '' : styles.disabled} href="/">
              {collapsed ? <ImgLogo /> : <TextLogo />}
            </a>
          </Link>

          <LogoTriggerIcon onClick={() => setCollapsed(!collapsed)} />
        </div>

        <Menu
          isMerchant={isMerchant}
          permission={
            !permission ? null : filter(useMenuListFragment, permission)
          }
          collapsed={collapsed}
          loading={transitionLoading}
          isNotOpened={isNotOpened}
        />

        <Footer
          store={
            !data?.viewer?.store
              ? null
              : filter(useFooterMenuListFragment, data.viewer.store)
          }
          isMerchant={isMerchant}
          collapsed={collapsed}
          isNotOpened={isNotOpened}
        />
      </Sider>

      <CollapsedContext.Provider value={transitionLoading ? null : collapsed}>
        <Content>{children}</Content>
      </CollapsedContext.Provider>
    </Layout>
  );
});
