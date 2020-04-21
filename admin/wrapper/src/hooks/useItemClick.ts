// typescript
import useMenuListType from './useMenuList';

// import
import { useCallback, useState, useMemo } from 'react';

import { useRouter } from '@admin/link';

import { URLS } from './useMenuList';

// definition
const ADDITIONAL_URLS: { [key: string]: RegExp[] } = {
  dashboard: [/^\/$/],
};

export default (
  menuList: ReturnType<typeof useMenuListType>,
  collapsed: boolean,
): {
  openKeys: string[];
  selectedKeys: string[];
  onOpenChange: (openKeys: string[]) => void;
} => {
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  return {
    openKeys,
    selectedKeys: useMemo(
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
    ),
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
