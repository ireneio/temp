// typescript import
import { LinkProps } from 'next/link';

// import
import React from 'react';
import Link from 'next/link';

// typescript definition
interface PropsType extends Omit<LinkProps, 'as' | 'href'> {
  href: string;
  target?: string;
  disabled?: boolean;
  children: React.ReactElement;
}

// definition
export {
  default as DomainContext,
  appWithDomain,
  getServerSideDomainContextProps,
  getClientSideDomainContextProps,
} from './Domain';
export { default as useRouter } from './hooks/useRouter';

export default React.memo(
  ({ href, target, children, disabled, ...props }: PropsType) => {
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
      <Link {...props} href={href}>
        {children}
      </Link>
    );
  },
);
