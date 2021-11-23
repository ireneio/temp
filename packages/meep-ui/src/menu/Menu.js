import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { DownOutlined } from '@ant-design/icons';
import { Menu as AntdMenu } from 'antd';
import uuid from 'uuid/v4';
import transformColor from 'color';

import { Sensor as SensorContext } from '@meepshop/context';
import { logoDesktopDefault } from '@meepshop/images';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import { ID_TYPE, STORE_SETTING_TYPE, COLOR_TYPE } from 'constants/propTypes';
import removeContextTpyesFromProps from 'utils/removeContextTpyesFromProps';

import Link from 'link';
import MenuItem from './MenuItem';
import { DEFAULT_COLOR_WITH_PATTERN } from './constants';
import styles from './styles/index.less';
import notMemoizedGetMenuStyles from './utils/getMenuStyles';
import notMemoizedGetAllKeys from './utils/getAllKeys';

export { default as handleModuleData } from './utils/handleModuleData';

@withContext(SensorContext)
@enhancer
export default class Menu extends React.PureComponent {
  searchBarItem = [
    {
      id: uuid(),
      action: 'searchBar',
      pages: [],
      newWindow: false,
      title: {
        zh_TW: '搜尋',
      },
    },
  ];

  getMenuStyles = memoizeOne(notMemoizedGetMenuStyles);

  getAllKeys = memoizeOne(notMemoizedGetAllKeys);

  static propTypes = {
    /** props */
    storeSetting: STORE_SETTING_TYPE.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.oneOf([
        'fixedtop',
        'secondtop',
        'sidebar',
        'mobile-headerMenu',
        'mobile-member',
        'mobile-sidebar',
      ]).isRequired,
      ID_TYPE.isRequired,
    ]).isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
      }),
    ).isRequired,
    iconSize: PropTypes.oneOf([24, 32, 48]).isRequired,
    logoAlignment: PropTypes.oneOf(['LEFT', 'RIGHT']),
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** ignore */
    openKeys: PropTypes.arrayOf(ID_TYPE.isRequired),
    className: PropTypes.string,
    reverseSearch: PropTypes.bool,
  };

  static defaultProps = {
    /** ignore */
    openKeys: null,
    className: '',
    reverseSearch: false,
    logoAlignment: null,
  };

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  initialDesign = () => {
    const { design } = this.props;

    return {
      ...design,
      showLogo: design?.showLogo || false,
      showSearchbar: design?.showSearchbar || false,
      expandSubItem: design?.expandSubItem || false,
      alignment: design?.alignment || 'right',
      pattern: design?.pattern || 0,
      opacity: design?.opacity ?? 1,
      normal: design?.normal || {},
      active: design?.active || {},
      hover: design?.hover || {},
      fontSize: design?.fontSize || 14,
      font: design?.font || '黑體',
      width: design?.width ?? 0,
      height: design?.height ?? 60,
    };
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      storeSetting: { storeName, logoUrl, mobileLogoUrl },
      id,
      pages,
      iconSize,
      logoAlignment,
      openKeys,
      className,
      reverseSearch,
      isModule,
      hasLevelThree,
      isMobile,
      ...props
    } = this.props;
    const {
      showLogo,
      showSearchbar,
      expandSubItem,
      alignment,
      pattern,
      opacity,
      normal,
      active,
      hover,
      fontSize,
      font,
      width,
      height,
    } = this.initialDesign();

    const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
    const style = {
      fill: normal.color || colors[selected[1]],
      color: normal.color || colors[selected[1]],
      background: transformColor(
        normal.background || colors[selected[0]],
      ).alpha(opacity),
      fontSize: `${fontSize}px`,
      fontFamily:
        font === '黑體'
          ? 'PingFang TC,微軟正黑體,Microsoft JhengHei,Helvetica Neue,Helvetica,source-han-sans-traditional,Arial,sans-serif'
          : `${font},微軟正黑體,Microsoft JhengHei,sans-serif`,
    };

    const logo = isMobile ? mobileLogoUrl : logoUrl;

    return (
      <div
        id={`menu-${id}`}
        className={`${styles.root} ${styles[alignment]} ${
          !logoAlignment ? '' : styles[logoAlignment]
        } ${expandSubItem ? '' : 'show-hover'} ${className}`}
        style={style}
      >
        {!showLogo ? (
          <div
            className="logo"
            style={
              height && width // Mobile-layout Menu's width and height are not zero.
                ? {
                    width: '100%',
                  }
                : {}
            }
          />
        ) : (
          <div
            className="logo"
            style={
              (height && width) || (!logo && !isMobile) // Mobile-layout Menu's width and height are not zero.
                ? {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }
                : {}
            }
          >
            {!logo && !isMobile ? (
              <img
                src={logoDesktopDefault}
                style={{
                  ...(height !== 0 && {
                    height,
                  }),
                  ...(width !== 0 && {
                    height: width / 5,
                  }),
                }}
                alt="logoDesktopDefault"
              />
            ) : (
              <Link style={{ width: '100%' }} href="/" target="_self">
                {!logo ? null : (
                  <img
                    style={{
                      height: height !== 0 ? height : undefined,
                      width: width !== 0 ? width : undefined,
                      objectFit: height && width ? 'contain' : undefined,
                    }}
                    src={`${logo}?${
                      width ? `w=${width * 3}` : `h=${height * 3}`
                    }`}
                    srcSet={`${logo}?${
                      width ? `w=${width}` : `h=${height}`
                    } 1x, ${logo}?${
                      width ? `w=${width * 2}` : `h=${height * 2}`
                    } 2x, ${logo}?${
                      width ? `w=${width * 3}` : `h=${height * 3}`
                    } 3x`}
                    alt={storeName}
                  />
                )}
              </Link>
            )}
          </div>
        )}

        <AntdMenu
          {...removeContextTpyesFromProps(props)}
          {...(!expandSubItem
            ? {}
            : {
                openKeys: openKeys || this.getAllKeys(pages),
                inlineIndent: 20,
              })}
          className={`meepshop ${styles.menu} ${styles[`pattern-${pattern}`]}`}
          mode={expandSubItem ? 'inline' : 'vertical'}
          expandIcon={({ eventKey, isOpen }) => (
            <DownOutlined
              className={`arrow-icon ${
                isOpen ||
                (expandSubItem && openKeys && openKeys.includes(eventKey))
                  ? styles.open
                  : styles.close
              }`}
            />
          )}
        >
          {(!reverseSearch
            ? [...pages, ...(!showSearchbar ? [] : this.searchBarItem)]
            : [...(!showSearchbar ? [] : this.searchBarItem), ...pages]
          ).map(({ id: pageId, ...page }) => (
            <MenuItem
              {...page}
              key={pageId}
              id={pageId}
              iconSize={iconSize}
              hasLevelThree={hasLevelThree}
              menuItemStyle={
                !expandSubItem
                  ? {}
                  : {
                      fontSize: `${fontSize - 2}px`,
                    }
              }
              menuType={id}
              isMobile={isMobile}
              isModule={isModule}
            />
          ))}
        </AntdMenu>

        <style
          dangerouslySetInnerHTML={{
            __html: this.getMenuStyles(
              id,
              normal,
              height,
              active,
              hover,
              colors,
              pattern,
              selected,
            ),
          }}
        />
      </div>
    );
  }
}
