import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout';
import { COLOR_TYPE, STORE_SETTING_TYPE } from 'constants/propTypes';

import * as styles from './styles/stepHeader';

@enhancer
@radium
export default class StepHeader extends React.PureComponent {
  static propTypes = {
    /** context */
    storeSetting: STORE_SETTING_TYPE.isRequired,
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,
  };

  render() {
    const { storeSetting, colors } = this.props;
    const { storeName } = storeSetting;

    return (
      <div style={styles.root(colors)}>
        <div style={styles.storeName}>{storeName}</div>
      </div>
    );
  }
}
