import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { areEqual, emptyFunction } from 'fbjs';
import { MenuOutlined } from '@ant-design/icons';
import { Affix, Drawer } from 'antd';
import transformColor from 'color';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import Menu from 'menu';
import {
  COLOR_TYPE,
  STORE_SETTING_TYPE,
  LOCATION_TYPE,
} from 'constants/propTypes';

import styles from './styles/index.less';
import notMemoizedGetPages from './utils/getPages';

@enhancer
export default class MobileLayout extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    location: LOCATION_TYPE.isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,

    /** props */
    fixedtop: PropTypes.shape({}),
    secondtop: PropTypes.shape({}),
    sidebar: PropTypes.shape({}),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    fixedtop: null,
    secondtop: null,
    sidebar: null,
  };

  state = {
    visible: false,
    memberPages: [],
    openKeys: [],
  };

  getPages = memoizeOne(notMemoizedGetPages, areEqual);

  componentDidUpdate(prevProps) {
    const {
      location: { href },
    } = this.props;

    if (href !== prevProps.location.href)
      setTimeout(() => {
        if (!this.isUnmounted) this.setState({ visible: false });
      }, 0);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    const {
      /** context */
      colors,
      storeSetting: { storeName, mobileLogoUrl },

      /** props */
      fixedtop,
      secondtop,
      sidebar,
      children,
    } = this.props;
    const { visible, memberPages, openKeys } = this.state;
    const {
      pages,
      headerPages,
      design: { expandSubItem, ...design },
    } = this.getPages(fixedtop, secondtop, sidebar, this.props);

    const normal = {
      color: colors[2],
      background: colors[1],
    };

    return (
      <>
        <Affix offsetTop={0}>
          <header className={styles.header} style={normal}>
            <div className={styles.barsIcon}>
              {pages.length === 0 ? null : (
                <MenuOutlined
                  onClick={() => this.setState({ visible: true })}
                />
              )}
            </div>

            <div className={styles.logo}>
              {!mobileLogoUrl ? null : (
                <Link href="/" target="_self">
                  <img
                    className={styles.image}
                    src={`${mobileLogoUrl}?h=180`}
                    srcSet={`${mobileLogoUrl}?h=60 1x, ${mobileLogoUrl}?h=120 2x, ${mobileLogoUrl}?h=180 3x`}
                    alt={storeName}
                  />
                </Link>
              )}
            </div>

            <Menu
              id="mobile-headerMenu"
              className={styles.headerMenu}
              pages={headerPages}
              design={{
                ...design,
                showLogo: false,
                showSearchbar: false,
                expandSubItem: true,
                alignment: 'right',
                normal,
                width: 0,
                height: 60,
                fontSize: 18,
              }}
              openKeys={[]}
              onOpenChange={([memberId]) =>
                this.setState({
                  memberPages:
                    headerPages.find(
                      ({ id: headerId }) => headerId === memberId,
                    )?.pages || [],
                })
              }
            />
          </header>
        </Affix>

        {children}

        <Drawer
          className={`${styles.drawer} ${styles.member}`}
          onClose={() => this.setState({ memberPages: [] })}
          visible={memberPages.length !== 0}
          placement="top"
          height="100%"
        >
          <Menu
            id="mobile-member"
            className={styles.menu}
            pages={memberPages}
            design={{
              ...design,
              showLogo: Boolean(mobileLogoUrl),
              showSearchbar: false,
              expandSubItem: true,
              normal,
              width: 150,
              height: 60,
            }}
          />

          <style
            dangerouslySetInnerHTML={{
              __html: `
            .${styles.member} .${styles.menu} .logo {
              border-bottom: 2px solid ${transformColor(colors[2]).alpha(0.1)};
            }

            .${styles.member} .${styles.menu} .menu-1:not(:last-child) {
              border-bottom: 2px solid ${transformColor(colors[2]).alpha(0.2)};
            }
          `,
            }}
          />
        </Drawer>

        {pages.length === 0 ? null : (
          <Drawer
            className={`${styles.drawer} ${styles.sidebar}`}
            onClose={() => this.setState({ visible: false })}
            visible={visible}
            placement="left"
            width="280px"
          >
            <Menu
              id="mobile-sidebar"
              className={`${styles.menu} show-border ${
                expandSubItem ? '' : styles.showIcon
              }`}
              pages={pages}
              design={{
                ...design,
                showLogo: Boolean(mobileLogoUrl),
                expandSubItem: true,
                alignment: 'separate',
                normal,
                width: 150,
                height: 48,
              }}
              openKeys={expandSubItem ? undefined : openKeys}
              onOpenChange={
                expandSubItem
                  ? emptyFunction
                  : newOpenKeys => {
                      const latestOpenKey = newOpenKeys.find(
                        key => !openKeys.includes(key),
                      );

                      if (pages.every(({ id }) => id !== latestOpenKey))
                        this.setState({ openKeys: newOpenKeys });
                      else
                        this.setState({
                          openKeys: latestOpenKey ? [latestOpenKey] : [],
                        });
                    }
              }
              reverseSearch
              hasLevelThree
            />
          </Drawer>
        )}

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .${styles.drawer} .ant-drawer-content {
            background: ${colors[1]};
          }
        `,
          }}
        />
      </>
    );
  }
}
