import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { URL_TYPE, ALIGNMENT_TYPE } from 'constants/propTypes';

import * as styles from './styles';

import { DEFAULT_FACEBOOK_URL } from './constants';

@radium
export default class FacebookWall extends React.Component {
  static propTypes = {
    href: URL_TYPE,
    alignment: ALIGNMENT_TYPE.isRequired,
    showPosts: PropTypes.bool.isRequired,
    showFacepile: PropTypes.bool.isRequired,
    smallHeader: PropTypes.bool.isRequired,
    hideCover: PropTypes.bool.isRequired,
    hideCta: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    href: DEFAULT_FACEBOOK_URL,
  };

  state = {
    width: 500,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.href !== nextProps.href ||
      this.props.alignment !== nextProps.alignment ||
      this.props.showPosts !== nextProps.showPosts ||
      this.props.showFacepile !== nextProps.showFacepile ||
      this.props.smallHeader !== nextProps.smallHeader ||
      this.props.hideCover !== nextProps.hideCover ||
      this.props.hideCta !== nextProps.hideCta ||
      this.state.width !== nextState.width
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ width: this.facebookWall.offsetWidth });
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

    let height = 215;
    if (!showFacepile) height -= 75;
    if (smallHeader) height -= 60;
    if (showPosts) height = 500;

    return (
      <div style={styles.root(alignment)}>
        <iframe
          ref={node => {
            this.facebookWall = node;
          }}
          title="facebook wall"
          src={`
            https://www.facebook.com/plugins/likebox.php?
            href=${href}&
            show_posts=${showPosts}&
            show_facepile=${showFacepile}&
            small_header=${smallHeader}&
            hide_cover=${hideCover}&
            hide_cta=${hideCta}&
            width=${width}&
            height=${height}
          `}
          style={styles.facebookWall(height)}
        />
      </div>
    );
  }
}
