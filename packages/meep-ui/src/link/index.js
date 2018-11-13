import React from 'react';
import PropTypes from 'prop-types';
import URL from 'url-parse';
import queryString from 'query-string';

import { contextProvider } from 'context';
import { URL_TYPE, HASH_TYPE } from 'constants/propTypes';

import styles from './styles/index.less';

const { enhancer } = contextProvider(['func', 'location']);

@enhancer
export default class Link extends React.PureComponent {
  static propTypes = {
    /** props */
    href: PropTypes.oneOfType([URL_TYPE, HASH_TYPE]),
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),

    /** ignore */
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
      .isRequired,
  };

  static defaultProps = {
    /** props */
    href: null,
    target: '_self',

    /** ignore */
    className: '',
  };

  onClick = url => e => {
    const { goTo, target } = this.props;
    const { host, pathname, query, hash } = new URL(url);

    if (target === '_blank' || host !== window.location.host) return;

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
    const { href, target, children, className } = this.props;
    const url = !href || /(^#)|(^\/)|(^http)/.test(href) ? href : `//${href}`;

    if (!url) return children;

    return (
      <a
        className={`${styles.link} ${className}`}
        href={url}
        target={target}
        onClick={this.onClick(url)}
      >
        {children}
      </a>
    );
  }
}
