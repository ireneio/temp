import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';

import { enhancer } from 'layout/DecoratorsRoot';
import Link from 'deprecated/link';
import { URL_TYPE, LOCATION_TYPE } from 'constants/propTypes';

import * as styles from './styles/placeholder';

@enhancer
@radium
export default class Placeholder extends React.PureComponent {
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({
      height: this.placeholder.current.offsetWidth,
    });
  };

  generateUrl = () => {
    const { location, href } = this.props;
    const { pathname } = location;

    if (/^#/.test(href)) return `${pathname}${href}`;

    if (href && !/^\//.test(href)) return `//${href}`;

    return href;
  };

  render() {
    const { newWindow } = this.props;
    const { height } = this.state;
    const href = this.generateUrl();

    return (
      <Link
        href={href}
        target={newWindow ? '_blank' : '_self'}
        style={{ width: '100%' /* TODO remove */ }}
      >
        <div ref={this.placeholder} style={styles.root(height)}>
          {this.placeholder.current
            ? `${Math.floor(this.placeholder.current.offsetWidth)} x ${height}`
            : null}
        </div>
      </Link>
    );
  }
}
