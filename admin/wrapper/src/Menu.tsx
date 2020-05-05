// import
import React from 'react';
import { Menu } from 'antd';

import { useTranslation } from '@admin/utils/lib/i18n';
import Switch, { switchRender } from '@admin/switch';
import Link from '@admin/link';
import { LeftIcon } from '@meepshop/icons';

import useMenuList from './hooks/useMenuList';
import useItemClick from './hooks/useItemClick';
import styles from './styles/menu.less';

// graphql typescript
import { useMenuListpermissionObjFragment as useMenuListpermissionObjFragmentType } from './hooks/__generated__/useMenuListpermissionObjFragment';
import { useMenuListpermissionStoreAppFragment as useMenuListpermissionStoreAppFragmentType } from './hooks/__generated__/useMenuListpermissionStoreAppFragment';

// typescript definition
interface PropsType {
  isMerchant: boolean;
  permission: useMenuListpermissionObjFragmentType | null;
  storeApps: (useMenuListpermissionStoreAppFragmentType | null)[] | null;
  collapsed: boolean;
  loading: boolean;
  isNotOpened: boolean;
}

// definition
const { Item: MenuItem, SubMenu, ItemGroup } = Menu;

export default React.memo(
  ({
    isMerchant,
    permission,
    storeApps,
    collapsed,
    loading,
    isNotOpened,
  }: PropsType) => {
    const { t } = useTranslation('common');
    const menuList = useMenuList(isMerchant, permission, storeApps);
    const { openKeys, selectedKeys, onOpenChange } = useItemClick(
      menuList,
      collapsed,
    );

    return (
      <Menu
        className={`${styles.root} ${collapsed ? styles.collapsed : ''} ${
          isNotOpened ? styles.isNotOpened : ''
        }`}
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
