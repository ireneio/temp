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
  children: React.ReactElement;
}

// definition
export const useRouter = useRouterHook;

export default React.memo(({ href, ...props }: PropsType) => {
  const linkProps = useMemo(() => getLinkProps(href), [href]);

  return <Link {...props} {...linkProps} />;
});
