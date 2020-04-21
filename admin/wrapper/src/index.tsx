// import
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';
import { Layout } from 'antd';

import Link from '@admin/link';
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
import { useCollapsedFragment } from './hooks/useCollapsed';
import { useCheckingAdminStatusFragment } from './hooks/useCheckingAdminStatus';
import {
  useMenuListpermissionObjFragment,
  useMenuListpermissionStoreAppFragment,
} from './hooks/useMenuList';
import { useFooterMenuListFragment } from './hooks/useFooterMenuList';

// typescript definition
interface PropsType {
  children: React.ReactNode;
}

// definition
const { Content, Sider } = Layout;

const query = gql`
  query initAdmin {
    cookies @client {
      ...useCollapsedFragment
    }

    viewer {
      id
      role
      groupId
      store {
        id
        ...useCheckingAdminStatusFragment
        ...useFooterMenuListFragment
      }
    }

    getAuthorityList {
      data {
        id
        permission {
          ...useMenuListpermissionObjFragment
        }
      }
    }

    getStoreAppList {
      data {
        id
        ...useMenuListpermissionStoreAppFragment
      }
    }
  }

  ${useCollapsedFragment}
  ${useCheckingAdminStatusFragment}
  ${useMenuListpermissionObjFragment}
  ${useMenuListpermissionStoreAppFragment}
  ${useFooterMenuListFragment}
`;

export default React.memo(({ children }: PropsType) => {
  const { data } = useQuery<initAdmin>(query);
  const { isDone, collapsed, onBreakpoint, setCollapsed } = useCollapsed(
    !data?.cookies ? null : filter(useCollapsedFragment, data.cookies),
  );
  const [transitionLoading, transitionEnd] = useTransitionEnd(collapsed);
  const isMerchant = Boolean(data?.viewer?.role === 'MERCHANT');
  const permission = data?.getAuthorityList?.data?.find(
    authority => authority?.id === data?.viewer?.groupId,
  )?.permission;
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
            !permission
              ? null
              : filter(useMenuListpermissionObjFragment, permission)
          }
          storeApps={
            !data?.getStoreAppList?.data
              ? null
              : filter(
                  useMenuListpermissionStoreAppFragment,
                  data.getStoreAppList.data,
                )
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
          collapsed={collapsed}
          isNotOpened={isNotOpened}
        />
      </Sider>

      <Content>{children}</Content>
    </Layout>
  );
});
