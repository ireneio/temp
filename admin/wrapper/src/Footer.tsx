// import
import React from 'react';
import { Menu, Tooltip } from 'antd';

import { useTranslation } from '@meepshop/utils/lib/i18n';
import { MoreIcon } from '@meepshop/icons';
import Switch from '@meepshop/switch';
import Link from '@meepshop/link';

import useFooterMenuList from './hooks/useFooterMenuList';
import styles from './styles/footer.less';

// graphql typescript
import { useFooterMenuListFragment as useFooterMenuListFragmentType } from './hooks/__generated__/useFooterMenuListFragment';

// typescript definition
interface PropsType {
  store: useFooterMenuListFragmentType | null;
  isMerchant: boolean;
  collapsed: boolean;
  isNotOpened: boolean;
}

// definition
const { SubMenu, Item: MenuItem } = Menu;

export default React.memo(
  ({ store, isMerchant, collapsed, isNotOpened }: PropsType) => {
    const { t } = useTranslation('common');
    const { selectedKeys, menuList } = useFooterMenuList(store, isMerchant);

    return (
      <div className={`${styles.root} ${collapsed ? styles.collapsed : ''}`}>
        {collapsed ? (
          <Menu selectedKeys={selectedKeys}>
            <SubMenu
              popupOffset={[0, 0]}
              popupClassName={styles.popMenu}
              title={<MoreIcon />}
            >
              {[...menuList.slice(1), ...menuList.slice(0, 1)].map(
                ({ key, Icon, url, target }) => (
                  <Switch
                    key={key}
                    render={(children: React.ReactElement, props: {}) => (
                      <Link href={url} target={target}>
                        <a href={url}>{React.cloneElement(children, props)}</a>
                      </Link>
                    )}
                    isTrue
                  >
                    <MenuItem
                      key={key}
                      disabled={
                        isNotOpened &&
                        !['signout', 'bill-payment'].includes(key)
                      }
                    >
                      <Icon />

                      {t(key)}
                    </MenuItem>
                  </Switch>
                ),
              )}
            </SubMenu>
          </Menu>
        ) : (
          menuList.map(({ key, Icon, url, target }) => (
            <Link
              key={key}
              href={url}
              target={target}
              disabled={
                isNotOpened && !['signout', 'bill-payment'].includes(key)
              }
            >
              <a
                className={`${styles.item} ${
                  selectedKeys.includes(key) ? styles.selected : ''
                } ${
                  isNotOpened && !['signout', 'bill-payment'].includes(key)
                    ? styles.disabled
                    : ''
                }`}
                href={url}
              >
                <Tooltip title={t(key)}>
                  <Icon />
                </Tooltip>
              </a>
            </Link>
          ))
        )}
      </div>
    );
  },
);
