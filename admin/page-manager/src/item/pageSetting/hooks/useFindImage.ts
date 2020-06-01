// import
import { useCallback } from 'react';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/react-hooks';

// graphql typescript
import { useFindImageFragment } from './__generated__/useFindImageFragment';

// definition
export default (): ((id: string) => string | null | undefined) => {
  const client = useApolloClient();

  return useCallback(
    (id: string) =>
      client.readFragment<useFindImageFragment>({
        id,
        fragment: gql`
          fragment useFindImageFragment on File {
            id
            image
          }
        `,
      })?.image,
    [client],
  );
};
