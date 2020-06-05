import React from 'react';
import PropTypes from 'prop-types';

import withContext from '@store/utils/lib/withContext';
import fbContext from '@store/fb';

import { URL_TYPE, ALIGNMENT_TYPE } from 'constants/propTypes';

import { DEFAULT_FACEBOOK_URL } from './constants';
import styles from './styles/index.less';

@withContext(fbContext)
export default class FacebookWall extends React.PureComponent {
  facebookWallRef = React.createRef();

  resizeTimeout = null;

  static propTypes = {
    /** props | test
     * https://www.facebook.com/Cate-Meep-1912494732334710/,
     * https://www.facebook.com/TechOrange/?hc\_ref=ARSpLuPVbN7limaZyhVUtlP-Buslyz-bKkaRlLufNz4x8Lx5JDgUbkbVUUwGoesNIwc&fref=nf
     */
    href: URL_TYPE,
    alignment: ALIGNMENT_TYPE.isRequired,
    showPosts: PropTypes.bool.isRequired,
    showFacepile: PropTypes.bool.isRequired,
    smallHeader: PropTypes.bool.isRequired,
    hideCover: PropTypes.bool.isRequired,
    hideCta: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    /** props */
    href: null,
  };

  state = {
    width: 500,
  };

  isLoaded = false;

  componentDidMount() {
    this.renderFacebookWall();
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  componentDidUpdate() {
    this.renderFacebookWall();
  }

  componentWillUnmount() {
    this.isUnmounted = true;
    window.removeEventListener('resize', this.resize);
  }

  renderFacebookWall = () => {
    const { fb } = this.props;

    if (!fb) return;

    if (!this.isLoaded) {
      this.facebookWallRef.current.removeAttribute('fb-xfbml-state');
      this.facebookWallRef.current.removeAttribute('fb-iframe-plugin-query');
    }

    this.isLoaded = true;
    fb.XFBML.parse(this.facebookWallRef.current.parentNode);
  };

  /**
   * resize | testJSON [{
   *   "facebookWallRef": {
   *     "current": {
   *       "offsetWidth": 300
   *     }
   *   }
   * }, {
   *   "facebookWallRef": {
   *     "current": {
   *       "offsetWidth": 300
   *     }
   *   }
   * }]
   */
  resize = () => {
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (this.isUnmounted) return;

      const { width } = this.state;
      const { offsetWidth } = this.facebookWallRef.current;

      if (width === offsetWidth) return;

      this.setState({ width: offsetWidth });
    }, 100);
  };

  render() {
    const {
      href,
      alignment,
      showPosts,
      showFacepile,
      smallHeader,
      hideCover,
      hideCta,
    } = this.props;
    const { width } = this.state;

    return (
      <div className={`${styles.root} ${styles[alignment]}`}>
        <div
          ref={this.facebookWallRef}
          className={`fb-page ${styles.facebookWall}`}
          data-href={href || DEFAULT_FACEBOOK_URL}
          data-width={width}
          data-tabs={showPosts ? 'timeline' : ''}
          data-small-header={smallHeader}
          data-hide-cover={hideCover}
          data-hide-cta={hideCta}
          data-show-facepile={showFacepile}
          data-adapt-container-width
        />
      </div>
    );
  }
}
