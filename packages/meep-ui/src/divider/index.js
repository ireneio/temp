import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import {
  COLOR_TYPE,
  ALIGNMENT_TYPE,
  CONTENT_WIDTH_TYPE,
  POSITIVE_NUMBER_TYPE,
} from 'constants/propTypes';

import * as styles from './styles';

@radium
export default class Divider extends React.PureComponent {
  static propTypes = {
    background: PropTypes.oneOfType([PropTypes.oneOf(['']), COLOR_TYPE])
      .isRequired,
    width: CONTENT_WIDTH_TYPE.isRequired,
    height: POSITIVE_NUMBER_TYPE.isRequired,
    alignment: ALIGNMENT_TYPE.isRequired,
    radius: POSITIVE_NUMBER_TYPE.isRequired,
  };

  render() {
    const { background, width, height, alignment, radius } = this.props;

    return (
      <div style={styles.root(alignment)}>
        <StyleRoot style={styles.divider(background, width, height, radius)} />
      </div>
    );
  }
}
