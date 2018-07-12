import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import {
  COLOR_TYPE,
  ID_TYPE,
  ALIGNMENT_TYPE,
  OPACITY_TYPE,
  STORE_SETTING_TYPE,
} from 'constants/propTypes';

import Logo from './Logo';
import SearchBar from './SearchBar';
import MenuItem from './menuItem';
import {
  HEIGHT_TYPE,
  PATTERN_TYPE,
  FONTSIZE_TYPE,
  FONT_TYPE,
} from './constants';

import * as styles from './styles';

@enhancer
@radium
export default class Menu extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    storeSetting: STORE_SETTING_TYPE.isRequired,

    /** props */
    menu: PropTypes.shape({
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({
        height: HEIGHT_TYPE.isRequired,
        pattern: PATTERN_TYPE.isRequired,
        showLogo: PropTypes.bool.isRequired,
        showSearchbar: PropTypes.bool.isRequired,
        alignment: ALIGNMENT_TYPE.isRequired,
        opacity: OPACITY_TYPE.isRequired,
        fontSize: FONTSIZE_TYPE.isRequired,
        font: FONT_TYPE.isRequired,
        normal: PropTypes.shape({
          color: COLOR_TYPE,
          background: COLOR_TYPE,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    menuIndex: -1,
  };

  render() {
    const { colors, storeSetting, menu, ...props } = this.props;
    const { menuIndex } = this.state;

    const { logoUrl: logo } = storeSetting;
    const { pages, design } = menu;
    const { showLogo, showSearchbar, fontSize, height, expandSubItem } = design;

    return (
      <StyleRoot style={styles.root(design, colors, menuIndex !== -1)}>
        {!(showLogo && logo) ? <div /> : <Logo logo={logo} height={height} />}

        <StyleRoot style={styles.flex}>
          <ul style={styles.menuMain(expandSubItem)}>
            {(pages || []).map((page, index) => (
              <MenuItem
                key={page.id}
                {...props}
                {...page}
                {...design}
                menuItemClick={resetIndex => {
                  this.setState({ menuIndex: resetIndex || index });
                }}
              />
            ))}
          </ul>

          {!showSearchbar ? null : <SearchBar fontSize={fontSize} />}
        </StyleRoot>
      </StyleRoot>
    );
  }
}
