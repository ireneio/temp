import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout';
import { COLOR_TYPE, ID_TYPE } from 'constants/propTypes';

import BottomItem from './BottomItem';
import * as styles from './styles';
import { FONT_SIZE_TYPE } from './constants';

@enhancer
@radium
export default class Bottom extends React.PureComponent {
  static propTypes = {
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
    menu: PropTypes.shape({
      pages: PropTypes.arrayOf(
        PropTypes.shape({
          id: ID_TYPE.isRequired,
        }).isRequired,
      ),
      design: PropTypes.shape({
        color: COLOR_TYPE,
        background: PropTypes.string,
        fontSize: FONT_SIZE_TYPE.isRequired,
        useBottom: PropTypes.bool,
      }).isRequired,
    }).isRequired,
  };

  render() {
    const { colors, menu, ...props } = this.props;

    const { pages, design } = menu;
    const { color, background, fontSize, useBottom } = design;

    if (!useBottom) return null;

    return (
      <StyleRoot
        style={styles.root({ color: color || colors[3], background, fontSize })}
      >
        {(pages || []).map(page => (
          <BottomItem
            key={page.id}
            {...props}
            fontSize={fontSize}
            page={page}
          />
        ))}
      </StyleRoot>
    );
  }
}
