// typescript import
import { I18nPropsType } from '@admin/utils/lib/i18n';
import { SingletonRouter } from 'next/router';
import { MenuItemType } from './constants';

// import
import React from 'react';
import { withRouter } from 'next/router';
import Link from 'next/link';
import gql from 'graphql-tag';
import { Query } from '@apollo/react-components';
import { Layout, Menu, Spin, Icon, Popover, Tooltip } from 'antd';
import memoizeOne from 'memoize-one';
import { areEqual } from 'fbjs';
import idx from 'idx';

import { withTranslation } from '@admin/utils/lib/i18n';

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
const { Item } = Menu;

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
        isClosed:
          idx(viewer, _ => _.store.adminStatus) === 'CLOSED_BILL_NOT_PAID',
      };
    },
    areEqual,
  );

  public componentDidMount(): void {
    this.checkStatus();
  }

  public componentDidUpdate(): void {
    this.checkStatus();
  }

  private checkStatus = (): void => {
    const { viewer, router } = this.props;

    if (idx(viewer, _ => _.store.adminStatus) === 'CLOSED_BILL_NOT_PAID')
      router.replace('/bill-payment');
  };

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
      isClosed,
    } = this.getMenuParams({ viewer, getStoreAppList, getAuthorityList });
    const rootPath = pathname.split('/')[1];

    return (
      <Layout className={styles.layout}>
        <Sider
          className={`${styles.sider} ${isClosed && styles.closed}`}
          width="55"
        >
          {isClosed ? (
            <Link href="/signout">
              <div className={styles.signout}>
                <img src="/static/images/menu/signout.svg" alt={t('signout')} />
                <span>{t('signout')}</span>
              </div>
            </Link>
          ) : (
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
                }).map(({ src, title, path, sub }: MenuItemType) =>
                  sub ? (
                    <Item key={title}>
                      <Popover
                        overlayClassName={styles.popover}
                        placement="rightTop"
                        content={(sub || []).map(subitem => (
                          <div key={subitem.title} className={styles.subitem}>
                            <Link href={subitem.path as string}>
                              <a href={subitem.path} target={subitem.target}>
                                <img src={subitem.src} alt={t(subitem.title)} />
                                <span>{t(subitem.title)}</span>
                              </a>
                            </Link>
                          </div>
                        ))}
                      >
                        <div>
                          <img src={src} alt={t(title)} />
                        </div>
                      </Popover>
                    </Item>
                  ) : (
                    <Item key={title}>
                      <Tooltip
                        placement="right"
                        overlayClassName={styles.tooltip}
                        title={t(title)}
                      >
                        <div>
                          <Link href={path as string}>
                            <a href={path}>
                              <img src={src} alt={t(title)} />
                            </a>
                          </Link>
                        </div>
                      </Tooltip>
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
                  <Item key={title}>
                    <Popover
                      overlayClassName={styles.popover}
                      placement="rightBottom"
                      content={(sub || []).map(subitem => (
                        <div key={subitem.title} className={styles.subitem}>
                          <Link href={subitem.path as string}>
                            <a href={subitem.path} target={subitem.target}>
                              <img src={subitem.src} alt={t(subitem.title)} />
                              <span>{t(subitem.title)}</span>
                            </a>
                          </Link>
                        </div>
                      ))}
                    >
                      <div key={title}>
                        <img src={src} alt={t(title)} />
                      </div>
                    </Popover>
                  </Item>
                ))}
              </Menu>
            </>
          )}
        </Sider>
        <Layout>
          <Content>{children}</Content>
        </Layout>
      </Layout>
    );
  }
}

const EnhancedWrapper = withTranslation('common')(withRouter(Wrapper));

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
