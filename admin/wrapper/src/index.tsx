// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';
import { SingletonRouter } from 'next/router';
import { MenuItemType } from './constants';

// import
import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Layout, Menu, Spin, Icon } from 'antd';
import memoizeOne from 'memoize-one';
import { areEqual } from 'fbjs';
import idx from 'idx';

import { withNamespaces } from '@admin/utils/lib/i18n';

import generateMenu from './utils/generateMenu';
import generateController from './utils/generateController';
import styles from './styles/index.less';

// graphql typescript
import {
  initAdmin,
  initAdmin_viewer as initAdminViewer,
  initAdmin_getStoreAppList as initAdminGetStoreAppList,
  initAdmin_getAuthorityList as initAdminGetAuthorityList,
} from './__generated__/initAdmin';

// typescript definition
interface PropsType extends I18nPropsType {
  viewer: initAdminViewer;
  getStoreAppList: initAdminGetStoreAppList;
  getAuthorityList: initAdminGetAuthorityList;
  router: SingletonRouter;
  children: React.ReactNode;
}

// definition
const { Content, Sider } = Layout;
const { Item, SubMenu } = Menu;

class Wrapper extends React.Component<PropsType> {
  private getMenuParams = memoizeOne(
    ({
      viewer,
      getStoreAppList,
      getAuthorityList,
    }: {
      viewer: initAdminViewer;
      getStoreAppList: initAdminGetStoreAppList;
      getAuthorityList: initAdminGetAuthorityList;
    }) => {
      const activityVersion = idx(viewer, _ => _.store.setting.activityVersion);
      const { permission = null } =
        (idx(getAuthorityList, _ => _.data) || []).find(
          list => (list || { id: undefined }).id === viewer.groupId,
        ) || {};

      return {
        storeAppList: (idx(getStoreAppList, _ => _.data) || []).reduce(
          (list: { [plugin: string]: boolean }, storeApp) => {
            const { plugin = null, isInstalled = null } = storeApp || {};
            return {
              ...list,
              [plugin || 'unknown']: Boolean(isInstalled),
            };
          },
          {},
        ),
        permission,
        domain:
          idx(viewer, _ => _.store.domain[0]) ||
          idx(viewer, _ => _.store.defaultDomain),
        isMerchant: viewer.role === 'MERCHANT',
        isOldActivityVersion: !activityVersion || activityVersion === 1,
        isAdminOpen: !(
          idx(viewer, _ => _.store.adminStatus) === 'CLOSED_BILL_NOT_PAID'
        ),
      };
    },
    areEqual,
  );

  public render(): React.ReactNode {
    const {
      children,
      router: { pathname },
      viewer,
      getStoreAppList,
      getAuthorityList,
      t,
    } = this.props;
    const {
      storeAppList,
      permission,
      domain,
      isMerchant,
      isOldActivityVersion,
      isAdminOpen,
    } = this.getMenuParams({ viewer, getStoreAppList, getAuthorityList });
    const rootPath = pathname.split('/')[1];

    return (
      <Layout className={styles.layout}>
        <Sider
          className={`${styles.sider} ${!isAdminOpen ? styles.closed : ''}`}
          width="55"
        >
          {isAdminOpen ? (
            <>
              <Menu
                className={styles.menu}
                mode="vertical"
                selectedKeys={[rootPath]}
              >
                {generateMenu({
                  storeAppList,
                  permission,
                  isMerchant,
                  isOldActivityVersion,
                }).map(({ src, title, path, sub }: MenuItemType) =>
                  sub ? (
                    <SubMenu
                      className={styles.submenu}
                      key={title}
                      title={<img src={src} alt={t(title)} />}
                    >
                      {sub.map(subitem => (
                        <Item key={subitem.title}>
                          <Link href={subitem.path}>
                            <a href={subitem.path}>
                              <img src={subitem.src} alt={t(subitem.title)} />
                              <span className={styles.subtitle}>
                                {t(subitem.title)}
                              </span>
                            </a>
                          </Link>
                        </Item>
                      ))}
                    </SubMenu>
                  ) : (
                    <Item key={title}>
                      <Link href={path}>
                        <a href={path}>
                          <img src={src} alt={t(title)} />
                        </a>
                      </Link>
                    </Item>
                  ),
                )}
              </Menu>
              <Menu
                className={styles.menu}
                mode="vertical"
                selectedKeys={[rootPath]}
              >
                {generateController({
                  domain,
                  isMerchant,
                }).map(({ src, title, sub }: MenuItemType) => (
                  <SubMenu
                    className={styles.submenu}
                    key={title}
                    title={
                      <img
                        className={styles.controller}
                        src={src}
                        alt={t(title)}
                      />
                    }
                  >
                    {(sub || []).map(subitem => (
                      <Item key={subitem.title}>
                        <Link href={subitem.path}>
                          <a href={subitem.path} target={subitem.target}>
                            <img src={subitem.src} alt={t(subitem.title)} />
                            <span className={styles.subtitle}>
                              {t(subitem.title)}
                            </span>
                          </a>
                        </Link>
                      </Item>
                    ))}
                  </SubMenu>
                ))}
              </Menu>
            </>
          ) : (
            <Link href="/signout">
              <div className={styles.signout}>
                <img src="/static/images/menu/signout.svg" alt={t('signout')} />
                <span>{t('signout')}</span>
              </div>
            </Link>
          )}
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

const EnhancedWrapper = withNamespaces('common')(withRouter(Wrapper));

const WrapperWithData = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => (
  <Query<initAdmin>
    query={gql`
      query initAdmin {
        viewer {
          id
          groupId
          role
          store {
            id
            adminStatus
            domain
            defaultDomain
            locale
            setting {
              activityVersion
            }
          }
        }
        getStoreAppList {
          data {
            id
            plugin
            isInstalled
          }
        }
        getAuthorityList {
          data {
            id
            permission {
              order {
                index
                paymentStatus
                shipmentStatus
                status
                create
                export
              }
              product {
                index
                create
                update
                remove
                cost
                export
              }
              design {
                index
              }
              user {
                index
                create
                update
                export
                remove
              }
              service {
                index
                product
              }
              store {
                index
                payment
                shipment
                exportSetting
              }
              file {
                index
              }
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading || error)
        return (
          <Spin
            className={styles.spin}
            indicator={<Icon type="loading" spin />}
          />
        );
      return (
        <EnhancedWrapper {...(data as PropsType)}>{children}</EnhancedWrapper>
      );
    }}
  </Query>
);

export default WrapperWithData;
