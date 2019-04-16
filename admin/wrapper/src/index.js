import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Layout, Menu, Spin } from 'antd';
import memoizeOne from 'memoize-one';
import { areEqual } from 'fbjs';

import { withNamespaces } from '@admin/utils/lib/i18n';

import generateMenu from './utils/generateMenu';
import generateController from './utils/generateController';
import styles from './styles/index.less';

const { Content, Sider } = Layout;
const { Item, SubMenu } = Menu;

@withNamespaces('common')
@withRouter
class Wrapper extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    router: PropTypes.shape({}).isRequired,
    data: PropTypes.shape({}).isRequired,
    t: PropTypes.func.isRequired,
  };

  getMenuParams = memoizeOne(
    ({ viewer, getStoreAppList, getAuthorityList }) => {
      const activityVersion = viewer?.store.setting.activityVersion;
      return {
        storeAppList: getStoreAppList?.data?.reduce(
          (list, { plugin, isInstalled }) => {
            // eslint-disable-next-line no-param-reassign
            list[plugin] = Boolean(isInstalled);
            return list;
          },
          {},
        ),
        permission: getAuthorityList?.data?.find(
          list => list.id === viewer?.groupId,
        )?.permission,
        domain: viewer?.store.domain?.[0] || viewer?.store.defaultDomain,
        isMerchant: viewer?.role === 'MERCHANT',
        isOldActivityVersion: !activityVersion || activityVersion === 1,
        isAdminOpen: !(viewer?.store.adminStatus === 'CLOSED_BILL_NOT_PAID'),
      };
    },
    areEqual,
  );

  render() {
    const {
      children,
      router: { pathname },
      data,
      t,
    } = this.props;
    const {
      storeAppList,
      permission,
      domain,
      isMerchant,
      isOldActivityVersion,
      isAdminOpen,
    } = this.getMenuParams({ ...data });
    const path = pathname.split('/')[1];

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
                selectedKeys={[path]}
              >
                {generateMenu({
                  storeAppList,
                  permission,
                  isMerchant,
                  isOldActivityVersion,
                }).map(item => {
                  if (item.sub) {
                    return (
                      <SubMenu
                        className={styles.submenu}
                        key={item.title}
                        title={<img src={item.src} alt={t(item.title)} />}
                      >
                        {item.sub.map(subitem => (
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
                    );
                  }
                  return (
                    <Item key={item.title}>
                      <Link href={item.path}>
                        <a href={item.path}>
                          <img src={item.src} alt={t(item.title)} />
                        </a>
                      </Link>
                    </Item>
                  );
                })}
              </Menu>
              <Menu
                className={styles.menu}
                mode="vertical"
                selectedKeys={[path]}
              >
                {generateController({
                  domain,
                  isMerchant,
                }).map(item => (
                  <SubMenu
                    className={styles.submenu}
                    key={item.title}
                    title={
                      <img
                        className={styles.controller}
                        src={item.src}
                        alt={t(item.title)}
                      />
                    }
                  >
                    {item.sub.map(subitem => (
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

export default props => (
  <Query
    query={gql`
      query initAdmin {
        viewer {
          id
          groupId
          role
          store {
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
    {({ loading, error, data = {} }) => {
      if (loading || error) return <Spin />;

      return <Wrapper data={data} {...props} />;
    }}
  </Query>
);
