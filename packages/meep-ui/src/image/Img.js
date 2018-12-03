import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import memoizeOne from 'memoize-one';

import Link from 'link';
import {
  IMAGE_TYPE,
  ALIGNMENT_TYPE,
  POSITIVE_NUMBER_TYPE,
  CONTENT_WIDTH_TYPE,
} from 'constants/propTypes';
import notMemoizedClickTracking from 'utils/notMemoizedClickTracking';

import { IMAGE_SUITABLE_WIDTHS } from './constants';
import styles from './styles/img.less';

class Img extends React.PureComponent {
  clickTracking = memoizeOne(notMemoizedClickTracking, areEqual);

  static propTypes = {
    /** props */
    alt: PropTypes.string,
    mode: PropTypes.oneOf(['background', 'img']),
    image: IMAGE_TYPE.isRequired,
    alignment: ALIGNMENT_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
    handleClickTracking: PropTypes.func,

    /** ignore */
    className: PropTypes.string,
    height: POSITIVE_NUMBER_TYPE,
    forwardedRef: PropTypes.shape({}).isRequired,
    width: POSITIVE_NUMBER_TYPE.isRequired,
    linkProps: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    /** props */
    alt: 'meepshop',
    mode: 'img',
    handleClickTracking: () => {},

    /** ignore */
    className: '',
    height: 0,
  };

  state = {
    isClient: false,
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          isClient: true,
        }),
      0,
    );
  }

  getImageURL = () => {
    const { mode, image, width, height } = this.props;
    const { isClient } = this.state;
    const imageWidth = width * (isClient ? devicePixelRatio : 1);

    if (mode === 'img' && height !== 0) return `//${image}?h=${height}`;

    return `//${image}?w=${IMAGE_SUITABLE_WIDTHS.find(
      suitableWidth => suitableWidth > imageWidth,
    ) || IMAGE_SUITABLE_WIDTHS.slice(-1)[0]}`;
  };

  render() {
    const {
      /** props */
      alt,
      mode,
      alignment,
      contentWidth,
      handleClickTracking, // 廣告分析用

      /** ignore */
      height,
      className,
      forwardedRef,
      width,
      linkProps,
    } = this.props;

    return (
      <div className={`${styles.root} ${styles[alignment]}`}>
        <div ref={forwardedRef} style={{ width: `${contentWidth}%` }}>
          <Link {...linkProps}>
            {mode === 'background' ? (
              <div
                className={`${styles.image} ${styles.background} ${className} ${
                  width === 0 ? styles.loading : ''
                }`}
                style={{
                  backgroundImage: `url(${this.getImageURL()})`,
                  height: `${height}px`,
                }}
                onClick={handleClickTracking}
              />
            ) : (
              <img
                className={`${styles.image} ${
                  width === 0 && height === 0 ? styles.loading : ''
                }`}
                src={this.getImageURL()}
                onClick={handleClickTracking}
                alt={alt}
              />
            )}
          </Link>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Img {...props} forwardedRef={ref} />
));
