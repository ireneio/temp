import React from 'react';
import PropTypes from 'prop-types';

import { enhancer } from 'layout/DecoratorsRoot';
import { COLOR_TYPE, ID_TYPE } from 'constants/propTypes';

import Item from './Item';
import { FONT_SIZE_TYPE } from './constants';
import styles from './styles/index.less';

@enhancer
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
    const {
      colors,
      menu: {
        pages,
        design: { color, background, fontSize, useBottom },
      },
      ...props
    } = this.props;

    if (!useBottom) return null;

    return (
      <div
        className={styles.root}
        style={{
          color: color || colors[3],
          background,
        }}
      >
        {(pages || []).map(page => (
          <Item key={page.id} {...props} fontSize={fontSize} page={page} />
        ))}
      </div>
    );
  }
}
