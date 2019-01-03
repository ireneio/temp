import React from 'react';
import PropTypes from 'prop-types';

import Link from 'link';
import {
  URL_TYPE,
  HASH_TYPE,
  IMAGE_TYPE,
  CUSTOM_TRACKING_TYPE,
} from 'constants/propTypes';

import Placeholder from './Placeholder';
import Img from './img';
import styles from './styles/index.less';

export default class Image extends React.PureComponent {
  imageRef = React.createRef();

  static propTypes = {
    /** props */
    href: PropTypes.oneOfType([URL_TYPE, HASH_TYPE]),
    image: IMAGE_TYPE,
    newWindow: PropTypes.bool,
    customTracking: CUSTOM_TRACKING_TYPE,
  };

  static defaultProps = {
    /** props */
    href: null,
    image: null,
    newWindow: false,
    customTracking: null,
  };

  state = {
    width: 0,
  };

  componentDidMount() {
    this.setState({ width: this.imageRef.current.offsetWidth });
  }

  render() {
    const { href, image, newWindow, customTracking, ...props } = this.props;
    const { width } = this.state;
    const linkProps = {
      className: styles.root,
      href,
      target: newWindow ? '_blank' : '_self',
    };

    return !image ? (
      <Link {...linkProps}>
        <Placeholder {...props} ref={this.imageRef} width={width} />
      </Link>
    ) : (
      <Img
        {...props}
        ref={this.imageRef}
        linkProps={linkProps}
        width={width}
        image={image}
      />
    );
  }
}
