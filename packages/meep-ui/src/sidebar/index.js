import React from 'react';
import PropTypes from 'prop-types';
import { areEqual, emptyFunction } from 'fbjs';
import memoizeOne from 'memoize-one';

import { enhancer } from 'layout/DecoratorsRoot';
import Menu from 'menu';
import {
  ISLOGIN_TYPE,
  ID_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import styles from './styles/index.less';

@enhancer
export default class Sidebar extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,

    /** props */
    id: ID_TYPE.isRequired,
    menu: PropTypes.shape({
      iconSize: PropTypes.oneOf([24, 32, 48]).isRequired,
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({
        width: POSITIVE_NUMBER_TYPE.isRequired,
        paddingTop: POSITIVE_NUMBER_TYPE.isRequired,
      }).isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  };

  state = {
    openKeys: [],
  };

  getPages = memoizeOne((pages, isLogin) => {
    if (isLogin === NOTLOGIN) return pages;

    const member = pages.find(({ action }) => action === 8);

    if (!member) return pages;

    return [member, ...pages.filter(({ action }) => action !== 8)];
  }, areEqual);

  render() {
    const {
      /** context */
      isLogin,

      /** props */
      id,
      menu: {
        iconSize,
        pages,
        design: { width, paddingTop, expandSubItem, ...design },
      },
      children,
    } = this.props;
    const { openKeys } = this.state;

    return (
      <div className={styles.root}>
        <div
          style={{
            width: `${width}px`,
          }}
        >
          <Menu
            id={id}
            className={`${styles.menu} ${
              expandSubItem ? '' : `${styles.showArrow} show-hover`
            } show-border`}
            pages={this.getPages(pages, isLogin)}
            design={{
              ...design,
              width,
              expandSubItem: true,
            }}
            openKeys={expandSubItem ? null : openKeys}
            onOpenChange={
              expandSubItem
                ? emptyFunction
                : newOpenKeys => {
                    const latestOpenKey = newOpenKeys.find(
                      key => !openKeys.includes(key),
                    );

                    if (
                      pages.every(({ id: pageId }) => pageId !== latestOpenKey)
                    )
                      this.setState({ openKeys: newOpenKeys });
                    else
                      this.setState({
                        openKeys: latestOpenKey ? [latestOpenKey] : [],
                      });
                  }
            }
            iconSize={iconSize}
            reverseSearch
          />
        </div>

        <div
          style={{
            width: `calc(100% - ${width}px)`,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              #menu-${id} > .ant-menu {
                margin: ${paddingTop}px 0px 0px;
              }
            `,
          }}
        />
      </div>
    );
  }
}
