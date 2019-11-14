import React from 'react';
import PropTypes from 'prop-types';

import { POSITIVE_NUMBER_TYPE } from 'constants/propTypes';

import { DEFAULT_LATITUDE_AND_LONGITUDE } from './constants';
import styles from './styles/index.less';

export default class GoogleMap extends React.PureComponent {
  googleMapRef = React.createRef();

  resizeTimeout = null;

  static propTypes = {
    /**
     * props | test
     * no_match,
     * <iframe_src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14463.733701272171!2d121.50845089999999!3d25.002378049999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9dc34df02cd%3A0x1a9da81d691e83d4!2z5rC45a6J5biC5aC056uZ!5e0!3m2!1szh-TW!2stw!4v1520331378116"_width="600"_height="450"_frameborder="0"_style="border:0"_allowfullscreen></iframe>,
     * !1m18!1m12!1m3!1d14463.733701272171!2d121.50845089999999!3d25.002378049999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3442a9dc34df02cd%3A0x1a9da81d691e83d4!2z5rC45a6J5biC5aC056uZ!5e0!3m2!1szh-TW!2stw!4v1520331378116
     */
    href: PropTypes.string,
    width: POSITIVE_NUMBER_TYPE.isRequired,
    height: POSITIVE_NUMBER_TYPE.isRequired,
  };

  static defaultProps = {
    /** props */
    href: null,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    height: this.props.height,
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
   *   "googleMapRef": {
   *     "current": {
   *       "offsetWidth": 99,
   *       "offsetHeight": 0
   *     }
   *   }
   * }, {
   *   "googleMapRef": {
   *     "current": {
   *       "offsetWidth": "/<ComponentProps>.width/",
   *       "offsetHeight": "/<ComponentProps>.height/"
   *     }
   *   }
   * }]
   */
  resize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.isUnmounted) return;

      const { width, height } = this.props;
      const { offsetWidth, offsetHeight } = this.googleMapRef.current;

      if (width === offsetWidth && height === offsetHeight) return;

      this.setState({
        height: (height * offsetWidth) / width,
      });
    }, 100);
  };

  render() {
    const { width, href } = this.props;
    const { height } = this.state;

    return (
      <iframe
        ref={this.googleMapRef}
        className={styles.root}
        style={{
          maxWidth: `${width}px`,
          height: `${height}px`,
        }}
        title="google map"
        src={`https://www.google.com/maps/embed?pb=${
          /google\.com\/maps\/embed\?pb/.test(href)
            ? href.match(/pb=[\w%\-!.]*(?=")/g)?.[0].substring(3)
            : href || DEFAULT_LATITUDE_AND_LONGITUDE
        }`}
        allowFullScreen
      />
    );
  }
}
