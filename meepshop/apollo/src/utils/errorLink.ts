// typescript import
import { loggerType } from '@meepshop/logger';

// import
import { onError } from '@apollo/client/link/error';
import { notification } from 'antd';

// typescript definition
export type errorFilterType = ({ message }: Error) => boolean;

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

// definition
export default (
  errorFilter: errorFilterType,
  logger: loggerType,
): ReturnType<typeof onError> =>
  onError(
    ({
      response,
      graphQLErrors,
      networkError,
      operation: { operationName },
    }) => {
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
            operationName,
            message,
            locations,
            path,
          });
        });
      }

      if (
        networkError &&
        'statusCode' in networkError &&
        [401, 403].includes(networkError.statusCode)
      )
        return;

      errorLog({
        name: 'Network',
        operationName,
        networkError,
      });
    },
  );
