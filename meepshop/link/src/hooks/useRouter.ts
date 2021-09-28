// import
import { useContext } from 'react';
import { useRouter } from 'next/router';

import DomainContext from '../Domain';

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
  const { domain, serverRouter } = useContext(DomainContext);
  // FIXME: remove query, ashPath after next.js upgrade, we should use AppTree with getDataFromTree
  const newRouter = (typeof window === 'undefined'
    ? serverRouter
    : router) as ReturnType<typeof useRouter>;

  return {
    ...newRouter,
    domain,
    hash: newRouter.asPath.match(/(#[^?]*)/)?.[0].replace(/^#/, '') || null,
  };
};
