// typescript import
import { LinkProps } from 'next/link';

// import
import React, { useMemo } from 'react';
import Link from 'next/link';

import getLinkProps from './utils/getLinkProps';

// typescript definition
interface PropsType extends Omit<LinkProps, 'as' | 'href'> {
  href: string;
  target?: string;
  disabled?: boolean;
  children: React.ReactElement;
}

// definition
export { default as DomainContext, withDomain } from './Domain';
export { default as useRouter } from './hooks/useRouter';

export default React.memo(
  ({ href, target, children, disabled, ...props }: PropsType) => {
    const linkProps = useMemo(() => getLinkProps(href), [href]);

    if (disabled)
      return React.cloneElement(children, {
        onClick: (e: React.SyntheticEvent<HTMLElement>) => {
          e.preventDefault();
        },
      });

    return target === '_blank' ? (
      React.cloneElement(children, {
        onClick: (e: React.SyntheticEvent<HTMLElement>) => {
          e.preventDefault();
          window.open(href);
        },
      })
    ) : (
      <Link {...props} {...linkProps}>
        {children}
      </Link>
    );
  },
);
