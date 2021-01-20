// import
import React, { useContext } from 'react';
import { filter } from 'graphql-anywhere';
import { Menu, Icon } from 'antd';
import transformColor from 'color';

import { Colors as ColorsContext } from '@meepshop/context';

import Logo from './Logo';
import MenuItem from './MenuItem';
import Styles from './Styles';
import usePagesWithSearchBar from './hooks/usePagesWithSearchBar';
import { DEFAULT_COLOR_WITH_PATTERN } from './constants';
import styles from './styles/index.less';

// graphql typescript
import { menuMenuModuleFragment } from '@meepshop/types/gqls/meepshop';

// graphql import
import {
  logoUserFragment,
  logoMenuDesignObjectTypeFragment,
} from './gqls/logo';
import {
  menuItemUserFragment,
  menuItemOrderFragment,
  menuItemMenuPageObjectTypeFragment,
  menuItemMenuDesignObjectTypeFragment,
} from './gqls/menuItem';
import { stylesFragment } from './gqls/styles';
import { usePagesWithSearchBarFragment } from './gqls/usePagesWithSearchBar';

// definition
export default React.memo(({ menu, cart, viewer }: menuMenuModuleFragment) => {
  const colors = useContext(ColorsContext);
  const pagesWithSearchBar = usePagesWithSearchBar(
    filter(usePagesWithSearchBarFragment, menu?.design || null),
  );

  if (!menu) return null;

  const { id, logoAlignment, design } = menu;
  const pages = [...(menu.pages || []), ...pagesWithSearchBar];
  const selected = DEFAULT_COLOR_WITH_PATTERN[design?.pattern || 0];

  return pages.length === 0 ? null : (
    <div
      id={`menu-${id}`}
      className={`${styles.root} ${styles[design?.alignment || 'left']} ${
        styles[logoAlignment || 'LEFT']
      }`}
      style={{
        fill: design?.normal?.color || colors[selected[1]],
        color: design?.normal?.color || colors[selected[1]],
        background: transformColor(
          design?.normal?.background || colors[selected[0]],
        )
          .alpha(design?.opacity || 1)
          .toString(),
        fontSize: `${design?.fontSize}px`,
        fontFamily:
          design?.font === '黑體'
            ? 'PingFang TC,微軟正黑體,Microsoft JhengHei,Helvetica Neue,Helvetica,source-han-sans-traditional,Arial,sans-serif'
            : `${design?.font},微軟正黑體,Microsoft JhengHei,sans-serif`,
      }}
    >
      <Logo
        viewer={filter(logoUserFragment, viewer)}
        design={filter(logoMenuDesignObjectTypeFragment, design)}
      />

      <Menu
        className={styles.menu}
        mode={design?.expandSubItem ? 'inline' : 'vertical'}
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore antd does not include rc-menu typescript
        expandIcon={({ isOpen }) => (
          <Icon
            className={`${styles.icon} ${
              isOpen ? styles.opened : styles.closed
            }`}
            type="down"
          />
        )}
      >
        {pages.map(page =>
          !page ? null : (
            <MenuItem
              key={page.id}
              user={filter(menuItemUserFragment, viewer)}
              order={filter(menuItemOrderFragment, cart?.data?.[0] || null)}
              page={{
                ...filter(menuItemMenuPageObjectTypeFragment, page),
                pages: page.pages,
              }}
              design={filter(menuItemMenuDesignObjectTypeFragment, design)}
            />
          ),
        )}
      </Menu>

      <Styles
        id={id || 'null id' /* SHOULD_NOT_BE_NULL */}
        design={filter(stylesFragment, design)}
      />
    </div>
  );
});
