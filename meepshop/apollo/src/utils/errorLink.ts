// typescript import
import { ErrorResponse } from 'apollo-link-error';

import { loggerType } from '@meepshop/logger';

// import
import { onError } from 'apollo-link-error';
import Router from 'next/router';
import { notification } from 'antd';

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

export default (
  errorFilter: errorFilterType,
  logger: loggerType,
): ReturnType<typeof onError> =>
  onError(({ response, graphQLErrors, networkError }) => {
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore https://github.com/apollographql/apollo-link/issues/536
      networkError?.statusCode === 401 &&
      typeof window !== 'undefined'
    ) {
      notification.error({
        message: '請重新登入',
        duration: 1,
        onClose: () => {
          Router.replace('/login');
        },
      });
      return;
    }

    const errorLog =
      typeof window === 'undefined'
        ? logger.error
        : ({ name, ...message }: { name: string }) =>
            notification.error({
              message: 'Error!',
              description: `[${name} error]: ${JSON.stringify(message)}`,
            });

    if (graphQLErrors) {
      const errors = graphQLErrors.filter(errorFilter);

      if (response && errors.length === 0) {
        response.errors = undefined;
        return;
      }

      errors.forEach(({ message, locations, path }) => {
        errorLog({
          name: 'GraphQL',
          message,
          locations,
          path,
        });
      });
    }

    if (networkError) {
      if (shouldIgnoreUnauthorizedError(networkError)) return;

      errorLog({
        name: 'Network',
        networkError,
      });
    }
  });
