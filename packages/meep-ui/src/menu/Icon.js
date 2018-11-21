import React from 'react';
import PropTypes from 'prop-types';

import Image from 'image';
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
          <Image
            className={`${styles.icon} ${styles.image}`}
            image={image}
            height={32}
            alignment="center"
            contentWidth={100}
            mode="background"
          />
        )}

        {direction === 'only' ? null : children}
      </div>
    );
  }
}
