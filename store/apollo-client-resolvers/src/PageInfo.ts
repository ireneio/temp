// typescript import
import { ContextType } from './constants';

// import
import { gql } from 'apollo-boost';

// graphql typescript
import { SetCurrentInput } from '../../../__generated__/store';

// definition
const fragment = gql`
  fragment setCurrentFragment on CurrentInfo {
    id
    current
  }
`;

export const resolver = {
  Query: {},
  Mutation: {
    setCurrent: (
      _: unknown,
      { input: { pageId, current } }: { input: SetCurrentInput },
      { cache }: ContextType,
    ) => {
      cache.writeFragment({
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
