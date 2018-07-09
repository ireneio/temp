import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout';
import {
  ISLOGIN_TYPE,
  COLOR_TYPE,
  URL_TYPE,
  ID_TYPE,
  OPACITY_TYPE,
} from 'constants/propTypes';
import { NOTLOGIN } from 'constants/isLogin';

import Logo from 'menu/Logo';
import SearchBar from 'menu/SearchBar';
import { PATTERN_TYPE, FONTSIZE_TYPE, FONT_TYPE } from 'menu/constants';

import SidebarItem from './SidebarItem';
import { WIDTH_TYPE, PADDING_TOP_TYPE } from './constants';
import * as styles from './styles';

@enhancer
@radium
export default class Sidebar extends React.PureComponent {
  static propTypes = {
    /** context */
    isLogin: ISLOGIN_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    logo: URL_TYPE,
    style: PropTypes.shape({}),
    menu: PropTypes.shape({
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({
        width: WIDTH_TYPE.isRequired,
        paddingTop: PADDING_TOP_TYPE.isRequired,
        pattern: PATTERN_TYPE.isRequired,
        showLogo: PropTypes.bool.isRequired,
        showSearchbar: PropTypes.bool.isRequired,
        opacity: OPACITY_TYPE.isRequired,
        fontSize: FONTSIZE_TYPE.isRequired,
        font: FONT_TYPE.isRequired,
        normal: PropTypes.shape({
          color: COLOR_TYPE,
          background: COLOR_TYPE,
        }).isRequired,
      }).isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    logo: null,
    style: {},
  };

  render() {
    const {
      isLogin,
      colors,
      logo,
      menu,
      style,
      children,
      ...props
    } = this.props;

    const { pages, design } = menu;
    const { showLogo, showSearchbar, fontSize, width, paddingTop } = design;

    let filteredPages = pages;
    const member = pages.find(page => page.action === 8);
    if (isLogin !== NOTLOGIN && member) {
      filteredPages = pages.filter(page => page.action !== 8);
      filteredPages.unshift(member);
    }

    return (
      <div style={styles.root}>
        <StyleRoot style={[styles.sidebar(design, colors), style]}>
          {!(showLogo && logo) ? <div /> : <Logo logo={logo} width={width} />}

          <div style={styles.padding(paddingTop)}>
            {!showSearchbar ? null : (
              <div style={styles.searchBar(design, colors)}>
                <SearchBar
                  fontSize={fontSize}
                  style={styles.searchIcon}
                  type="sidebar"
                />
              </div>
            )}

            {(filteredPages || []).map(page => (
              <SidebarItem
                {...props}
                key={page.id}
                page={page}
                design={design}
              />
            ))}
          </div>
        </StyleRoot>

        {!children ? null : (
          <StyleRoot style={styles.blockWrapper(design)}>{children}</StyleRoot>
        )}
      </div>
    );
  }
}
