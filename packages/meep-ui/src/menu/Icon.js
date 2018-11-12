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
          /** TODO remove new Image */
          <div className={styles.icon}>
            <Image
              files={{
                image,
              }}
              style={{
                display: 'block',
                width: '32px',
                height: '32px',
              }}
            />
          </div>
        )}

        {direction === 'only' ? null : children}
      </div>
    );
  }
}
