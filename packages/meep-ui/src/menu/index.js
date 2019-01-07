import React from 'react';
import PropTypes from 'prop-types';
import { Menu as AntdMenu } from 'antd';
import uuid from 'uuid/v4';
import transformColor from 'color';
import { keyboardArrowDown as ArrowIcon } from 'react-icons/md';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  ID_TYPE,
  URL_TYPE,
  ALIGNMENT_TYPE,
  OPACITY_TYPE,
  COLOR_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';
import removeContextTpyesFromProps from 'utils/removeContextTpyesFromProps';

import Link from 'link';
import MenuItem from './MenuItem';
import { DEFAULT_COLOR_WITH_PATTERN } from './constants';
import { FONTSIZE_TYPE } from './propTypes';
import styles from './styles/index.less';
import getMenuStyles from './utils/getMenuStyles';

export handleModuleData from './utils/handleModuleData';

@enhancer
export default class Menu extends React.PureComponent {
  containerDOM = null;

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

  static propTypes = {
    /** props */
    logoUrl: URL_TYPE,
    id: PropTypes.oneOfType([
      PropTypes.oneOf(['fixedtop', 'secondtop', 'sidebar']).isRequired,
      ID_TYPE.isRequired,
    ]).isRequired,
    pages: PropTypes.arrayOf(
      PropTypes.shape({
        id: ID_TYPE.isRequired,
      }),
    ).isRequired,
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
    /** props */
    logoUrl: null,

    /** ignore */
    openKeys: [],
    className: '',
    reverseSearch: false,
  };

  getPopupContainer = style => {
    const { colors } = this.props;
    const newStyle = {
      ...style,
      color: colors[2],
      background: colors[1],
    };
    const shouldAppendContainer = !this.containerDOM;

    this.containerDOM = !shouldAppendContainer
      ? this.containerDOM
      : document.createElement('div');

    Object.keys(newStyle).forEach(key => {
      this.containerDOM.style[key] = newStyle[key];
    });

    if (shouldAppendContainer)
      document.querySelector('body').appendChild(this.containerDOM);

    return this.containerDOM;
  };

  render() {
    const {
      /** context */
      colors,

      /** props */
      logoUrl,
      id,
      pages,
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

    return (
      <div
        id={`menu-${id}`}
        className={`${styles.root} ${styles[alignment]} ${
          expandSubItem ? '' : 'show-hover'
        } ${className}`}
        style={style}
      >
        {!showLogo ? (
          <div className="logo" />
        ) : (
          <div
            className="logo"
            style={
              height && width // Mobile-layout Menu's width and height are not zero.
                ? { display: 'flex', justifyContent: 'center' }
                : {}
            }
          >
            <Link style={{ width: '100%' }} href="/" target="_self">
              <img
                style={{ objectFit: height && width ? 'contain' : undefined }}
                src={`//${logoUrl}?${
                  width ? `w=${width * 3}` : `h=${height * 3}`
                }`}
                srcSet={`//${logoUrl}?${
                  width ? `w=${width}` : `h=${height}`
                } 1x, //${logoUrl}?${
                  width ? `w=${width * 2}` : `h=${height * 2}`
                } 2x, //${logoUrl}?${
                  width ? `w=${width * 3}` : `h=${height * 3}`
                } 3x`}
                alt={logoUrl}
                height={height !== 0 ? height : undefined}
                width={width !== 0 ? width : undefined}
              />
            </Link>
          </div>
        )}

        <AntdMenu
          {...removeContextTpyesFromProps(props)}
          {...(!expandSubItem
            ? {}
            : {
                openKeys,
                inlineIndent: 20,
              })}
          className={`meepshop ${styles.menu} ${styles[`pattern-${pattern}`]}`}
          mode={expandSubItem ? 'inline' : 'vertical'}
          getPopupContainer={() => this.getPopupContainer(style)}
          expandIcon={({ eventKey, isOpen }) => (
            <ArrowIcon
              className={`arrow-icon ${
                isOpen || (expandSubItem && openKeys.includes(eventKey))
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
              menu2Style={
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
            __html: getMenuStyles(
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
