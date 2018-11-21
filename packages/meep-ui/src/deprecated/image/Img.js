import React from 'react';
import PropTypes from 'prop-types';
import radium, { StyleRoot } from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'deprecated/link';
import {
  URL_TYPE,
  ALIGNMENT_TYPE,
  LOCATION_TYPE,
  CONTENT_WIDTH_TYPE,
} from 'constants/propTypes';

import { IMAGE_SUITABLE_WIDTHS, HASH_TYPE } from './constants';
import * as styles from './styles/img';

@enhancer
@radium
export default class Img extends React.PureComponent {
  /**
   * contentWidth -> Image width in block
   */
  static propTypes = {
    location: LOCATION_TYPE.isRequired,
    href: PropTypes.oneOfType([URL_TYPE, HASH_TYPE]),
    newWindow: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
      ? PropTypes.bool.isRequired
      : PropTypes.bool,
    image: URL_TYPE.isRequired,
    alignment: ALIGNMENT_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
    width: PropTypes.number,
    rootStyle: PropTypes.shape({}),
    style: PropTypes.shape({}),
    mode: PropTypes.oneOf(['background', 'img', 'collection']),
    alt: PropTypes.string,
  };

  static defaultProps = {
    href: null,
    newWindow: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
      ? null
      : false,
    width: null,
    rootStyle: {},
    style: {},
    mode: 'img',
    alt: 'meepshop',
  };

  constructor(props) {
    super(props);
    this.img = React.createRef();
  }

  state = {
    width: 0,
    isClient: false,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);

    setTimeout(
      () =>
        this.setState({
          isClient: true,
        }),
      0,
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  /*
   * Use to get image suitable width
   */
  getImageSuitableWidth = () => {
    // TODO remove
    const {
      style: { width: styleWidth } = {},
      width: propWidth,
      mode,
    } = this.props;
    const { isClient } = this.state;
    const ssrDevicePixelRatio = isClient ? devicePixelRatio : 1;

    if (mode === 'background' && (propWidth || styleWidth))
      return (
        (propWidth || parseInt(styleWidth.replace(/px/, ''), 10)) *
        ssrDevicePixelRatio
      );

    const { width } = this.state;

    return (
      IMAGE_SUITABLE_WIDTHS.find(
        suitableWidth => suitableWidth > width * ssrDevicePixelRatio,
      ) || IMAGE_SUITABLE_WIDTHS.slice(-1)[0]
    );
  };

  resize = () => {
    if (!this.img.current) return;
    this.setState({ width: this.img.current.offsetWidth });
  };

  generateUrl = () => {
    const { location, href } = this.props;
    const { pathname } = location;

    if (/^#/.test(href)) return `${pathname}${href}`;

    if (href && !/(^\/)|(^http)/.test(href)) return `//${href}`;

    return href;
  };

  render() {
    const {
      image,
      newWindow,
      contentWidth,
      alignment,
      rootStyle,
      style,
      mode,
      alt,
    } = this.props;
    const href = this.generateUrl();

    return (
      <StyleRoot style={[styles.root(alignment), rootStyle]}>
        <div style={styles.wrapper(contentWidth, mode)}>
          <Link
            href={href}
            target={newWindow ? '_blank' : '_self'}
            style={styles.link}
          >
            {mode === 'background' ? (
              <div
                style={[
                  styles.background(
                    `//${image}?w=${this.getImageSuitableWidth()}`,
                  ),
                  style,
                ]}
              />
            ) : (
              <img
                ref={this.img}
                src={`//${image}?w=${this.getImageSuitableWidth()}`}
                onLoad={this.resize}
                alt={alt}
                style={[styles.image, style]}
              />
            )}
          </Link>
        </div>
      </StyleRoot>
    );
  }
}
