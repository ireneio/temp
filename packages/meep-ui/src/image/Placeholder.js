import React from 'react';
import PropTypes from 'prop-types';

import { POSITIVE_FLOAT_TYPE, POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import styles from './styles/placeholder.less';

class Placeholder extends React.PureComponent {
  static propTypes = {
    /** ignore */
    ratio: POSITIVE_FLOAT_TYPE,
    forwardedRef: PropTypes.shape({}).isRequired,
    width: POSITIVE_NUMBER_TYPE.isRequired,
  };

  static defaultProps = {
    ratio: 9 / 16,
  };

  render() {
    const { ratio, forwardedRef, width } = this.props;
    const height = Math.floor(width * ratio);

    return (
      <div
        ref={forwardedRef}
        className={`${styles.root} ${width === 0 ? '' : styles.done}`}
        style={width === 0 ? {} : { height: `${height}px` }}
      >
        {width === 0 ? null : `${Math.floor(width)} x ${height}`}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Placeholder {...props} forwardedRef={ref} />
));
