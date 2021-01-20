// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { filter } from 'graphql-anywhere';
import { Layout } from 'antd';

import Link from '@meepshop/link';
import { HamburgerIcon, DoubleRightIcon } from '@meepshop/icons';
import {
  adminWrapperTextLogo_react as AdminWrapperTextLogo,
  adminWrapperImgLogo_react as AdminWrapperImgLogo,
} from '@meepshop/images';

import Menu from './Menu';
import TrialReminder from './TrialReminder';
import Footer from './Footer';
import useCollapsed from './hooks/useCollapsed';
import useTransitionEnd from './hooks/useTransitionEnd';
import useCheckingAdminStatus from './hooks/useCheckingAdminStatus';
import styles from './styles/index.less';

// graphql typescript
import { initAdmin as initAdminType } from '@meepshop/types/gqls/admin';

// graphql import
import { initAdmin } from './gqls';
import { useCheckingAdminStatusFragment } from './gqls/useCheckingAdminStatus';
import { useMenuListFragment } from './gqls/useMenuList';
import { useFooterMenuListFragment } from './gqls/useFooterMenuList';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
const { Content, Sider } = Layout;

export const CollapsedContext = React.createContext<boolean | null>(false);

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<initAdminType>(initAdmin);
  const { isDone, collapsed, onBreakpoint, setCollapsed } = useCollapsed();
  const [transitionLoading, transitionEnd] = useTransitionEnd(collapsed);
  const isMerchant = data?.viewer?.role === 'MERCHANT';
  const permission = data?.viewer?.permission;
  const isNotOpened = useCheckingAdminStatus(
    filter(useCheckingAdminStatusFragment, data?.viewer?.store || null),
  );
  const LogoTriggerIcon = collapsed ? DoubleRightIcon : HamburgerIcon;

  // FIXME: add && metaData?.adminStatus === 'VALID' when complete migration
  const isTrial =
    data?.viewer?.store?.metaData?.accountType === 'TRIAL' || false;

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
              {collapsed ? <AdminWrapperImgLogo /> : <AdminWrapperTextLogo />}
            </a>
          </Link>

          <LogoTriggerIcon onClick={() => setCollapsed(!collapsed)} />
        </div>

        <Menu
          isTrial={isTrial}
          isMerchant={isMerchant}
          permission={filter(useMenuListFragment, permission || null)}
          collapsed={collapsed}
          loading={transitionLoading}
          isNotOpened={isNotOpened}
        />

        {!isTrial ? null : (
          <TrialReminder
            trialExpireAt={data?.viewer?.store?.metaData?.trialExpireAt || null}
            collapsed={collapsed}
          />
        )}

        <Footer
          store={filter(useFooterMenuListFragment, data?.viewer?.store || null)}
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
