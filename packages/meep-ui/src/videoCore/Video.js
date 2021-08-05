import React from 'react';
import ReactPlayer from 'react-player';

import { Fb as FbContext } from '@meepshop/context';
import withContext from '@store/utils/lib/withContext';

import { enhancer } from 'layout/DecoratorsRoot';
import { CONTENT_WIDTH_TYPE, URL_TYPE } from 'constants/propTypes';

import { ASPECT_TYPE } from './propTypes';
import { RATIOS, DEFAULT_VIDEO_URL } from './constants';
import styles from './styles/index.less';

@withContext(FbContext)
@enhancer
export default class VideoCore extends React.PureComponent {
  videoCoreRef = React.createRef();

  resizeTimeout = null;

  static propTypes = {
    /** props | test
     * https://www.youtube.com/watch?v=br\_2Na02Q4Q,
     * https://www.youtube.com/watch?time\_continue=24&v=L8FK64bLJKE,
     * https://www.facebook.com/meepshop/videos/792790224167669/,
     * https://www.twitch.tv/videos/210513306
     */
    href: URL_TYPE,
    aspect: ASPECT_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
  };

  static defaultProps = {
    /** props */
    href: null,
  };

  state = {
    height: '100%',
  };

  componentDidMount() {
    this.renderFacebookVideo();
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentDidUpdate() {
    this.renderFacebookVideo();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('resize', this.resize);
  }

  /**
   * resize | testJSON [{
   *   "videoCoreRef": {
   *     "current": {
   *       "wrapper": {
   *         "offsetWidth": 1000
   *       }
   *     }
   *   }
   * }]
   */
  resize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.isUnmounted) return;

      const { aspect } = this.props;

      this.setState({
        height: this.videoCoreRef.current.wrapper.offsetWidth * RATIOS[aspect],
      });
    }, 100);
  };

  renderFacebookVideo = () => {
    const { fb, href } = this.props;

    if (!fb || !/facebook/.test(href)) return;

    if (!this.isLoaded) {
      this.videoCoreRef.current.wrapper.childNodes[0].removeAttribute(
        'fb-xfbml-state',
      );
      this.videoCoreRef.current.wrapper.childNodes[0].removeAttribute(
        'fb-iframe-plugin-query',
      );
    }

    this.isLoaded = true;
    fb.XFBML.parse(this.videoCoreRef.current.wrapper);
  };

  render() {
    const { href, contentWidth, appId, version } = this.props;
    const { height } = this.state;

    return (
      <ReactPlayer
        ref={this.videoCoreRef}
        className={styles.root}
        url={href || DEFAULT_VIDEO_URL}
        width={`${contentWidth}%`}
        height={`${height}px`}
        config={{
          facebook: {
            appId,
            version,
          },
        }}
        controls
      />
    );
  }
}
