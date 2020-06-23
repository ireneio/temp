// typescript
import useMenuListType, { MenuListType } from './useMenuList';

// import
import { useCallback, useState, useMemo, useRef } from 'react';

import { useRouter } from '@meepshop/link';

import { MENU_LIST, URLS } from './useMenuList';

// definition
const ADDITIONAL_URLS: { [key: string]: RegExp[] } = {
  dashboard: [/^\/$/],
};

const findOpenKeys = (
  selectedKeys: string[],
  menuList: MenuListType = MENU_LIST,
  parentMenuList: string[] = [],
): string[] =>
  menuList.reduce((result: string[], key: MenuListType[number]) => {
    if (key instanceof Array)
      return [
        ...result,
        ...findOpenKeys(selectedKeys, key[1], [...parentMenuList, key[0]]),
      ];

    if (key === selectedKeys[0]) return [...result, ...parentMenuList, key];

    return result;
  }, []);

export default (
  menuList: ReturnType<typeof useMenuListType>,
  collapsed: boolean,
): {
  openKeys: string[];
  selectedKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
} => {
  const router = useRouter();
  const prevRef = useRef({
    pathname: router.pathname,
    collapsed,
  });
  const selectedKeys = useMemo(
    () =>
      [
        Object.keys(URLS).find(key =>
          [
            new RegExp(`^${URLS[key]}$`),
            new RegExp(`^${URLS[key]}/.*`),
            ...(ADDITIONAL_URLS[key] || []),
          ].some(pattern => pattern.test(router.pathname)),
        ),
      ].filter(Boolean) as string[],
    [router],
  );
  const [openKeys, setOpenKeys] = useState<string[]>(
    collapsed ? [] : findOpenKeys(selectedKeys),
  );

  if (prevRef.current.pathname !== router.pathname) {
    if (!collapsed) setOpenKeys(findOpenKeys(selectedKeys));

    prevRef.current.pathname = router.pathname;
  }

  if (prevRef.current.collapsed !== collapsed) {
    setOpenKeys(!collapsed ? findOpenKeys(selectedKeys) : []);
    prevRef.current.collapsed = collapsed;
  }

  return {
    openKeys,
    selectedKeys,
    onOpenChange: useCallback(
      (newOpenKeys: string[]) => {
        const [newKeys] = newOpenKeys.slice(-1);

        if (collapsed) {
          setOpenKeys([newKeys]);
          return;
        }

        const item = menuList.find(({ key }) => key === newKeys);

        if (item && !item.items) return;

        setOpenKeys([newKeys]);
      },
      [menuList, collapsed, setOpenKeys],
    ),
  };
};
