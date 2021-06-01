// typescript import
import { ContextType } from '@meepshop/apollo';

// graphql typescript
import {
  updateShopperInfoResponseReadCache as updateShopperInfoResponseReadCacheType,
  updateShopperInfoResponseUpdateCache as updateShopperInfoResponseUpdateCacheType,
} from '@meepshop/types/gqls/store';

// graphql import
import {
  updateShopperInfoResponseReadCache,
  updateShopperInfoResponseUpdateCache,
} from './gqls/updateShopperInfoResponse';

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

      const userCache = cache.readQuery<updateShopperInfoResponseReadCacheType>(
        {
          query: updateShopperInfoResponseReadCache,
        },
      );
      const userId = userCache?.viewer?.id;

      if (!userId) return false;

      cache.writeFragment<updateShopperInfoResponseUpdateCacheType>({
        id: userId,
        fragment: updateShopperInfoResponseUpdateCache,
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
