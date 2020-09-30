import React from 'react';
import PropTypes from 'prop-types';

import { URL_TYPE } from 'constants/propTypes';

import styles from './styles/icon.less';
import icons from './icons';

export default class Icon extends React.PureComponent {
  static propTypes = {
    /** props */
    iconSize: PropTypes.oneOf([24, 32, 48]).isRequired,
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
    const { iconSize, font, image, onClick, direction, children } = this.props;
    const MdIcon = icons[font || ''];

    return (
      <div className={`${styles.root} ${styles[direction] || ''}`}>
        {!MdIcon ? null : (
          <MdIcon
            style={{ fontSize: `${iconSize}px` }}
            className={styles.icon}
            onClick={onClick}
          />
        )}

        {!image ? null : (
          <img
            className={styles.icon}
            src={`//${image}?w=${iconSize}`}
            srcSet={`//${image}?w=${iconSize} 1x, //${image}?w=${iconSize *
              2} 2x, //${image}?w=${iconSize * 3} 3x`}
            width={iconSize}
            height={iconSize}
            alt={image}
          />
        )}

        {direction === 'only' ? null : children}
      </div>
    );
  }
}
