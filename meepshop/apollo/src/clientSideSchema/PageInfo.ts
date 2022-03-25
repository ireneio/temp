// typescript import
import { ContextType } from '../constants';

// graphql typescript
import {
  SetCurrentInput,
  pageInfoFragment as pageInfoFragmentType,
} from '@meepshop/types/gqls/store';
/* TODO: should use @meepshop/types/gqls/meepshop */

// graphql import
import { pageInfoFragment } from '../gqls/pageInfo';

// definition
export const resolvers = {
  Mutation: {
    setCurrent: (
      _: unknown,
      { input: { pageId, current } }: { input: SetCurrentInput },
      { cache }: ContextType,
    ) => {
      cache.writeFragment<pageInfoFragmentType>({
        id: pageId,
        fragment: pageInfoFragment,
        data: {
          __typename: 'CurrentInfo',
          id: pageId,
          current,
        },
      });

      return true;
    },
  },
  PageInfo: {
    currentInfo: (
      { key }: { key?: string },
      args?: { input?: { pageId: string } },
    ) => ({
      __typename: 'CurrentInfo',
      id: key || args?.input?.pageId,
      current: 0,
    }),
  },
};
