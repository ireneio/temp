import React from 'react';
import PropTypes from 'prop-types';
import areEqual from 'fbjs/lib/areEqual';
import radium, { StyleRoot } from 'radium';
import BarsIcon from 'react-icons/lib/fa/bars';

import { enhancer } from 'layout';
import MenuItem from 'menu/menuItem';
import Image from 'image';
import { COLOR_TYPE, STORE_SETTING_TYPE } from 'constants/propTypes';

import MobileSidebar from './MobileSidebar';
import * as styles from './styles';

@enhancer
@radium
export default class MobileLayout extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,

    /** props */
    fixedtop: PropTypes.shape({}), // eslint-disable-line react/no-unused-prop-types
    secondtop: PropTypes.shape({}), // eslint-disable-line react/no-unused-prop-types
    sidebar: PropTypes.shape({}), // eslint-disable-line react/no-unused-prop-types
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    fixedtop: null,
    secondtop: null,
    sidebar: null,
  };

  state = {
    design: {},
    pages: [],
    additionPages: [],
    isOpened: false,
  };

  static getDerivedStateFromProps(nextProps, preState) {
    const { fixedtop, secondtop, sidebar } = nextProps;
    const nextState = {};

    const design =
      (fixedtop && fixedtop.menu.design) ||
      (secondtop && secondtop.menu.design) ||
      (sidebar && sidebar.menu.sidebar);
    const { pages, additionPages } = [
      ...((fixedtop && fixedtop.menu.pages) || []),
      ...((secondtop && secondtop.menu.pages) || []),
      ...((sidebar && sidebar.menu.pages) || []),
    ].reduce(
      (result, { id, action, ...page }) => {
        const { pages: newPages, additionPages: newAdditionPages } = result;
        const newPage = {
          ...page,
          id,
          action,
          icon: { use: false },
        };

        if (
          [...newPages, ...newAdditionPages].some(
            ({ id: newPageId }) => newPageId === id,
          )
        )
          return result;

        if ([5, 8].includes(action)) {
          if (
            newAdditionPages.some(
              ({ action: additionPageAction }) => additionPageAction === action,
            )
          )
            return result;

          return {
            pages: newPages,
            additionPages: [...newAdditionPages, newPage],
          };
        }

        return {
          pages: [...newPages, newPage],
          additionPages: newAdditionPages,
        };
      },
      { pages: [], additionPages: [] },
    );

    if (!areEqual(design, preState.design)) nextState.design = design;

    if (!areEqual(pages, preState.pages)) nextState.pages = pages;

    if (!areEqual(additionPages, preState.additionPages))
      nextState.additionPages = additionPages.sort(
        (a, b) => a.action < b.action,
      );

    if (Object.keys(nextState).length !== 0) return nextState;

    return null;
  }

  toggleSidebar = () => {
    const { isOpened } = this.state;

    document.querySelector('body').style.overflow = isOpened
      ? 'initial'
      : 'hidden';
    this.setState({ isOpened: !isOpened });
  };

  render() {
    const { colors, storeSetting, children, ...props } = this.props;
    const { design, pages, additionPages, isOpened } = this.state;

    const { mobileLogoUrl } = storeSetting;

    return (
      <React.Fragment>
        <StyleRoot style={styles.root}>{children}</StyleRoot>

        <StyleRoot>
          <header style={styles.header(colors)}>
            <div style={styles.buttonRoot}>
              {pages.length === 0 ? null : (
                <BarsIcon style={styles.icon} onClick={this.toggleSidebar} />
              )}
            </div>

            <div style={styles.logoWrapper}>
              {!mobileLogoUrl ? null : (
                <div style={styles.logo}>
                  <Image
                    style={styles.logo}
                    files={{ image: mobileLogoUrl, href: '/' }}
                    contentWidth={100}
                    newWindow={false}
                    mode="background"
                    alignment="center"
                  />
                </div>
              )}
            </div>

            <ul style={[styles.buttonRoot, styles.alignRight]}>
              {additionPages.map(({ id, action, ...page }) => (
                <MenuItem
                  key={id}
                  {...props}
                  {...page}
                  action={action}
                  height={60}
                  expandSubItem={false}
                  pattern={0}
                  fontSize={18}
                  hover={{
                    color: 'inherit',
                    background: 'inherit',
                  }}
                  active={{
                    color: 'inherit',
                    background: 'inherit',
                  }}
                  background={{
                    color: 'inherit',
                    background: 'inherit',
                  }}
                  icon={{
                    font: action === 5 ? 'shopping_cart' : 'person',
                    use: true,
                    direction: 'only',
                  }}
                />
              ))}
            </ul>
          </header>
        </StyleRoot>

        {!isOpened || pages.length === 0 ? null : (
          <MobileSidebar
            pages={pages}
            design={design}
            toggleSidebar={this.toggleSidebar}
          />
        )}
      </React.Fragment>
    );
  }
}
