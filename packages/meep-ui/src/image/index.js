import React from 'react';
import PropTypes from 'prop-types';

import Link from 'link';
import { URL_TYPE, HASH_TYPE, IMAGE_TYPE } from 'constants/propTypes';

import Placeholder from './Placeholder';
import Img from './Img';
import styles from './styles/index.less';

export default class Image extends React.PureComponent {
  imageRef = React.createRef();

  resizeTimeout = null;

  static propTypes = {
    /** props */
    href: PropTypes.oneOfType([URL_TYPE, HASH_TYPE]),
    image: IMAGE_TYPE,
    newWindow: PropTypes.bool,
  };

  static defaultProps = {
    /** props */
    href: null,
    image: null,
    newWindow: false,
  };

  state = {
    width: 0,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('resize', this.resize);
  }

  /**
   * resize | testJSON [{
   *   "imageRef": {
   *     "current": {
   *       "offsetWidth": 1000
   *     }
   *   }
   * }, {
   *   "imageRef": {
   *     "current": {
   *       "offsetWidth": 10000
   *     }
   *   }
   * }]
   */
  resize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.isUnmounted) return;

      this.setState({ width: this.imageRef.current.offsetWidth });
    }, 100);
  };

  render() {
    const { href, image, newWindow, ...props } = this.props;
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
