// typescript import
import { ContextType } from './index';

// graphql typescript
// TODO: should use __generated__/meepshop
import { SetCurrentInput } from '../../../__generated__/store';
import { pageInfoFragment } from './fragments/__generated__/pageInfoFragment';

// graphql import
import fragment from './fragments/pageInfo';

// definition
export const resolvers = {
  Mutation: {
    setCurrent: (
      _: unknown,
      { input: { pageId, current } }: { input: SetCurrentInput },
      { cache }: ContextType,
    ) => {
      cache.writeFragment<pageInfoFragment>({
        id: pageId,
        fragment,
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
      _: unknown,
      { input: { pageId } }: { input: { pageId: string } },
    ) => ({
      __typename: 'CurrentInfo',
      id: pageId,
      current: 0,
    }),
  },
};
