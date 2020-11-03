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
    !menu?.design ? null : filter(usePagesWithSearchBarFragment, menu.design),
  );
  const pages = [...(menu?.pages || []), ...pagesWithSearchBar];

  return pages.length === 0 ? null : (
    <Menu>
      {pages.map(page =>
        !page ? null : (
          <MenuItem
            key={page.id}
            user={!viewer ? null : filter(menuItemUserFragment, viewer)}
            order={
              !cart?.data?.[0]
                ? null
                : filter(menuItemOrderFragment, cart.data[0])
            }
            page={{
              ...filter(menuItemMenuPageObjectTypeFragment, page),
              pages: page.pages,
            }}
            design={
              !menu?.design
                ? null
                : filter(menuItemMenuDesignObjectTypeFragment, menu.design)
            }
          />
        ),
      )}
    </Menu>
  );
});
