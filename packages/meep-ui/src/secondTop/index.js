import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout';
import {
  COLOR_TYPE,
  URL_TYPE,
  ID_TYPE,
  ALIGNMENT_TYPE,
  OPACITY_TYPE,
} from 'constants/propTypes';

import Logo from 'menu/Logo';
import SearchBar from 'menu/SearchBar';
import MenuItem from 'menu/menuItem';
import {
  HEIGHT_TYPE,
  PATTERN_TYPE,
  FONTSIZE_TYPE,
  FONT_TYPE,
} from 'menu/constants';

import * as styles from './styles';

@enhancer
@radium
export default class SecondTop extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    logo: URL_TYPE,
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

  static defaultProps = {
    logo: null,
  };

  render() {
    const { colors, logo, menu, ...props } = this.props;

    const { pages, design } = menu;
    const { showLogo, showSearchbar, fontSize, height } = design;

    return (
      <StyleRoot style={styles.root(design, colors)}>
        {!(showLogo && logo) ? <div /> : <Logo logo={logo} height={height} />}

        <div style={styles.flex}>
          <ul style={styles.menuMain}>
            {(pages || []).map(page => (
              <MenuItem key={page.id} {...props} {...page} {...design} />
            ))}
          </ul>

          {!showSearchbar ? null : <SearchBar fontSize={fontSize} />}
        </div>
      </StyleRoot>
    );
  }
}
