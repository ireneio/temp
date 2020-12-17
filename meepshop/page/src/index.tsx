// import
import React from 'react';
import { filter } from 'graphql-anywhere';

import Menu from '@meepshop/menu';

import styles from './styles/index.less';

// graphql typescript
import { pageUserFragment } from './gqls/__generated__/pageUserFragment';
import { pageOrderListFragment } from './gqls/__generated__/pageOrderListFragment';
import { pagePageFragment } from './gqls/__generated__/pagePageFragment';

// graphql import
import { menuMenuModuleFragment } from '@meepshop/menu/gqls';

// typescript definition
interface PropsType {
  viewer: pageUserFragment | null;
  cart: pageOrderListFragment | null;
  page: pagePageFragment | null;
  Menu?: typeof Menu;
  children: React.ReactNode;
}

// definition
export default React.memo(
  ({ viewer, cart, page, Menu: LayoutMenu = Menu, children }: PropsType) => {
    const container = page?.container || 'DefaultContainer';
    const defaultMenuProps = {
      __typename: 'MenuModule' as 'MenuModule',
      viewer,
      cart,
    };

    return (
      <div className={styles.root}>
        <div>
          {['DefaultContainer', 'Sidebar'].includes(container) ||
          !page?.firstTop?.menu ? null : (
            <LayoutMenu
              {...filter(menuMenuModuleFragment, {
                ...defaultMenuProps,
                id: page.firstTop.menu.id || 'null-id', // SHOULD_NOT_BE_NULL
                menu: page.firstTop.menu,
              })}
            />
          )}

          {!['TwoTopsContainer', 'TwoTopsContainerWithSidebar'].includes(
            container,
          ) || !page?.secondTop?.menu ? null : (
            <LayoutMenu
              {...filter(menuMenuModuleFragment, {
                ...defaultMenuProps,
                id: page.secondTop.menu.id || 'null-id', // SHOULD_NOT_BE_NULL
                menu: page.secondTop.menu,
              })}
            />
          )}

          <div>
            {![
              'FixedTopContainerWithSidebar',
              'TwoTopsContainerWithSidebar',
            ].includes(container) || !page?.sidebar?.menu ? null : (
              <div>
                <LayoutMenu
                  {...filter(menuMenuModuleFragment, {
                    ...defaultMenuProps,
                    id: page.sidebar.menu.id || 'null-id', // SHOULD_NOT_BE_NULL
                    menu: page.sidebar.menu,
                  })}
                />
              </div>
            )}

            <div>
              {children}

              {!page?.useBottom || !page?.bottom?.menu ? null : (
                <LayoutMenu
                  {...filter(menuMenuModuleFragment, {
                    ...defaultMenuProps,
                    id: page.bottom.menu.id || 'null-id', // SHOULD_NOT_BE_NULL
                    menu: page.bottom.menu,
                  })}
                />
              )}
            </div>
          </div>
        </div>

        {viewer?.store?.experiment?.hiddingMeepshopMaxInFooterEnabled ? null : (
          <footer className={styles.footer}>
            <a
              href="https://meepshop.cc/8h1kG"
              target="_blank"
              rel="noopener noreferrer"
            >
              meepShop MAX 極速開店
            </a>
          </footer>
        )}
      </div>
    );
  },
);
