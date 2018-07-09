import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import warning from 'fbjs/lib/warning';

import { URL_TYPE } from 'constants/propTypes';

import * as styles from './styles/icon';
import * as icons from './icons';

@radium
export default class Icon extends React.Component {
  static propTypes = {
    font: PropTypes.oneOf(['', ...Object.keys(icons)]),
    image: URL_TYPE,
    direction: PropTypes.oneOf(['only', 'left', 'right', 'upon', 'below'])
      .isRequired,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    font: null,
    image: null,
  };

  shouldComponentUpdate(nextProps) {
    return (
      this.props.font !== nextProps.font ||
      this.props.image !== nextProps.image ||
      this.props.direction !== nextProps.direction ||
      this.props.title !== nextProps.title
    );
  }

  render() {
    const { font, image, direction, title } = this.props;

    const MdIcon = icons[font || ''];

    warning(
      (MdIcon && !image) || (!MdIcon && image),
      'Only one of `font` and `image` have value, and another should not have value.',
    );

    return (
      <div style={styles.root(direction)}>
        {!MdIcon ? null : (
          <MdIcon
            style={{
              ...styles.addStyle(direction),
              ...styles.icon,
            }}
          />
        )}
        {!image ? null : (
          <div style={[styles.addStyle(direction), styles.image(image)]} />
        )}
        {direction === 'only' ? null : <div>{title}</div>}
      </div>
    );
  }
}
