import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import Link from 'link';
import { URL_TYPE } from 'constants/propTypes';

import * as styles from './styles/logo';

@radium
export default class Logo extends React.PureComponent {
  static propTypes = {
    logo: URL_TYPE.isRequired,
    height: PropTypes.number,
    width: PropTypes.number,
    style: PropTypes.shape({}),
  };

  static defaultProps = {
    height: 0,
    width: 0,
    style: {},
  };

  render() {
    const { logo, height, width, style } = this.props;

    let query = '';
    if (height > 0) {
      query = `?h=${height}`;
    } else if (width > 0) {
      query = `?w=${width}`;
    }

    return (
      <Link href="/">
        <img
          style={[styles.img(height, width), style]}
          alt="logo"
          src={`//${logo}${query}`}
        />
      </Link>
    );
  }
}
