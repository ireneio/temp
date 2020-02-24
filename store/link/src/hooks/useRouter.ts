// import
import { useRouter } from 'next/router';

import getLinkProps from '../utils/getLinkProps';

// typescript definition
interface RouterType
  extends Omit<ReturnType<typeof useRouter>, 'push' | 'replace'> {
  push: (href: string, options?: {}) => void;
  replace: (href: string, options?: {}) => void;
}

// definition
export default (): RouterType => {
  const router = useRouter();

  return {
    ...router,
    // FIXME: remove if after next.js upgrade, router should not be null
    query: router?.query || {},
    push: (href: string, options?: {}) => {
      const linkProps = getLinkProps(href);

      router.push(linkProps.href, linkProps.as, options);
    },
    replace: (href: string, options?: {}) => {
      const linkProps = getLinkProps(href);

      router.push(linkProps.href, linkProps.as, options);
    },
  };
};
