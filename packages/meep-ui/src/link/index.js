import React from 'react';
import PropTypes from 'prop-types';
import URL from 'url-parse';
import queryString from 'query-string';

import { enhancer } from 'layout/DecoratorsRoot';
import { URL_TYPE, HASH_TYPE } from 'constants/propTypes';

import styles from './styles/index.less';

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
    // return when clicking with these following key
    if (e.shiftKey || e.metaKey || e.ctrlKey) return;

    const { goTo, target } = this.props;
    const { host, pathname, query, hash } = new URL(
      /^#/.test(url)
        ? `${window.location.pathname}${window.location.search}${url}`
        : url,
    );

    if (
      target === '_blank' ||
      host !== window.location.host ||
      /^tel:+/.test(url)
    )
      return;

    e.preventDefault();
    goTo({
      pathname: pathname === '' ? '/' : pathname,
      params: {
        search: queryString.parse(query),
        hash,
      },
    });
  };

  render() {
    const { href, target, children, className } = this.props;
    const url =
      !href || /(^#)|(^\/)|(^http)|(^tel:+)/.test(href) ? href : `//${href}`;

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
