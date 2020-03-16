// typescript import
import { LinkProps } from 'next/link';

// import
import React, { useMemo } from 'react';
import Link from 'next/link';

import useRouterHook from './hooks/useRouter';
import getLinkProps from './utils/getLinkProps';

// typescript definition
interface PropsType extends Omit<LinkProps, 'as' | 'href'> {
  href: string;
  target?: string;
  children: React.ReactElement;
}

// definition
export const useRouter = useRouterHook;

export default React.memo(({ href, target, children, ...props }: PropsType) => {
  const linkProps = useMemo(() => getLinkProps(href), [href]);

  return target === '_blank' ? (
    React.cloneElement(children, { onClick: () => window.open(href) })
  ) : (
    <Link {...props} {...linkProps}>
      {children}
    </Link>
  );
});
