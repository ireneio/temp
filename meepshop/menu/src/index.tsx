// typescript import
import { ContextType } from './gqls';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Menu } from 'antd';

import MenuItem from './MenuItem';
import usePagesWithSearchBar from './hooks/usePagesWithSearchBar';

// graphql typescript
import { menuMenuModuleFragment } from './gqls/__generated__/menuMenuModuleFragment';

// graphql import
import {
  menuItemUserFragment,
  menuItemOrderFragment,
  menuItemMenuPageObjectTypeFragment,
  menuItemMenuDesignObjectTypeFragment,
} from './gqls/menuItem';
import { usePagesWithSearchBarFragment } from './gqls/usePagesWithSearchBar';

// typescript definition
export interface PropsType extends menuMenuModuleFragment, ContextType {}

// definition
export default React.memo(({ menu, user, order }: PropsType) => {
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
            user={!user ? null : filter(menuItemUserFragment, user)}
            order={!order ? null : filter(menuItemOrderFragment, order)}
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
