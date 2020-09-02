// import
import { useContext } from 'react';
import { useRouter } from 'next/router';

import { DomainContext } from '../index';

import getLinkProps from '../utils/getLinkProps';

// typescript definition
interface RouterType
  extends Omit<ReturnType<typeof useRouter>, 'push' | 'replace'> {
  domain: string | null;
  hash: string | null;
  push: (href: string, options?: {}) => void;
  replace: (href: string, options?: {}) => void;
}

// definition
export default (): RouterType => {
  const router = useRouter();
  const domain = useContext(DomainContext);

  return {
    ...router,
    domain,
    // FIXME: remove query, ashPath after next.js upgrade, we should use AppTree with getDataFromTree
    query: router?.query || {},
    asPath: router?.asPath || '',
    hash: router?.asPath.match(/(#[^?]*)/)?.[0].replace(/^#/, '') || null,
    push: (href: string, options?: {}) => {
      const linkProps = getLinkProps(href);

      router.push(linkProps.href, linkProps.as, options);
    },
    replace: (href: string, options?: {}) => {
      const linkProps = getLinkProps(href);

      router.replace(linkProps.href, linkProps.as, options);
    },
  };
};
