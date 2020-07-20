// typescript import
import { AppContext, AppProps } from 'next/app';
import { LinkProps } from 'next/link';

import {
  NextAppType,
  NextAppGetInitialPropsType,
} from '@meepshop/utils/lib/types';

// import
import React, { useMemo } from 'react';
import Link from 'next/link';

import getLinkProps from './utils/getLinkProps';

// typescript definition
type DomainType = string | null;

interface CustomCtx extends AppContext {
  ctx: AppContext['ctx'] & {
    req: {
      headers: {
        host: string;
      };
    };
  };
}

interface WithDomainPropsType extends AppProps {
  domain: DomainType;
}

interface PropsType extends Omit<LinkProps, 'as' | 'href'> {
  href: string;
  target?: string;
  disabled?: boolean;
  children: React.ReactElement;
}

// definition
export { default as useRouter } from './hooks/useRouter';

export const DomainContext = React.createContext<DomainType>(null);

export const withDomain = (App: NextAppType): NextAppType => {
  const WithDomain = ({
    domain,
    ...props
  }: WithDomainPropsType): React.ReactElement => (
    <DomainContext.Provider value={domain || window.location.host}>
      <App {...props} />
    </DomainContext.Provider>
  );

  WithDomain.getInitialProps = async (
    ctx: CustomCtx,
  ): Promise<NextAppGetInitialPropsType<WithDomainPropsType>> => ({
    ...(await App.getInitialProps(ctx)),
    domain: ctx.ctx.req?.headers.host,
  });

  return WithDomain;
};

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
