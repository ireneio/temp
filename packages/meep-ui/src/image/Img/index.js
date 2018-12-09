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

import Progressive from './Progressive';
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
  };

  getSrc = useLarge => {
    const { image, width } = this.props;
    /** 當useLarge為true時，表示已觸發sensor，此時生命週期已完成did mount，
     *  可直接使用device pixel ratio; 否則使用小圖。
     */
    return useLarge
      ? `//${image}?w=${IMAGE_SUITABLE_WIDTHS.find(
          suitableWidth => suitableWidth > width * window.devicePixelRatio,
        ) || IMAGE_SUITABLE_WIDTHS.slice(-1)[0]}`
      : `//${image}?w=60`;
  };

  render() {
    const {
      /** props */
      alt,
      alignment,
      contentWidth,
      customTracking, // 廣告分析用

      /** ignore */
      forwardedRef,
      linkProps,
      storeSetting: { cname }, // TODO: for experiment
    } = this.props;

    /** TODO: Experiment feature - only for beeding.com */
    let EnhanceComp = Progressive;
    if (cname === 'beeding' || cname === 'bellatest') {
      EnhanceComp = Lazy;
    } /** Experiment feature - only for beeding.com - End */

    return (
      <div className={`${styles.root} ${styles[alignment]}`}>
        <div ref={forwardedRef} style={{ width: `${contentWidth}%` }}>
          <Link {...linkProps}>
            <EnhanceComp>
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
            </EnhanceComp>
          </Link>
        </div>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <Img {...props} forwardedRef={ref} />
));
