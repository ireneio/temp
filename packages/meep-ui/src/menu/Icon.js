import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles/icon.less';
import * as icons from './icons';

export default class Icon extends React.PureComponent {
  static propTypes = {
    /** props */
    iconSize: PropTypes.oneOf([24, 32, 48]).isRequired,
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    onClick: () => {},
  };

  render() {
    const {
      iconSize,
      image,
      imagePosition,
      onClick,
      isModule,
      children,
    } = this.props;
    const DefaultIcon =
      image?.__typename !== 'DefaultIcon'
        ? () => null
        : icons[image.icon || ''];

    return (
      <div
        className={`${styles.root} ${styles[imagePosition] || ''} ${
          !isModule ? styles.wrap : ''
        }`}
      >
        {image?.__typename !== 'DefaultIcon' ? null : (
          <DefaultIcon
            className={styles.icon}
            style={{ fontSize: `${iconSize}px` }}
            onClick={onClick}
          />
        )}

        {image?.__typename !== 'Image' ? null : (
          <img
            className={styles.icon}
            style={{ fontSize: `${iconSize}px` }}
            src={image.scaledSrc.w60}
            srcSet={`${image.scaledSrc.w60} 1x, ${image.scaledSrc.w120} 2x, ${image.scaledSrc.w240} 3x`}
            alt={image}
          />
        )}

        {imagePosition === 'ONLY' ? null : children}
      </div>
    );
  }
}
