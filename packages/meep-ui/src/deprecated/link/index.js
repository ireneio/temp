import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import URL from 'url-parse';
import queryString from 'query-string';

import { enhancer } from 'layout/DecoratorsRoot';
import { URL_TYPE } from 'constants/propTypes';

import * as styles from './styles';

@enhancer
@radium
export default class Link extends React.PureComponent {
  static propTypes = {
    goTo: PropTypes.func.isRequired,
    href: URL_TYPE,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    style: PropTypes.shape({}),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
      .isRequired,
  };

  static defaultProps = {
    href: null,
    target: '_self',
    style: null,
  };

  onClick = e => {
    const { href, target, goTo } = this.props;
    const { host, pathname, query, hash } = new URL(href);

    if (
      target === '_blank' ||
      host !== location.host // eslint-disable-line no-restricted-globals
    ) {
      return;
    }

    e.preventDefault();
    goTo({
      pathname,
      params: {
        search: queryString.parse(query),
        hash,
      },
    });
  };

  render() {
    const { href, style, target, children } = this.props;

    if (!href) {
      // TODO remove
      return <span style={[styles.link, style]}>{children}</span>;
    }

    return (
      <a
        href={href}
        target={target}
        style={[styles.link, style]}
        onClick={this.onClick}
      >
        {children}
      </a>
    );
  }
}
