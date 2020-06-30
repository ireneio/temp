// typescript import
import NextApp, { AppContext, AppProps, AppInitialProps } from 'next/app';
import { LinkProps } from 'next/link';

// import
import React, { useMemo } from 'react';
import Link from 'next/link';

import useRouterHook from './hooks/useRouter';
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

interface PropsType extends Omit<LinkProps, 'as' | 'href'> {
  href: string;
  target?: string;
  disabled?: boolean;
  children: React.ReactElement;
}

// definition
export const DomainContext = React.createContext<DomainType>(null);

export const withDomain = (App: typeof NextApp): React.ComponentType =>
  class WithDomain extends React.Component<AppProps & { domain: DomainType }> {
    public static getInitialProps = async (
      ctx: CustomCtx,
    ): Promise<AppInitialProps & { domain: DomainType }> => {
      const {
        ctx: { req },
      } = ctx;

      const appProps = await App.getInitialProps(ctx);

      return {
        ...appProps,
        domain: req?.headers.host,
      };
    };

    public render(): React.ReactNode {
      const { domain } = this.props;

      return (
        <DomainContext.Provider value={domain || window.location.host}>
          <App {...this.props} />
        </DomainContext.Provider>
      );
    }
  };

export const useRouter = useRouterHook;

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
