// typescript import
import { MenuItemProps } from 'antd/lib/menu/MenuItem';

// import
import React from 'react';
import { filter } from 'graphql-anywhere';
import { Menu, Badge } from 'antd';

import Switch from '@meepshop/switch';

import Title from './Title';
import usePagesWithAction from './hooks/usePagesWithAction';
import useClick from './hooks/useClick';
import styles from './styles/menuItem.less';
import { ACION_TYPES, BUILTIN_PLACEMENTS } from './constants';

// graphql typescript
import {
  menuItemUserFragment as menuItemUserFragmentType,
  menuItemOrderFragment as menuItemOrderFragmentType,
  menuItemMenuPageObjectTypeFragment as menuItemMenuPageObjectTypeFragmentType,
  menuItemMenuDesignObjectTypeFragment as menuItemMenuDesignObjectTypeFragmentType,
} from '@meepshop/types/gqls/meepshop';

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
export interface PropsType extends MenuItemProps {
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
      filter(usePagesWithActionUserFragment, user),
      filter(usePagesWithActionMenuPageObjectTypeFragment, { ...page, action }),
    );
    const click = useClick(
      filter(useClickUserFragment, user),
      filter(useClickMenuPageObjectTypeFragment, { ...page, action }),
    );
    const pages = pagesWithAction || page?.pages || [];
    const { level } = props;

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
          <Item
            {...props}
            className={`${styles.root} ${styles[`menu-${level}`]}`}
            onClick={click}
          >
            <Title
              user={filter(titleUserFragment, user)}
              page={filter(titleMenuPageObjectTypeFragment, {
                ...page,
                action,
              })}
              design={filter(titleMenuDesignObjectTypeFragment, design)}
            />
          </Item>
        ) : (
          <SubMenu
            {...props}
            className={`${styles.root} ${styles[`menu-${level}`]}`}
            popupClassName={styles.popup}
            onTitleClick={click}
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore antd does not include rc-menu typescript
            builtinPlacements={level === 1 ? BUILTIN_PLACEMENTS : undefined}
            title={
              <Title
                user={filter(titleUserFragment, user)}
                page={filter(titleMenuPageObjectTypeFragment, {
                  ...page,
                  action,
                })}
                design={filter(titleMenuDesignObjectTypeFragment, design)}
              />
            }
          >
            {pages.map(subPage =>
              !subPage ? null : (
                <MenuItem
                  key={subPage.id}
                  order={filter(menuItemOrderFragment, order)}
                  user={filter(menuItemUserFragment, user)}
                  page={{
                    ...filter(menuItemMenuPageObjectTypeFragment, subPage),
                    pages: subPage.pages,
                  }}
                  design={filter(menuItemMenuDesignObjectTypeFragment, design)}
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
