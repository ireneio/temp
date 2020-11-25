// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Menu } from 'antd';

import MenuItem from './MenuItem';
import usePagesWithSearchBar from './hooks/usePagesWithSearchBar';

// graphql typescript
import { menuFragment } from './gqls/__generated__/menuFragment';

// graphql import
import {
  menuItemUserFragment,
  menuItemOrderFragment,
  menuItemMenuPageObjectTypeFragment,
  menuItemMenuDesignObjectTypeFragment,
} from './gqls/menuItem';
import { usePagesWithSearchBarFragment } from './gqls/usePagesWithSearchBar';

// definition
export default React.memo(({ menu, cart, viewer }: menuFragment) => {
  const pagesWithSearchBar = usePagesWithSearchBar(
    filter(usePagesWithSearchBarFragment, menu?.design || null),
  );

  if (!menu) return null;

  const { design } = menu;
  const pages = [...(menu?.pages || []), ...pagesWithSearchBar];

  return pages.length === 0 ? null : (
    <Menu>
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
  );
});
