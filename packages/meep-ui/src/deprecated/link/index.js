import React from 'react';
import PropTypes from 'prop-types';
import radium from 'radium';
import URL from 'url-parse';

import { useRouter } from '@meepshop/link';
import withHook from '@store/utils/lib/withHook';

import { enhancer } from 'layout/DecoratorsRoot';
import { URL_TYPE } from 'constants/propTypes';

import * as styles from './styles';

@withHook(() => ({ router: useRouter() }))
@enhancer
@radium
export default class Link extends React.PureComponent {
  static propTypes = {
    href: URL_TYPE,
    target: PropTypes.oneOf(['_self', '_blank', '_parent', '_top']),
    style: PropTypes.shape({}),
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
      .isRequired,
    isStalled: PropTypes.bool,
  };

  static defaultProps = {
    href: null,
    target: '_self',
    style: null,
    isStalled: false,
  };

  onClick = e => {
    // return when clicking with these following key
    if (e.shiftKey || e.metaKey || e.ctrlKey) return;

    const { href, target, isStalled, router } = this.props;
    const { host, pathname, query, hash } = new URL(href);

    if (
      target === '_blank' ||
      host !== location.host || // eslint-disable-line no-restricted-globals
      /^tel:+/.test(href)
    ) {
      return;
    }

    e.preventDefault();
    router.push(
      {
        pathname,
        search: query,
        hash,
      },
      undefined,
      {
        scroll: !isStalled,
      },
    );
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
