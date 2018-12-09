import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { areEqual, emptyFunction } from 'fbjs';
import { Affix, Drawer } from 'antd';
import transformColor from 'color';
import { bars as BarsIcon } from 'react-icons/fa';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import Menu from 'menu';
import { ID_TYPE, COLOR_TYPE, STORE_SETTING_TYPE } from 'constants/propTypes';

import styles from './styles/index.less';
import notMemoizedGetPages from './utils/getPages';

@enhancer
export default class MobileLayout extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,

    /** props */
    id: ID_TYPE.isRequired,
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

  render() {
    const {
      /** context */
      colors,
      storeSetting: { mobileLogoUrl },

      /** props */
      id,
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
    } = this.getPages(fixedtop, secondtop, sidebar);

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
                <BarsIcon onClick={() => this.setState({ visible: true })} />
              )}
            </div>

            <div className={styles.logo}>
              {!mobileLogoUrl ? null : (
                <Link style={{ width: '100%' }} href="/" target="_self">
                  <img
                    style={{ objectFit: 'contain' }}
                    className={styles.image}
                    src={`//${mobileLogoUrl}?h=180`}
                    srcSet={`//${mobileLogoUrl}?h=60 1x, //${mobileLogoUrl}?h=120 2x, //${mobileLogoUrl}?h=180 3x`}
                    alt="mobile-logo"
                    height="60"
                  />
                </Link>
              )}
            </div>

            <Menu
              id={`${id}-headerMenu`}
              className={styles.headerMenu}
              logoUrl={mobileLogoUrl}
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
          style={{
            background: colors[1],
            color: colors[2],
          }}
          onClose={() => this.setState({ memberPages: [] })}
          visible={memberPages.length !== 0}
          placement="top"
          height="100%"
        >
          <Menu
            id={`${id}-member`}
            className={styles.menu}
            logoUrl={mobileLogoUrl}
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
            openKeys={[]}
          />

          <style
            dangerouslySetInnerHTML={{
              __html: `
              .${styles.member} .${styles.menu} .logo {
                border-bottom: 2px solid ${transformColor(colors[2]).alpha(
                  0.1,
                )};
              }

              .${styles.member} .${styles.menu} .menu-1:not(:last-child) {
                border-bottom: 2px solid ${transformColor(colors[2]).alpha(
                  0.2,
                )};
              }
            `,
            }}
          />
        </Drawer>

        {pages.length === 0 ? null : (
          <Drawer
            className={`${styles.drawer} ${styles.sidebar}`}
            style={normal}
            onClose={() => this.setState({ visible: false })}
            visible={visible}
            placement="left"
            width="280px"
          >
            <Menu
              id={`${id}-sidebar`}
              className={`${styles.menu} show-border`}
              logoUrl={mobileLogoUrl}
              pages={pages}
              design={{
                ...design,
                showLogo: Boolean(mobileLogoUrl),
                expandSubItem: true,
                normal,
                width: 150,
                height: 60,
              }}
              openKeys={
                expandSubItem ? pages.map(({ id: pageId }) => pageId) : openKeys
              }
              onOpenChange={
                expandSubItem
                  ? emptyFunction
                  : newOpenKeys =>
                      this.setState({
                        openKeys:
                          newOpenKeys.slice(-1) !== openKeys[0]
                            ? newOpenKeys.slice(-1)
                            : [],
                      })
              }
              reverseSearch
            />
          </Drawer>
        )}
      </>
    );
  }
}
