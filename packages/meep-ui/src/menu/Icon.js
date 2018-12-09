import React from 'react';
import PropTypes from 'prop-types';

import { URL_TYPE } from 'constants/propTypes';

import styles from './styles/icon.less';
import icons from './icons';

export default class Icon extends React.PureComponent {
  static propTypes = {
    /** props */
    font: PropTypes.oneOf(Object.keys(icons)),
    image: URL_TYPE,
    onClick: PropTypes.func,
    direction: PropTypes.oneOf(['only', 'left', 'right', 'upon', 'below'])
      .isRequired,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    font: null,
    image: null,
    onClick: () => {},
  };

  render() {
    const { font, image, onClick, direction, children } = this.props;
    const MdIcon = icons[font || ''];

    return (
      <div className={`${styles.root} ${styles[direction] || ''}`}>
        {!MdIcon ? null : <MdIcon className={styles.icon} onClick={onClick} />}

        {!image ? null : (
          <img
            className={`${styles.icon} ${styles.image}`}
            src={`//${image}?w=120`}
            srcSet={`//${image}?w=32 1x, //${image}?w=64 2x, //${image}?w=120 3x`}
            width={32}
            height={32}
            alt={image}
          />
        )}

        {direction === 'only' ? null : children}
      </div>
    );
  }
}
