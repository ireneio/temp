// typescript import
import { AppContext, AppProps } from 'next/app';

import {
  NextAppType,
  NextAppGetInitialPropsType,
} from '@meepshop/utils/lib/types';

// import
import React from 'react';

// typescript definition
interface CustomCtx extends AppContext {
  ctx: AppContext['ctx'] & {
    req: {
      headers: {
        host: string;
      };
    };
  };
}

interface PropsType extends AppProps {
  domain: string | null;
  serverRouter: CustomCtx['router'] | null;
}

// definition
const DomainContext = React.createContext<
  Pick<PropsType, 'domain' | 'serverRouter'>
>({
  domain: null,
  serverRouter: null,
});

export const withDomain = (App: NextAppType): NextAppType => {
  const WithDomain = ({
    domain,
    serverRouter,
    ...props
  }: PropsType): React.ReactElement => (
    <DomainContext.Provider
      value={{ domain: domain || window.location.host, serverRouter }}
    >
      <App {...props} />
    </DomainContext.Provider>
  );

  WithDomain.getInitialProps = async (
    ctx: CustomCtx,
  ): Promise<NextAppGetInitialPropsType<PropsType>> => ({
    ...(await App.getInitialProps(ctx)),
    domain: ctx.ctx.req?.headers.host,
    serverRouter: typeof window === 'undefined' ? ctx.router : null,
  });

  return WithDomain;
};

export default DomainContext;
