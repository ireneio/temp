// typescript import
import { AppContext, AppProps, AppInitialProps } from 'next/app';

// typescript definition
export type Subtract<T, K> = { [P in Exclude<keyof T, keyof K>]: T[P] };

export type NextAppGetInitialPropsType<P> = AppInitialProps &
  Omit<P, keyof AppProps>;

export type NextAppType = React.ComponentType<AppProps> & {
  getInitialProps: (
    ctx: AppContext,
  ) => Promise<NextAppGetInitialPropsType<AppProps>>;
};

export type apolloErrorType = Error & {
  networkError?: {
    statusCode: number;
  };
  graphQLErrors?: {
    message: string;
    locations: string[];
    path: string;
  };
};
