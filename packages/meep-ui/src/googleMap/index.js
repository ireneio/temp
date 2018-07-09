import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import * as styles from './styles';

import { DEFAULT_LATITUDE_AND_LONGITUDE } from './constants';

@radium
export default class GoogleMap extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    href: PropTypes.string,
  };

  static defaultProps = {
    href: DEFAULT_LATITUDE_AND_LONGITUDE,
  };

  state = {
    height: this.props.height,
  };

  componentDidMount() {
    this.resize(this.props);
    window.addEventListener('resize', this.resize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.width !== nextProps.width ||
      this.props.height !== nextProps.height ||
      this.props.href !== nextProps.href ||
      this.state.height !== nextState.height
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    const { width, height } = this.props;

    /**
     * Ignore reason: Because offsetWidth and offsetHeight are always 0, this will not be triggered.
     * In the browser, width and height will change after `componentDidMount`.
     */
    /* istanbul ignore next */
    if (
      this.googleMap.offsetWidth === width &&
      this.googleMap.offsetHeight === height
    ) {
      return;
    }

    this.setState({
      height: (height * this.googleMap.offsetWidth) / width,
    });
  };

  render() {
    const { width, href } = this.props;
    const { height } = this.state;

    return (
      <iframe
        ref={node => {
          this.googleMap = node;
        }}
        title="google map"
        src={`https://www.google.com/maps/embed?pb=${href.match(
          /(!([\w.-]|%3)+)+/g,
        )}`}
        style={styles.root(width, height)}
        allowFullScreen
      />
    );
  }
}
