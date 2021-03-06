import React from 'react';
import PropTypes from 'prop-types';
import { areEqual } from 'fbjs';
import memoizeOne from 'memoize-one';

import { AdTrack as AdTrackContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'link';
import {
  IMAGE_TYPE,
  ALIGNMENT_TYPE,
  POSITIVE_NUMBER_TYPE,
  CONTENT_WIDTH_TYPE,
  CUSTOM_TRACKING_TYPE,
} from 'constants/propTypes';
import notMemoizedClickTracking from 'utils/notMemoizedClickTracking';

import Lazy from './Lazy';
import Img from './Img';
import { IMAGE_SUITABLE_WIDTHS } from '../constants';
import styles from './styles/index.less';

@withContext(AdTrackContext, adTrack => ({ adTrack }))
@enhancer
class Image extends React.PureComponent {
  clickTracking = memoizeOne(notMemoizedClickTracking, areEqual);

  static propTypes = {
    /** props */
    alt: PropTypes.string,
    customTracking: CUSTOM_TRACKING_TYPE,
    className: PropTypes.string,
    image: IMAGE_TYPE.isRequired,
    alignment: ALIGNMENT_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,

    /** ignore */
    forwardedRef: PropTypes.shape({}).isRequired,
    width: POSITIVE_NUMBER_TYPE.isRequired,
    linkProps: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    /** props */
    alt: '',
    customTracking: null,
    className: '',
  };

  /** 當useLarge為true時，表示已觸發sensor，此時生命週期已完成did mount，
   *  可直接使用device pixel ratio; 否則使用小圖。
   */
  getSrc = (isError, useLarge) => {
    const { image, width } = this.props;
    const imageWidth = !useLarge
      ? 60
      : IMAGE_SUITABLE_WIDTHS.find(
          suitableWidth => suitableWidth > width * window.devicePixelRatio,
        ) || IMAGE_SUITABLE_WIDTHS.slice(-1)[0];
    const url =
      image instanceof Object
        ? image.scaledSrc[`w${imageWidth}`]
        : `${
            /(^\/)|(^http)/.test(image) ? image : `//${image}`
          }?w=${imageWidth}`;

    if (!(image instanceof Object) || !isError) return url;

    const originUrl = atob(
      url
        .replace(/\.[\w]+$/, '')
        .split('/')
        .slice(-1),
    ).replace('gs://img.meepcloud.com/', 'https://gc.meepcloud.com/');

    return `${originUrl}?w=${imageWidth}`;
  };

  render() {
    const {
      /** props */
      alt,
      customTracking, // 廣告分析用
      className,
      alignment,
      contentWidth,
      image,
      adTrack,

      /** ignore */
      forwardedRef,
      linkProps,
    } = this.props;

    return (
      <div className={`${styles.root} ${styles[alignment]} ${className}`}>
        <div ref={forwardedRef} style={{ width: `${contentWidth}%` }}>
          <Link {...linkProps}>
            <Lazy image={image}>
              {({ useLarge, isClear, isError, onLoad, onError }) => (
                <Img
                  style={{
                    width: '100%',
                    filter: !isClear && 'blur(10px) brightness(80%)',
                    transform: !isClear && 'scale(1.01)',
                    transition: 'all 0.5s ease-in',
                  }}
                  src={this.getSrc(isError, useLarge)}
                  onClick={this.clickTracking(customTracking, adTrack)}
                  onLoad={onLoad}
                  onError={onError}
                  alt={alt}
                  useLarge={useLarge}
                />
              )}
            </Lazy>
          </Link>
        </div>
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
export default React.forwardRef((props, ref) => (
  <Image {...props} forwardedRef={ref} />
));
