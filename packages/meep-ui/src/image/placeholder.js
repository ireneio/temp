import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout';
import Link from 'link';
import { URL_TYPE, LOCATION_TYPE } from 'constants/propTypes';

import * as styles from './styles/placeholder';

@enhancer
@radium
export default class Placeholder extends React.Component {
  static propTypes = {
    location: LOCATION_TYPE.isRequired,
    href: URL_TYPE,
    newWindow: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
      ? PropTypes.bool.isRequired
      : PropTypes.bool,
  };

  static defaultProps = {
    href: null,
    newWindow: /* istanbul ignore next */ process.env.STORYBOOK_DOCS
      ? null
      : false,
  };

  constructor(props) {
    super(props);
    this.placeholder = React.createRef();
  }

  state = {
    height: null,
  };

  componentDidMount() {
    this.resize();
    window.addEventListener('resize', this.resize);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.state.width !== nextState.width ||
      this.state.height !== nextState.height
    );
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      height: Math.floor((this.placeholder.current.offsetWidth * 9) / 16),
    });
  };

  generateUrl = () => {
    const { location, href } = this.props;
    const { pathname } = location;

    if (/^#/.test(href)) return `${pathname}${href}`;
    else if (href && !/^\//.test(href)) return `//${href}`;

    return href;
  };

  render() {
    const { newWindow } = this.props;
    const { height } = this.state;
    const href = this.generateUrl();

    return (
      <Link href={href} target={newWindow ? '_blank' : '_self'}>
        <div ref={this.placeholder} style={styles.root(height)}>
          {this.placeholder.current
            ? `${Math.floor(this.placeholder.current.offsetWidth)} x ${height}`
            : null}
        </div>
      </Link>
    );
  }
}
