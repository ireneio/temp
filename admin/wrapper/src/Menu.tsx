// import
import React from 'react';
import { Menu } from 'antd';

import { useTranslation } from '@meepshop/locales';
import { LeftIcon } from '@meepshop/icons';
import Switch, { switchRender } from '@meepshop/switch';
import Link from '@meepshop/link';

import useMenuList from './hooks/useMenuList';
import useItemClick from './hooks/useItemClick';
import styles from './styles/menu.less';

// graphql typescript
import { useMenuListFragment as useMenuListFragmentType } from '@meepshop/types/gqls/admin';

// typescript definition
interface PropsType {
  isTrial: boolean;
  isMerchant: boolean;
  permission: useMenuListFragmentType | null;
  collapsed: boolean;
  loading: boolean;
  isNotOpened: boolean;
}

// definition
const { Item: MenuItem, SubMenu, ItemGroup } = Menu;

export default React.memo(
  ({
    isTrial,
    isMerchant,
    permission,
    collapsed,
    loading,
    isNotOpened,
  }: PropsType) => {
    const { t } = useTranslation('common');
    const menuList = useMenuList(isMerchant, permission);
    const { openKeys, selectedKeys, onOpenChange } = useItemClick(
      menuList,
      collapsed,
    );

    return (
      <Menu
        className={`${styles.root} ${collapsed ? styles.collapsed : ''} ${
          isNotOpened ? styles.isNotOpened : ''
        } ${isTrial ? styles.isTrial : ''}`}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={onOpenChange}
        inlineIndent={25}
        mode="inline"
      >
        {menuList.map(({ key, Icon, items, url }) => (
          <SubMenu
            key={key}
            disabled={isNotOpened}
            popupOffset={[0, 0]}
            popupClassName={`${styles.popMenu} ${
              loading ? styles.loading : ''
            } ${!items ? styles.noSubMenu : ''} ${
              selectedKeys.includes(key) ? styles.selected : ''
            }`}
            title={
              <Switch
                isTrue={Boolean(url)}
                render={children => (
                  <Link href={url as string}>
                    <a href={url}>{children}</a>
                  </Link>
                )}
              >
                <div
                  className={`${styles.title} ${
                    !items ? styles.noSubMenu : ''
                  } ${
                    openKeys.includes(key) ||
                    selectedKeys.includes(key) ||
                    (collapsed &&
                      items?.some(({ key: itemKey }) =>
                        selectedKeys.includes(itemKey),
                      ))
                      ? styles.selected
                      : ''
                  }`}
                >
                  {!Icon ? null : <Icon className={styles.prefixIcon} />}

                  {t(key)}

                  <LeftIcon
                    className={`${styles.expandIcon} ${
                      loading ? styles.loading : ''
                    }`}
                  />
                </div>
              </Switch>
            }
          >
            {switchRender({
              isTrue: collapsed,
              render: children => (
                <ItemGroup title={t(key)}>{children}</ItemGroup>
              ),
              children: items?.map(item => (
                <Switch
                  key={item.key}
                  isTrue={Boolean(item.url)}
                  render={(children: React.ReactElement, props: {}) => (
                    <Link href={item.url as string}>
                      <a href={item.url}>
                        {React.cloneElement(children, props)}
                      </a>
                    </Link>
                  )}
                >
                  <MenuItem key={item.key} disabled={isNotOpened}>
                    {t(item.key)}
                  </MenuItem>
                </Switch>
              )),
            })}
          </SubMenu>
        ))}
      </Menu>
    );
  },
);
