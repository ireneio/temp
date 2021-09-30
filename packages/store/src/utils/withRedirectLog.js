// import
import { useApolloClient } from '@apollo/react-hooks';

import withHook from '@store/utils/lib/withHook';

// graphql import
import { log } from '@meepshop/logger/lib/gqls/log';

// definition
export default Component =>
  withHook(() => {
    const client = useApolloClient();

    client.mutate({
      mutation: log,
      variables: {
        input: {
          type: 'WARN',
          name: 'URL_REDIRECT',
          data: {
            message: 'url redirect',
          },
        },
      },
    });

    return {};
  })(Component);
