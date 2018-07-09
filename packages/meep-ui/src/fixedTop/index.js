import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout';
import {
  ID_TYPE,
  URL_TYPE,
  COLOR_TYPE,
  ALIGNMENT_TYPE,
  OPACITY_TYPE,
} from 'constants/propTypes';

import Logo from 'menu/Logo';
import SearchBar from 'menu/SearchBar';
import MenuItem from 'menu/menuItem';
import {
  PATTERN_TYPE,
  ACTION_TYPE,
  FONTSIZE_TYPE,
  FONT_TYPE,
} from 'menu/constants';

import * as styles from './styles';

const getDefaultHeaderHeight = ({ pages, design }) => {
  const { fontSize } = design;
  const iconType = pages.reduce((result, { icon }) => {
    if (!icon || result === 'vertical') return result;

    if (['upon', 'below'].includes(icon.direction)) return 'vertical';

    return 'horizontal';
  }, 'none');

  /** iconHeight: 24, iconPadding: 5 */
  switch (iconType) {
    case 'horizontal':
      return (fontSize > 24 ? fontSize : 24) + /* padding */ 30;
    case 'vertical':
      return fontSize + 24 + 5 + /* padding */ 30;
    default:
      return fontSize + /* padding */ 30;
  }
};

@enhancer
@radium
export default class FixedTop extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    logo: URL_TYPE,
    menu: PropTypes.shape({
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
          action: ACTION_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({
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

  state = {
    headerHeight: getDefaultHeaderHeight(this.props.menu),
  };

  componentDidMount() {
    this.resizeHeight();
    window.addEventListener('resize', this.resizeHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHeight);
  }

  resizeHeight = () => {
    this.setState({ headerHeight: this.headerRef.current.offsetHeight });
  };

  headerRef = React.createRef();

  render() {
    const { colors, logo, menu, ...props } = this.props;
    const { headerHeight } = this.state;

    const { pages, design } = menu;
    const { alignment, showLogo, showSearchbar, fontSize, height } = design;

    return (
      <React.Fragment>
        <StyleRoot style={styles.root(design, colors)}>
          <header style={styles.menu(alignment)} ref={this.headerRef}>
            {!(showLogo && logo) ? (
              <div />
            ) : (
              <Logo height={height} logo={logo} />
            )}

            <div style={styles.flex}>
              <ul style={styles.menuMain}>
                {(pages || []).map(({ id, action, ...page }) => (
                  <MenuItem
                    key={id}
                    {...props}
                    {...page}
                    {...design}
                    action={action}
                  />
                ))}
              </ul>

              {!showSearchbar ? null : (
                <SearchBar {...props} fontSize={fontSize} />
              )}
            </div>
          </header>
        </StyleRoot>

        <div style={{ minHeight: headerHeight }} />
      </React.Fragment>
    );
  }
}
