import React from 'react';
import radium from 'radium';
import ReactPlayer from 'react-player';

import { CONTENT_WIDTH_TYPE, URL_TYPE } from 'constants/propTypes';

import { ASPECT_TYPE, RATIOS, DEFAULT_VIDEO_URL } from './constants';

@radium
export default class VideoCore extends React.Component {
  static propTypes = {
    href: URL_TYPE,
    aspect: ASPECT_TYPE.isRequired,
    contentWidth: CONTENT_WIDTH_TYPE.isRequired,
  };

  static defaultProps = {
    href: DEFAULT_VIDEO_URL,
  };

  state = {
    height: '100%',
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.contentWidth !== nextProps.contentWidth ||
      this.props.href !== nextProps.href ||
      this.props.aspect !== nextProps.aspect ||
      this.state.height !== nextState.height
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { aspect } = this.props;

    this.setState({
      height: this.videoCore.wrapper.offsetWidth * RATIOS[aspect],
    });
  };

  render() {
    const { href, contentWidth } = this.props;
    const { height } = this.state;

    return (
      <ReactPlayer
        url={href}
        ref={node => {
          this.videoCore = node;
        }}
        width={`${contentWidth}%`}
        height={height}
        controls
      />
    );
  }
}
