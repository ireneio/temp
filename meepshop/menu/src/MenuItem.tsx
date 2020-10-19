// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Menu, Badge } from 'antd';

import Switch from '@meepshop/switch';

import Title from './Title';
import usePagesWithAction from './hooks/usePagesWithAction';
import useClick from './hooks/useClick';
import { ACION_TYPES } from './constants';

// graphql typescript
import { menuItemUserFragment as menuItemUserFragmentType } from './gqls/__generated__/menuItemUserFragment';
import { menuItemOrderFragment as menuItemOrderFragmentType } from './gqls/__generated__/menuItemOrderFragment';
import { menuItemMenuPageObjectTypeFragment as menuItemMenuPageObjectTypeFragmentType } from './gqls/__generated__/menuItemMenuPageObjectTypeFragment';
import { menuItemMenuDesignObjectTypeFragment as menuItemMenuDesignObjectTypeFragmentType } from './gqls/__generated__/menuItemMenuDesignObjectTypeFragment';

// graphql import
import {
  menuItemUserFragment,
  menuItemOrderFragment,
  menuItemMenuPageObjectTypeFragment,
  menuItemMenuDesignObjectTypeFragment,
} from './gqls/menuItem';
import {
  titleUserFragment,
  titleMenuPageObjectTypeFragment,
  titleMenuDesignObjectTypeFragment,
} from './gqls/title';
import {
  usePagesWithActionUserFragment,
  usePagesWithActionMenuPageObjectTypeFragment,
} from './gqls/usePagesWithAction';
import {
  useClickUserFragment,
  useClickMenuPageObjectTypeFragment,
} from './gqls/useClick';

// typescript definition
export interface PropsType {
  user: menuItemUserFragmentType | null;
  order: menuItemOrderFragmentType | null;
  page: menuItemMenuPageObjectTypeFragmentType & {
    pages?: (PropsType['page'] | null)[] | null;
  };
  design: menuItemMenuDesignObjectTypeFragmentType | null;
}

// definition
const { Item, SubMenu } = Menu;
const MenuItem = React.memo(
  ({ user, order, page: { action, ...page }, design, ...props }: PropsType) => {
    const pagesWithAction = usePagesWithAction(
      !user ? null : filter(usePagesWithActionUserFragment, user),
      filter(usePagesWithActionMenuPageObjectTypeFragment, { ...page, action }),
    );
    const click = useClick(
      !user ? null : filter(useClickUserFragment, user),
      filter(useClickMenuPageObjectTypeFragment, { ...page, action }),
    );
    const pages = pagesWithAction || page?.pages || [];

    return (
      <Switch
        isTrue={ACION_TYPES[action || 0] === 'CART'}
        render={children => (
          <Badge
            count={order?.categories?.[0]?.products
              ?.filter(product => product?.type === 'product')
              .reduce(
                (result, product) => result + (product?.quantity || 0),
                0,
              )}
            showZero={false}
          >
            {children}
          </Badge>
        )}
      >
        {pages.length === 0 ? (
          <Item {...props} onClick={click}>
            <Title
              user={!user ? null : filter(titleUserFragment, user)}
              page={filter(titleMenuPageObjectTypeFragment, {
                ...page,
                action,
              })}
              design={
                !design
                  ? null
                  : filter(titleMenuDesignObjectTypeFragment, design)
              }
            />
          </Item>
        ) : (
          <SubMenu
            {...props}
            onTitleClick={click}
            title={
              <Title
                user={!user ? null : filter(titleUserFragment, user)}
                page={filter(titleMenuPageObjectTypeFragment, {
                  ...page,
                  action,
                })}
                design={
                  !design
                    ? null
                    : filter(titleMenuDesignObjectTypeFragment, design)
                }
              />
            }
          >
            {pages.map(subPage =>
              !subPage ? null : (
                <MenuItem
                  key={subPage.id}
                  order={!order ? null : filter(menuItemOrderFragment, order)}
                  user={!user ? null : filter(menuItemUserFragment, user)}
                  page={{
                    ...filter(menuItemMenuPageObjectTypeFragment, subPage),
                    pages: subPage.pages,
                  }}
                  design={
                    !design
                      ? null
                      : filter(menuItemMenuDesignObjectTypeFragment, design)
                  }
                />
              ),
            )}
          </SubMenu>
        )}
      </Switch>
    );
  },
);

export default MenuItem;
