import React from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import { Menu as AntdMenu } from 'antd';
import uuid from 'uuid/v4';
import transformColor from 'color';
import { MdKeyboardArrowDown as ArrowIcon } from 'react-icons/md';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  STORE_SETTING_TYPE,
  ALIGNMENT_TYPE,
  OPACITY_TYPE,
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';
import { PHONE_MEDIA } from 'constants/media';
import removeContextTpyesFromProps from 'utils/removeContextTpyesFromProps';

import Link from 'link';
import MenuItem from './MenuItem';
import { DEFAULT_COLOR_WITH_PATTERN } from './constants';
import { FONTSIZE_TYPE } from './propTypes';
import styles from './styles/index.less';
import notMemoizedGetMenuStyles from './utils/getMenuStyles';
import notMemoizedGetAllKeys from './utils/getAllKeys';
import LogoDesktopDefault from './images/LogoDesktopDefault';

export handleModuleData from './utils/handleModuleData';

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
    design: PropTypes.shape({
      showLogo: PropTypes.bool.isRequired,
      showSearchbar: PropTypes.bool.isRequired,
      expandSubItem: PropTypes.bool.isRequired,
      alignment: ALIGNMENT_TYPE.isRequired,
      pattern: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
      opacity: OPACITY_TYPE.isRequired,
      normal: PropTypes.shape({
        color: COLOR_TYPE,
        background: COLOR_TYPE,
      }).isRequired,
      active: PropTypes.shape({
        color: COLOR_TYPE,
        background: COLOR_TYPE,
        borderColor: COLOR_TYPE,
      }).isRequired,
      hover: PropTypes.shape({
        color: COLOR_TYPE,
        background: COLOR_TYPE,
        borderColor: COLOR_TYPE,
      }).isRequired,
      fontSize: FONTSIZE_TYPE.isRequired,
      font: PropTypes.oneOf([
        'Arial',
        'Arial Black',
        'Coming Sans MS',
        'Courier',
        'Courier New',
        '標楷體',
        'Helvetica',
        '黑體',
      ]).isRequired,
      width: POSITIVE_NUMBER_TYPE.isRequired,
      height: POSITIVE_NUMBER_TYPE.isRequired,
    }).isRequired,
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

  state = {
    isMobile: false,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      isMobile: window.matchMedia(PHONE_MEDIA.substring(7)).matches,
    });
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      storeSetting: { logoUrl, mobileLogoUrl },
      id,
      pages,
      iconSize,
      logoAlignment,
      design: {
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
      },
      openKeys,
      className,
      reverseSearch,
      ...props
    } = this.props;
    const { isMobile } = this.state;

    const selected = DEFAULT_COLOR_WITH_PATTERN[pattern];
    const style = {
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
              <LogoDesktopDefault />
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
                    alt={logo}
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
            <ArrowIcon
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
              hasLevelThree={[
                'fixedtop',
                'secondtop',
                'sidebar',
                'mobile-sidebar',
              ].includes(id)}
              menuItemStyle={
                !expandSubItem
                  ? {}
                  : {
                      fontSize: `${fontSize - 2}px`,
                    }
              }
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
