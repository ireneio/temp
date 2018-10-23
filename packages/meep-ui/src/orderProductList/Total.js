import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import OrderShowTotal from 'orderShowTotal';
import { COLOR_TYPE } from 'constants/propTypes';

import * as styles from './styles/total';

@enhancer
@radium
export default class Total extends React.PureComponent {
  static propTypes = {
    /** context */
    colors: PropTypes.arrayOf(COLOR_TYPE.isRequired).isRequired,

    /** props */
    children: PropTypes.node,
  };

  static defaultProps = {
    children: null,
  };

  render() {
    const { colors, children, ...props } = this.props;

    return (
      <div style={styles.root(colors)}>
        <OrderShowTotal {...props} />

        {!children ? null : (
          <div style={styles.buttonRoot}>
            {React.cloneElement(children, {
              style: { ...styles.button(colors), ...children.props.style },
            })}
          </div>
        )}
      </div>
    );
  }
}
