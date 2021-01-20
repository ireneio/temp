// typescript import
import { ContextType } from '@meepshop/apollo';

// import
import gql from 'graphql-tag';

// graphql typescript
import {
  updateShopperInfoResponseReadCache,
  updateShopperInfoResponseUpdateCache,
} from '@meepshop/types/gqls/store';

// typescript definition
// FIXME: should use graphql typescript
interface UpdateShopperInfoResponseType {
  status: 'OK';
}

interface UpdateShopperInfoInputType {
  input: { locale: string };
}

// definition
export const resolvers = {
  UpdateShopperInfoResponse: {
    updateCache: (
      { status }: UpdateShopperInfoResponseType,
      { input }: UpdateShopperInfoInputType,
      { cache }: ContextType,
    ) => {
      if (status !== 'OK') return false;

      const userCache = cache.readQuery<updateShopperInfoResponseReadCache>({
        query: gql`
          query updateShopperInfoResponseReadCache {
            viewer {
              id
            }
          }
        `,
      });
      const userId = userCache?.viewer?.id;

      if (!userId) return false;

      cache.writeFragment<updateShopperInfoResponseUpdateCache>({
        id: userId,
        fragment: gql`
          fragment updateShopperInfoResponseUpdateCache on User {
            id
            locale
          }
        `,
        data: {
          __typename: 'User',
          id: userId,
          locale: input.locale,
        },
      });

      return true;
    },
  },
};
