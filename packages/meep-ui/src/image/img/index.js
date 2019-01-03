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
  CUSTOM_TRACKING_TYPE,
} from 'constants/propTypes';
import notMemoizedClickTracking from 'utils/notMemoizedClickTracking';
import { contextProvider } from 'context';

import Lazy from './Lazy';
import { IMAGE_SUITABLE_WIDTHS } from '../constants';
import styles from './styles/index.less';

const { enhancer } = contextProvider('storeSetting');

@enhancer
class Img extends React.PureComponent {
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
    alt: 'meepshop',
    customTracking: null,
    className: '',
  };

  /** 當useLarge為true時，表示已觸發sensor，此時生命週期已完成did mount，
   *  可直接使用device pixel ratio; 否則使用小圖。
   */
  getSrc = useLarge => {
    const { image, width } = this.props;
    const url = /(^\/)|(^http)/.test(image) ? image : `//${image}`;

    return useLarge
      ? `${url}?w=${IMAGE_SUITABLE_WIDTHS.find(
          suitableWidth => suitableWidth > width * window.devicePixelRatio,
        ) || IMAGE_SUITABLE_WIDTHS.slice(-1)[0]}`
      : `${url}?w=60`;
  };

  render() {
    const {
      /** props */
      alt,
      customTracking, // 廣告分析用
      className,
      alignment,
      contentWidth,

      /** ignore */
      forwardedRef,
      linkProps,
    } = this.props;

    return (
      <div className={`${styles.root} ${styles[alignment]} ${className}`}>
        <div ref={forwardedRef} style={{ width: `${contentWidth}%` }}>
          <Link {...linkProps}>
            <Lazy>
              {({ useLarge, isClear, onLoad, onError }) => (
                <img
                  style={{
                    width: '100%',
                    filter: !isClear && 'blur(10px) brightness(80%)',
                    transform: !isClear && 'scale(1.01)',
                    transition: 'all 0.5s ease-in',
                  }}
                  src={this.getSrc(useLarge)}
                  onClick={this.clickTracking(customTracking)}
                  onLoad={onLoad}
                  onError={onError}
                  alt={alt}
                />
              )}
            </Lazy>
          </Link>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Img {...props} forwardedRef={ref} />
));
