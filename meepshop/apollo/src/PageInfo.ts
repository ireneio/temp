// typescript import
import { ContextType } from './index';

// graphql typescript
// TODO: should use __generated__/meepshop
import { SetCurrentInput } from '../../../__generated__/store';
import { pageInfoFragment as pageInfoFragmentType } from './gqls/__generated__/pageInfoFragment';

// graphql import
import pageInfoFragment from './gqls/pageInfo';

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
      _: unknown,
      { input: { pageId } }: { input: { pageId: string } },
    ) => ({
      __typename: 'CurrentInfo',
      id: pageId,
      current: 0,
    }),
  },
};
