// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Menu } from 'antd';

import Logo from './Logo';
import MenuItem from './MenuItem';
import usePagesWithSearchBar from './hooks/usePagesWithSearchBar';

// graphql typescript
import { menuMenuModuleFragment } from './gqls/__generated__/menuMenuModuleFragment';

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
import { usePagesWithSearchBarFragment } from './gqls/usePagesWithSearchBar';

// definition
export default React.memo(({ menu, cart, viewer }: menuMenuModuleFragment) => {
  const pagesWithSearchBar = usePagesWithSearchBar(
    filter(usePagesWithSearchBarFragment, menu?.design || null),
  );

  if (!menu) return null;

  const { design } = menu;
  const pages = [...(menu?.pages || []), ...pagesWithSearchBar];

  return pages.length === 0 ? null : (
    <div>
      <Logo
        viewer={filter(logoUserFragment, viewer)}
        design={filter(logoMenuDesignObjectTypeFragment, design)}
      />

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
    </div>
  );
});
