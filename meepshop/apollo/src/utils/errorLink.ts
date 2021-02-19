// typescript import
import { ErrorResponse } from 'apollo-link-error';
import { ArgsProps } from 'antd/lib/notification';

// import
import { onError } from 'apollo-link-error';
import Router from 'next/router';
import { notification } from 'antd';

import logger from '@meepshop/utils/lib/logger';

// typescript definition
export type errorFilterType = ({ message }: Error) => boolean;

// definition
export const shouldIgnoreUnauthorizedError = (
  networkError: ErrorResponse['networkError'],
): boolean =>
  Boolean(
    networkError &&
      'statusCode' in networkError &&
      networkError.statusCode === 401 &&
      'result' in networkError &&
      'msg' in networkError.result &&
      networkError.result.msg === 'token verify failed',
  );

export default (errorFilter: errorFilterType): ReturnType<typeof onError> =>
  onError(({ response, graphQLErrors, networkError }) => {
    const errorLog =
      typeof window === 'undefined'
        ? (data: ArgsProps) => logger.error(JSON.stringify(data))
        : notification.error;

    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore https://github.com/apollographql/apollo-link/issues/536
      networkError?.statusCode === 401 &&
      typeof window !== 'undefined' &&
      !/\/(login|sign-up|set-up-store|sign-up-fail|reset-password)/.test(
        window.location.pathname,
      )
    ) {
      errorLog({
        message: '請重新登入',
        duration: 1,
        onClose: () => {
          Router.replace('/login');
        },
      });
      return;
    }

    if (graphQLErrors) {
      const errors = graphQLErrors.filter(errorFilter);

      if (response && errors.length === 0) {
        response.errors = undefined;
        return;
      }

      errors.forEach(({ message, locations, path }) => {
        errorLog({
          message: 'Error!',
          description: `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
            null,
            2,
          )}, Path: ${JSON.stringify(path, null, 2)}`,
        });
      });
    }

    if (networkError) {
      if (shouldIgnoreUnauthorizedError(networkError)) return;

      errorLog({
        message: 'Error!',
        description: `[Network error]: ${JSON.stringify(
          networkError,
          null,
          2,
        )}`,
      });
    }
  });
