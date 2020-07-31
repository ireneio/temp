import React from 'react';
import PropTypes from 'prop-types';

import { placeholderImage } from '@meepshop/images';

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
    ratio: 2 / 5,
  };

  render() {
    const { ratio, forwardedRef, width, contentWidth, alignment } = this.props;
    const height = Math.floor(width * ratio);

    return (
      <div className={`${styles.root} ${styles[alignment]}`}>
        <div ref={forwardedRef} style={{ width: `${contentWidth}%` }}>
          <div
            className={`
              ${styles.placeholder} ${width === 0 ? '' : styles.done}
            `}
            style={{
              ...(width === 0 ? {} : { height: `${height}px` }),
              background: `url("${placeholderImage}") top / cover`,
            }}
          />
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default React.forwardRef((props, ref) => (
  <Placeholder {...props} forwardedRef={ref} />
));
